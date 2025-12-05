import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing customer by ID
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/customers/${id}`);
        setCustomer(response.data);
      } catch (err) {
        console.error("Error fetching customer:", err);
        alert("Failed to load customer data");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/customers/${id}`, customer);
      alert("Customer updated successfully!");
      navigate("/customers/list"); // back to table
    } catch (err) {
      console.error("Error updating customer:", err);
      alert(err.response?.data?.error || "Update failed. Check console.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <h2>Edit Customer</h2>

      <input
        type="text"
        name="customerName"
        placeholder="User Name"
        value={customer.customerName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={customer.mobile}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email ID"
        value={customer.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={customer.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={customer.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={customer.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={customer.pincode}
        onChange={handleChange}
        required
      />

      <button type="submit">Update</button>
    </form>
  );
};
