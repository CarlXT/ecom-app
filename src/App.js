import React from './vendor/react.js';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import htm from 'htm';

// Imported Layouts 
import { CustomerLayout } from './layouts/CustomerLayout.js';
import { AdminLayout } from './layouts/AdminLayout.js';

// Imported customer pages
import HomePage from './pages/customer/HomePage.js';
import ShopPage from './pages/customer/ShopPage.js';
import HelpPage from './pages/customer/HelpPage.js';
import CheckoutPage from './pages/customer/CheckoutPage.js';
import ProductDetailsPage from './pages/customer/ProductDetailsPage.js';

// Imported admin pages
import CustomerPage from './pages/admin/CustomerPage.js';
import DashboardPage from './pages/admin/DashboardPage.js';
import LoginPage from './pages/admin/LoginPage.js';
import OrderDetailsPage from './pages/admin/OrderDetailsPage.js';
import OrdersPage from './pages/admin/OrdersPage.js';
import ProductsPage from './pages/admin/ProductsPage.js';

const html = htm.bind(React.createElement);

export default function App() {
  return html`
    <${Router}>
      <${Routes}>
        <!-- Customer page routes -->
        <${Route} 
          path="/" 
          element=${html`
            <${CustomerLayout}>
              <${HomePage} />
            </${CustomerLayout}>
          `} 
        />

        <${Route} 
          path="/shop" 
          element=${html`
            <${CustomerLayout}>
              <${ShopPage} />
            </${CustomerLayout}>
          `} 
        />

        <${Route} 
          path="/help" 
          element=${html`
            <${CustomerLayout}>
              <${HelpPage} />
            </${CustomerLayout}>
          `} 
        />

        <${Route} 
          path="/checkout" 
          element=${html`
            <${CustomerLayout}>
              <${CheckoutPage} />
            </${CustomerLayout}>
          `} 
        />

        <${Route} 
          path="/product/details" 
          element=${html`
            <${CustomerLayout}>
              <${ProductDetailsPage} />
            </${CustomerLayout}>
          `} 
        />

        <!-- Admin page routes -->
        <${Route} 
          path="/admin/login" 
          element=${html`
            <${LoginPage} />
          `} 
        />

        <${Route} 
          path="/admin/dashboard" 
          element=${html`
            <${AdminLayout}>
              <${DashboardPage} />
            </${AdminLayout}>
          `} 
        />

        <${Route} 
          path="/admin/customer" 
          element=${html`
            <${AdminLayout}>
              <${CustomerPage} />
            </${AdminLayout}>
          `} 
        />

        <${Route} 
          path="/admin/order/details" 
          element=${html`
            <${AdminLayout}>
              <${OrderDetailsPage} />
            </${AdminLayout}>
          `} 
        />

        <${Route} 
          path="/admin/orders" 
          element=${html`
            <${AdminLayout}>
              <${OrdersPage} />
            </${AdminLayout}>
          `} 
        />

        <${Route} 
          path="/admin/products" 
          element=${html`
            <${AdminLayout}>
              <${ProductsPage} />
            </${AdminLayout}>
          `} 
        />

      <//>
    <//>
  `;
}

// Ensure the React app mounts to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(html`<${App} />`);
}