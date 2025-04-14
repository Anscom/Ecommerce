import db from "../lib/db.js";

export const getCartProducts = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT p.*, c.quantity 
			 FROM cart_items c 
			 JOIN products p ON c.product_id = p.id 
			 WHERE c.user_id = ?`,
      [req.user.id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error in getCartProducts controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const [existing] = await db
      .promise()
      .query(`SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`, [
        req.user.id,
        productId,
      ]);

    if (existing.length > 0) {
      await db
        .promise()
        .query(`UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?`, [
          existing[0].id,
        ]);
    } else {
      await db
        .promise()
        .query(
          `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`,
          [req.user.id, productId, 1]
        );
    }

    const [updated] = await db
      .promise()
      .query(`SELECT * FROM cart_items WHERE user_id = ?`, [req.user.id]);

    res.json(updated);
  } catch (error) {
    console.error("Error in addToCart controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      await db
        .promise()
        .query(`DELETE FROM cart_items WHERE user_id = ?`, [req.user.id]);
    } else {
      await db
        .promise()
        .query(`DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`, [
          req.user.id,
          productId,
        ]);
    }

    const [updated] = await db
      .promise()
      .query(`SELECT * FROM cart_items WHERE user_id = ?`, [req.user.id]);

    res.json(updated);
  } catch (error) {
    console.error("Error in removeAllFromCart controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;

    if (quantity === 0) {
      await db
        .promise()
        .query(`DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`, [
          req.user.id,
          productId,
        ]);
    } else {
      await db
        .promise()
        .query(
          `UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?`,
          [quantity, req.user.id, productId]
        );
    }

    const [updated] = await db
      .promise()
      .query(`SELECT * FROM cart_items WHERE user_id = ?`, [req.user.id]);

    res.json(updated);
  } catch (error) {
    console.error("Error in updateQuantity controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
