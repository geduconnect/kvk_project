import { db } from "../db.js";

// 1️⃣ Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Total customers
    const [totalCustomersResult] = await db.query(
      "SELECT COUNT(*) AS totalCustomers FROM users WHERE role='customer'"
    );

    // Total orders + sales + returns
    const [ordersResult] = await db.query(
      "SELECT COUNT(*) AS totalOrders, IFNULL(SUM(totalCost),0) AS totalSales, SUM(status='returned') AS totalReturns FROM orders"
    );

    res.json({
      totalCustomers: totalCustomersResult[0].totalCustomers || 0,
      totalOrders: ordersResult[0].totalOrders || 0,
      totalSales: ordersResult[0].totalSales || 0,
      totalReturns: ordersResult[0].totalReturns || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

// 2️⃣ Recent orders
export const getRecentOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id,
        o.customerId,
        u.name AS customerName,
        o.orderDate AS date,
        o.totalCost,
        o.status
      FROM orders o
      LEFT JOIN users u ON o.customerId = u.id
      ORDER BY o.orderDate DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching recent orders" });
  }
};

// 3️⃣ Customer summary
export const getCustomerSummary = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        u.id AS customerId,
        u.name AS customerName,
        COUNT(o.id) AS totalOrders,
        IFNULL(SUM(o.totalCost), 0) AS totalSpent
      FROM users u
      LEFT JOIN orders o ON u.id = o.customerId
      WHERE u.role='customer'
      GROUP BY u.id
      ORDER BY u.id DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch customer summary" });
  }
};

// 4️⃣ Top selling products
// 4️⃣ Top selling products
export const getTopProducts = (req, res) => {
  const limit = parseInt(req.query.limit) || 8;

  const query = `
    SELECT 
      p.id,
      p.title AS product_name,
      p.images AS image,
      IFNULL(SUM(oi.amount), 0) AS totalSold
    FROM products p
    LEFT JOIN order_items oi ON p.id = oi.product_id
    GROUP BY p.id
    ORDER BY totalSold DESC
    LIMIT ?
  `;

  db.query(query, [limit], (err, results) => {
    if (err) {
      console.error("Error fetching top products:", err);
      return res.status(500).json({ message: "Error fetching top products", error: err });
    }
    res.json(results);
  });
};
