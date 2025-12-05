import React, { useState } from "react";
import "./ContactPage.css";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <div className="contact-details">
          <div className="detail">
            <h3>Address</h3>
            <p>5171 W Campbell Ave, Kent, Utah 53127, United States</p>
          </div>
          <div className="detail">
            <h3>Phone</h3>
            <p>(+91) - 540-025-124553</p>
          </div>
          <div className="detail">
            <h3>Email</h3>
            <p>sale@Nest.com</p>
          </div>
          <div className="detail">
            <h3>Working Hours</h3>
            <p>10:00 - 18:00, Mon - Sat</p>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="contact-map">
        <h2>Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!..."
          title="location-map"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
