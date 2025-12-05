// ✅ /src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx"; // <-- make sure index.jsx has export default router
import { FilterProvider } from "./FilterContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CustomerProvider } from "./context/CustomerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomerProvider>
      <FilterProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </FilterProvider>
    </CustomerProvider>
  </React.StrictMode>
);
