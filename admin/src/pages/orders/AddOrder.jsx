import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const AddOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prefillCustomerId = queryParams.get("customerId");

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customerId: prefillCustomerId || "",
    totalCost: 0,
    status: "Pending",
    paymentMethod: "",
    paymentStatus: "Pending",
    remarks: "",
    items: [
      { productId: "", quantity: 1, description: "", amount: 0 },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ FETCH CUSTOMERS & PRODUCTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, productRes] = await Promise.all([
          axios.get("/admin/customers"),
          axios.get("/products"),
        ]);

        const customerData = Array.isArray(customerRes.data)
          ? customerRes.data
          : customerRes.data.customers || [];

        setCustomers(customerData);
        setProducts(productRes.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch dropdown data:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ PRODUCT & QUANTITY HANDLER
  const handleItemChange = (idx, e) => {
    const { name, value } = e.target;
    const updatedItems = [...form.items];

    if (name === "productId") {
      const selectedProduct = products.find(
        (p) => p.id === parseInt(value, 10)
      );

      const price = Number(selectedProduct?.price || 0);
      const qty = Number(updatedItems[idx].quantity || 1);

      updatedItems[idx] = {
        ...updatedItems[idx],
        productId: value,
        description: selectedProduct?.title || "",
        amount: price * qty,
      };
    }

    if (name === "quantity") {
      const qty = Number(value || 1);
      const currentProductId = updatedItems[idx].productId;

      const selectedProduct = products.find(
        (p) => p.id === parseInt(currentProductId, 10)
      );

      const price = Number(selectedProduct?.price || 0);

      updatedItems[idx] = {
        ...updatedItems[idx],
        quantity: qty,
        amount: price * qty,
      };
    }

    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    setForm({
      ...form,
      items: updatedItems,
      totalCost: updatedTotal,
    });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        { productId: "", quantity: 1, description: "", amount: 0 },
      ],
    });
  };

  const removeItem = (idx) => {
    const remainingItems = form.items.filter((_, i) => i !== idx);

    const updatedTotal = remainingItems.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    setForm({
      ...form,
      items: remainingItems,
      totalCost: updatedTotal,
    });
  };

  // ✅ SUBMIT ORDER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.customerId) {
      setError("❌ Please select a customer");
      setLoading(false);
      return;
    }

    if (!form.items.length) {
      setError("❌ Please add at least one product");
      setLoading(false);
      return;
    }

    for (const item of form.items) {
      if (!parseInt(item.productId, 10)) {
        setError("❌ Invalid product selected");
        setLoading(false);
        return;
      }

      if (!item.quantity || item.quantity <= 0) {
        setError("❌ Quantity must be at least 1");
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        customerId: Number(form.customerId),
        totalCost: Number(form.totalCost),
        status: form.status,
        paymentMethod: form.paymentMethod || null,
        paymentStatus: form.paymentStatus || "Pending",
        remarks: form.remarks || "",
        items: form.items.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity || 1),
          description: item.description,
          amount: Number(item.amount),
        })),
      };

      console.log("✅ FINAL PAYLOAD SENDING:", payload);

      const res = await axios.post("/orders", payload);

      alert(res.data?.message || "✅ Order created successfully!");

      navigate(
        prefillCustomerId
          ? `/customers/customer/${prefillCustomerId}/orders`
          : "/allorders"
      );
    } catch (err) {
      console.error("❌ SUBMIT ERROR FULL:", err);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "❌ Failed to create order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-order-container">
      <h2>Add Order</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* CUSTOMER */}
        <div>
          <label>Customer</label>
          <select
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
            disabled={!!prefillCustomerId}
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.customerName} (ID: {c.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Total Cost</label>
          <input type="number" value={form.totalCost} readOnly />
        </div>

        <div>
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {["Pending",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                )
              )}
          </select>
        </div>

        <div>
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="NetBanking">NetBanking</option>
          </select>
        </div>

        <div>
          <label>Payment Status</label>
          <select
            name="paymentStatus"
            value={form.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        <div>
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
          />
        </div>

        <h3>Items</h3>

        {form.items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: "6px" }}>
            <select
              name="productId"
              value={item.productId}
              onChange={(e) => handleItemChange(idx, e)}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (₹{p.price})
                </option>
              ))}
            </select>

            <input
              type="number"
              name="quantity"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(idx, e)}
              style={{ width: "80px" }}
            />

            <input
              type="text"
              value={item.description}
              readOnly
              style={{ flex: 1 }}
            />

            <input
              type="number"
              value={item.amount}
              readOnly
              style={{ width: "120px" }}
            />

            {form.items.length > 1 && (
              <button type="button" onClick={() => removeItem(idx)}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addItem}>
          + Add Item
        </button>

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Order"}
        </button>
      </form>
    </div>
  );
};
