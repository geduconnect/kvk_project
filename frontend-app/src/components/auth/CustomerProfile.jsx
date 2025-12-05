
import { useCustomerAuth } from "../../context/CustomerContext";

export const CustomerProfile = () => {
  const { customer, logout } = useCustomerAuth();

  if (!customer) return null; // Optional: should never happen inside protected route

  return (
    <div>
      <h2>Welcome, {customer.name}!</h2>
      <p>Email: {customer.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};