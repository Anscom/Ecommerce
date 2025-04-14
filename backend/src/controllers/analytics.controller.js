import db from "../lib/db.js";

export const getAnalyticsData = async () => {
  try {
    const [[{ totalUsers }]] = await db
      .promise()
      .query(`SELECT COUNT(*) AS totalUsers FROM users`);
    const [[{ totalProducts }]] = await db
      .promise()
      .query(`SELECT COUNT(*) AS totalProducts FROM products`);
    const [[salesStats]] = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS totalSales, IFNULL(SUM(total_amount), 0) AS totalRevenue FROM orders`
      );

    return {
      users: totalUsers,
      products: totalProducts,
      totalSales: salesStats.totalSales,
      totalRevenue: salesStats.totalRevenue,
    };
  } catch (error) {
    console.error("Error in getAnalyticsData:", error.message);
    throw error;
  }
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT DATE(created_at) as date, COUNT(*) as sales, SUM(total_amount) as revenue 
				 FROM orders 
				 WHERE created_at BETWEEN ? AND ? 
				 GROUP BY DATE(created_at) 
				 ORDER BY date ASC`,
      [startDate, endDate]
    );

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
      const found = rows.find(
        (row) => row.date.toISOString().split("T")[0] === date
      );
      return {
        date,
        sales: found?.sales || 0,
        revenue: found?.revenue || 0,
      };
    });
  } catch (error) {
    console.error("Error in getDailySalesData:", error.message);
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
