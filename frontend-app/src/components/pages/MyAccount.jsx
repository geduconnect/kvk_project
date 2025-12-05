import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export const MyAccount = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        {!token && (
          <>
            <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          </>
        )}
        {token && (
          <>
            <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
            <Link to="/account" style={{ marginRight: "10px" }}>My Account</Link>
          
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
}