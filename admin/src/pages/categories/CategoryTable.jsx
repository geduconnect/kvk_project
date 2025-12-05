import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AllCategories.css";

export const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`);
      setMessage("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting category");
    }
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to categories
  const sortedCategories = [...categories].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (typeof a[sortConfig.key] === "string") {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    } else {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    }
  });

  return (
    <div className="category-table">
      <div className="adminproduct-head">
        <h2>All Categories</h2>
        {message && <p>{message}</p>}
        <Link to="/categories/uploadCategory">
          <button className="upload-btn">+ Add Category</button>
        </Link>
      </div>
      <table className="table-customer">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("name")}>
              Category Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <img
                  src={`http://localhost:8000${cat.image}`}
                  alt={cat.name}
                  className="img-card"
                />
              </td>
              <td>
                <Link to={`/categories/edit/${cat.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
