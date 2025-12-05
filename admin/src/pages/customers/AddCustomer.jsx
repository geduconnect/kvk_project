import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:8000/api";


export const AddCustomer = () => {
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

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = [
      "customerName",
      "address",
      "city",
      "state",
      "pincode",
      "mobile",
      "email",
    ];

    for (let field of requiredFields) {
      if (!customer[field]) {
        return alert(`Please fill ${field}`);
      }
    }

    try {
      const response = await axios.post("/customers", customer);

      // Show the generated password and the assigned customer ID
      alert(
        `Customer created successfully!\nCustomer ID: ${response.data.id}\nGenerated Password: ${response.data.password}`
      );
      // Reset form
      setCustomer({
        customerName: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        mobile: "",
        email: "",
      });

      navigate("/customers"); // redirect to customer table
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error || "Failed to create customer. Check console."
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <h2>Add Vendor / customer</h2>


      <input
        type="text"
        name="customerName"
        placeholder="Contact Person Name"
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

      <button type="submit">Save</button>
    </form>
  );
};
