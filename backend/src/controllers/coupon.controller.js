import db from "../lib/db.js";

export const getCoupon = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM coupons WHERE user_id = ? AND is_active = 1 LIMIT 1",
        [req.user.id]
      );

    const coupon = rows[0] || null;
    res.json(coupon);
  } catch (error) {
    console.error("Error in getCoupon controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM coupons WHERE code = ? AND user_id = ? AND is_active = 1 LIMIT 1",
        [code, req.user.id]
      );

    const coupon = rows[0];

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const isExpired = new Date(coupon.expiration_date) < new Date();

    if (isExpired) {
      await db
        .promise()
        .query("UPDATE coupons SET is_active = 0 WHERE id = ?", [coupon.id]);
      return res.status(404).json({ message: "Coupon expired" });
    }

    res.json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discount_percentage,
    });
  } catch (error) {
    console.error("Error in validateCoupon controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
