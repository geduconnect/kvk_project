import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

axios.defaults.baseURL = "http://localhost:8000/api";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalReturns: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [customerSummary, setCustomerSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [statsRes, ordersRes, productsRes, customersRes] = await Promise.all([
        axios.get("/dashboard/stats"),
        axios.get("/dashboard/recent-orders?limit=10"),
        axios.get("/dashboard/top-products?limit=8"),
        axios.get("/dashboard/customer-summary"),
      ]);

      setStats(statsRes.data || {});
      setRecentOrders(ordersRes.data || []);
      setTopProducts(productsRes.data || []);
      setCustomerSummary(customersRes.data || []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard">
      {/* Stats Cards */}
      <div className="adminproduct-body">
        <div className="adminproduct-stats">
          <Link to="/customers/customerTable" className="adminproduct-stats-card">
            <p>{stats.totalCustomers}<br /><span>Total Customers</span></p>
            <i className="fa fa-users box-icon"></i>
          </Link>

          <Link to="/allorders" className="adminproduct-stats-card">
            <p>{stats.totalOrders}<br /><span>Total Orders</span></p>
            <i className="fa fa-shopping-bag box-icon"></i>
          </Link>

          <Link to="/sales" className="adminproduct-stats-card">
            <p>${stats.totalSales.toFixed(2)}<br /><span>Total Sales</span></p>
            <i className="fa fa-list box-icon"></i>
          </Link>

          <Link to="/returns" className="adminproduct-stats-card">
            <p>{stats.totalReturns}<br /><span>Total Returns</span></p>
            <i className="fa fa-tasks box-icon"></i>
          </Link>
        </div>
      </div>

      {/* Data Containers */}
      <div className="adminproduct-data-container">
        <div className="sales-boxes">
          {/* Recent Orders */}
          <div className="recent-sales box">
            <div className="title">Recent Orders</div>
            {recentOrders.length === 0 ? (
              <p>No recent orders.</p>
            ) : (
              <div className="sales-details">
                <ul className="details">
                  <li className="topic">Date</li>
                  {recentOrders.map(order => (
                    <li key={order.id}>{new Date(order.date).toLocaleDateString()}</li>
                  ))}
                </ul>
                <ul className="details">
                  <li className="topic">Customer</li>
                  {recentOrders.map(order => (
                    <li key={order.id}>{order.customerName || "Unknown"}</li>
                  ))}
                </ul>
                <ul className="details">
                  <li className="topic">Status</li>
                  {recentOrders.map(order => (
                    <li key={order.id}>{order.status}</li>
                  ))}
                </ul>
                <ul className="details">
                  <li className="topic">Total</li>
                  {recentOrders.map(order => (
                    <li key={order.id}>${order.totalCost.toFixed(2)}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="button">
              <Link to="/orders">See All</Link>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="top-sales box">
            <div className="title">Top Selling Products</div>
            {topProducts.length === 0 ? (
              <p>No top products yet.</p>
            ) : (
              <ul className="top-sales-details">
                {topProducts.map(product => (
                  <li key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      {product.image && (
                        <img src={`http://localhost:8000${product.image}`} alt={product.product_name} />
                      )}
                      <span className="product">{product.product_name}</span>
                    </Link>
                    <span className="price">${product.totalSold}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Customer Summary */}
        <div className="customer-summary box">
          <div className="title">Customer Summary</div>
          {customerSummary.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            <table className="table-customer">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total Orders</th>
                  <th>Total Spent ($)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerSummary.map(customer => (
                  <tr key={customer.customerId}>
                    <td>{customer.customerName}</td>
                    <td>{customer.totalOrders}</td>
                    <td>${customer.totalSpent.toFixed(2)}</td>
                    <td>
                      <Link to={`/customers/customer/${customer.customerId}/orders`}>
                        View Orders
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
