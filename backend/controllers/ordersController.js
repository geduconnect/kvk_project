import { db } from "../db.js";

// ✅ Create a new order with items
export const addOrder = (req, res) => {
  console.log("✅ FULL BODY RECEIVED:", req.body);

  const {
    customerId,
    totalCost,
    status,
    paymentMethod,
    paymentStatus,
    remarks,
    items,
  } = req.body;

  if (!customerId || totalCost === undefined || totalCost === null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const orderQuery = `
    INSERT INTO orders 
    (customerId, orderDate, totalCost, status, paymentMethod, paymentStatus, remarks)
    VALUES (?, NOW(), ?, ?, ?, ?, ?)
  `;

  db.query(
    orderQuery,
    [
      customerId,
      totalCost,
      status || "Pending",
      paymentMethod || null,
      paymentStatus || null,
      remarks || "",
    ],
    (err, result) => {
      if (err) {
        console.error("❌ ORDER INSERT ERROR:", err);
        return res.status(500).json({ message: "Failed to create order", error: err });
      }

      const orderId = result.insertId;
      console.log("✅ ORDER CREATED WITH ID:", orderId);
      console.log("✅ ITEMS RECEIVED:", items);

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(201).json({
          message: "Order created successfully (no items)",
          orderId,
        });
      }

      const itemQuery = `
        INSERT INTO order_items 
        (orderId, product_id, quantity, description, amount)
        VALUES ?
      `;

      const values = items.map((i) => [
        orderId,
        Number(i.productId),
        Number(i.quantity || 1),
        i.description || "",
        Number(i.amount),
      ]);

      console.log("✅ FINAL ITEM INSERT VALUES:", values);

      db.query(itemQuery, [values], (err2) => {
        if (err2) {
          console.error("❌ ORDER ITEMS INSERT ERROR:", err2);
          return res.status(500).json({
            message: "Order created but items failed",
            error: err2,
          });
        }

        console.log("✅ ORDER ITEMS INSERTED SUCCESSFULLY");

        res.status(201).json({
          message: "Order created successfully",
          orderId,
        });
      });
    }
  );
};


// ✅ Get all orders with items
export const getOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT 
        o.*, 
        c.customerName, c.email, c.mobile
      FROM orders o
      LEFT JOIN customers c ON o.customerId = c.id
      ORDER BY o.orderDate DESC
    `);

    if (orders.length === 0) return res.json([]);

    const orderIds = orders.map((o) => o.id);

    const [items] = await db.query(
      `
        SELECT 
          oi.*,
          p.title AS productTitle,
          p.price AS productPrice,
          p.images AS productImages
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.orderId IN (?)
      `,
      [orderIds]
    );

    const merged = orders.map((order) => {
      const orderItems = items
        .filter((item) => item.orderId === order.id)
        .map((item) => ({
          ...item,
          productImages: item.productImages
            ? JSON.parse(item.productImages)
            : [],
        }));

      return {
        ...order,
        items: orderItems,
      };
    });

    res.json(merged);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Get orders by customer ID
export const getOrdersByCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const [orders] = await db.query(
      `
        SELECT o.*, c.customerName, c.email, c.mobile
        FROM orders o
        LEFT JOIN customers c ON o.customerId = c.id
        WHERE o.customerId = ?
        ORDER BY o.orderDate DESC
      `,
      [customerId]
    );

    if (orders.length === 0) return res.json([]);

    const orderIds = orders.map((o) => o.id);

    const [items] = await db.query(
      `
        SELECT 
          oi.*,
          p.title AS productTitle,
          p.price AS productPrice,
          p.images AS productImages
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.orderId IN (?)
      `,
      [orderIds]
    );

    const merged = orders.map((order) => {
      const orderItems = items
        .filter((item) => item.orderId === order.id)
        .map((item) => ({
          ...item,
          productImages: item.productImages
            ? JSON.parse(item.productImages)
            : [],
        }));

      return {
        ...order,
        items: orderItems,
      };
    });

    res.json(merged);
  } catch (err) {
    console.error("Error fetching customer orders:", err);
    res.status(500).json({ message: "Server error fetching orders." });
  }
};

// ✅ Get single order by ID with items
export const getOrderById = async (req, res) => {
  try {
    const [orders] = await db.query(
      `
        SELECT o.*, c.customerName, c.email, c.mobile
        FROM orders o
        LEFT JOIN customers c ON o.customerId = c.id
        WHERE o.id = ?
      `,
      [req.params.id]
    );

    if (orders.length === 0)
      return res.status(404).json({ message: "Order not found" });

    const order = orders[0];

    const [items] = await db.query(
      `
        SELECT 
          oi.*,
          p.title AS productTitle,
          p.price AS productPrice,
          p.images AS productImages
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.orderId = ?
      `,
      [order.id]
    );

    const orderItems = items.map((item) => ({
      ...item,
      productImages: item.productImages ? JSON.parse(item.productImages) : [],
    }));

    res.json({ ...order, items: orderItems });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error fetching order" });
  }
};

// ✅ Update order status
export const updateOrder = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "Status required" });

  db.query("UPDATE orders SET status=? WHERE id=?", [status, id], (err) => {
    if (err)
      return res.status(500).json({ message: "Failed to update status" });

    res.json({ message: "Status updated" });
  });
};

// ✅ Customer order summary
export const getCustomerOrderSummary = (req, res) => {
  db.query(
    `
    SELECT c.id AS customerId, c.customerName,
           COUNT(o.id) AS totalOrders,
           IFNULL(SUM(o.totalCost),0) AS totalSpent
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customerId
    GROUP BY c.id
    ORDER BY c.id DESC
  `,
    (err, results) => {
      if (err)
        return res.status(500).json({ message: "Error fetching summary" });

      res.json(results);
    }
  );
};
