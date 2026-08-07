import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Customer Pages
import HomePage from "./pages/customer/HomePage";
import ShopPage from "./pages/customer/ShopPage";
import ProductDetailsPage from "./pages/customer/ProductDetailsPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import HelpAndSupportPage from "./pages/customer/HelpAndSupportPage";

// Admin Pages
import AdminLoginPage from "./pages/admin/LoginPage";
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminProductsPage from "./pages/admin/ProductsPage";
import AdminOrdersPage from "./pages/admin/OrdersPage";
import AdminOrderDetailsPage from "./pages/admin/OrderDetailsPage";
import AdminCustomerPage from "./pages/admin/CustomerPage";

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Customer Titles
    if (path === "/") {
      document.title = "Heady | Home";
    } else if (path === "/shop") {
      document.title = "Shop | Heady";
    } else if (path.startsWith("/shop/")) {
      document.title = "Product Details | Heady";
    } else if (path === "/checkout") {
      document.title = "Checkout | Heady";
    } else if (path === "/help") {
      document.title = "Help & Support | Heady";
    }

    // Admin Titles
    else if (path === "/admin/login") {
      document.title = "Admin Login | Heady";
    } else if (path === "/admin" || path === "/admin/dashboard") {
      document.title = "Admin Dashboard | Heady";
    } else if (path === "/admin/products") {
      document.title = "Manage Products | Heady";
    } else if (path === "/admin/orders") {
      document.title = "Manage Orders | Heady";
    } else if (path.startsWith("/admin/orders/")) {
      document.title = "Order Details | Heady";
    } else if (path === "/admin/customers") {
      document.title = "Manage Customers | Heady";
    } else {
      document.title = "Heady Audio";
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Router>
      <TitleManager />
      <Routes>
        {/* ================= CUSTOMER ROUTES ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/help" element={<HelpAndSupportPage />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
        <Route path="/admin/customers" element={<AdminCustomerPage />} />
      </Routes>
    </Router>
  );
}