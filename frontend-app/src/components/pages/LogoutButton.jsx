// src/components/LogoutButton.jsx
import API from "../api";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setCustomer(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};
