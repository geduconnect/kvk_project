// Check if admin is logged in
export const isAdminAuthenticated = () => {
  return localStorage.getItem("adminToken") !== null;
};

// Check if customer is logged in
export const isCustomerAuthenticated = () => {
  return localStorage.getItem("customerToken") !== null;
};

// Logout function (works for both roles)
export const logout = (role) => {
  if (role === "admin") {
    localStorage.removeItem("adminToken");
  } else if (role === "customer") {
    localStorage.removeItem("customerToken");
  }
};
