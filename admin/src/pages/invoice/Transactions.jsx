import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // <-- Your axios instance
import "./Invoice.css";

export const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { data } = await api.get("/transactions"); // GET all invoices
        setTransactions(data);
      } catch (err) {
        console.error("❌ Failed to load transactions:", err);
      }
    };

    loadTransactions();
  }, []);

  // --- GROUPING ---
  const paid = transactions.filter((t) => t.status === "PAID");
  const pending = transactions.filter((t) => t.status === "PENDING");

  // --- SUMMARY ---
  const totalAmount = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const paidAmount = paid.reduce((sum, t) => sum + Number(t.amount), 0);
  const pendingAmount = pending.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="transaction-content">

      {/* Filters */}
      <div className="transaction-filters">
        <h3>Filters</h3>
        <input placeholder="Invoice number" />
        <input type="date" />
        <input type="date" />
        <label><input type="checkbox" /> Paid only</label>
        <label><input type="checkbox" /> Group by status</label>
      </div>

      {/* Invoices */}
      <div className="transaction-invoices">

        {/* Summary Cards */}
        <div className="transaction-summary">
          <div className="transaction-card">
            <p>Total</p>
            <h3>₹{totalAmount.toFixed(2)}</h3>
          </div>
          <div className="transaction-card">
            <p>Paid</p>
            <h3>₹{paidAmount.toFixed(2)}</h3>
          </div>
          <div className="transaction-card">
            <p>Pending</p>
            <h3>₹{pendingAmount.toFixed(2)}</h3>
          </div>
        </div>

        {/* PAID SECTION */}
        <h4>Paid ({paid.length})</h4>
        <table>
          <tbody>
            {paid.map((t) => (
              <tr
                key={t.id}
                onClick={() => navigate(`/allorders/${t.orderId}/details`)}
              >
                <td>{t.invoice_no}</td>
                <td>₹{Number(t.amount).toFixed(2)}</td>
                <td className="transaction-paid">PAID</td>
              </tr>
            ))}

            {paid.length === 0 && (
              <tr><td colSpan="3">No paid invoices</td></tr>
            )}
          </tbody>
        </table>

        {/* PENDING SECTION */}
        <h4>Pending ({pending.length})</h4>
        <table>
          <tbody>
            {pending.map((t) => (
              <tr
                key={t.id}
                onClick={() => navigate(`/allorders/${t.orderId}/details`)}
              >
                <td>{t.invoice_no}</td>
                <td>₹{Number(t.amount).toFixed(2)}</td>
                <td className="transaction-pending">PENDING</td>
              </tr>
            ))}

            {pending.length === 0 && (
              <tr><td colSpan="3">No pending invoices</td></tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};
