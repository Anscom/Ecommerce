import db from "../lib/db.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      const [results] = await db
        .promise()
        .query(
          "SELECT * FROM coupons WHERE code = ? AND user_id = ? AND is_active = 1",
          [couponCode, req.user.id]
        );
      coupon = results[0];

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discount_percentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discount_percentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user.id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(products),
      },
    });

    if (totalAmount >= 20000) {
      await createNewCoupon(req.user.id);
    }

    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const userId = session.metadata.userId;
      const couponCode = session.metadata.couponCode;
      const products = JSON.parse(session.metadata.products);

      // Deactivate used coupon
      if (couponCode) {
        await db
          .promise()
          .query(
            "UPDATE coupons SET is_active = 0 WHERE code = ? AND user_id = ?",
            [couponCode, userId]
          );
      }

      const [orderResult] = await db.promise().query(
        `INSERT INTO orders (user_id, total_amount, stripe_session_id, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
        [userId, session.amount_total / 100, sessionId]
      );

      const orderId = orderResult.insertId;

      // Insert into order_items
      const itemQueries = products.map((product) =>
        db
          .promise()
          .query(
            `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
            [orderId, product.id, product.quantity, product.price]
          )
      );

      await Promise.all(itemQueries);

      res.status(200).json({
        success: true,
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        orderId: orderId,
      });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
}

async function createNewCoupon(userId) {
  await db.promise().query("DELETE FROM coupons WHERE user_id = ?", [userId]);

  const newCode =
    "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase();

  await db.promise().query(
    `INSERT INTO coupons (code, discount_percentage, expiration_date, is_active, user_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [newCode, 10, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 1, userId]
  );
}
