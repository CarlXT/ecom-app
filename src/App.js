import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import htm from 'htm';

// Imported layouts 
import { CustomerLayout } from './layouts/customer/CustomerLayout.js';
import { AdminLayout } from './layouts/admin/AdminLayout.js';
import { CustomerCheckoutLayout } from './layouts/customer/CustomerCheckoutLayout.js';
import { DashboardLayout } from './layouts/admin/DashboardLayout.js';
import { ProductLayout } from './layouts/admin/ProductLayout.js';
import { OrderDetailsLayout } from './layouts/admin/OrderDetailsLayout.js';

// Imported modal
import CartModal from './components/ui/modals/customer/CartModal.js'; 

// Imported customer pages
import HomePage from './pages/customer/HomePage.js';
import ShopPage from './pages/customer/ShopPage.js';
import HelpPage from './pages/customer/HelpPage.js';
import CheckoutPage from './pages/customer/CheckoutPage.js';
import ProductDetailsPage from './pages/customer/ProductDetailsPage.js';
import OrderConfirmationPage from './pages/customer/OrderConfirmationPage.js';

// Imported admin pages
import CustomerPage from './pages/admin/CustomerPage.js';
import DashboardPage from './pages/admin/DashboardPage.js';
import LoginPage from './pages/admin/LoginPage.js';
import OrderDetailsPage from './pages/admin/OrderDetailsPage.js';
import OrdersPage from './pages/admin/OrdersPage.js';
import ProductsPage from './pages/admin/ProductsPage.js';

const html = htm.bind(React.createElement);

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const handleOpenCart = () => setIsCartOpen(true);

  return html`
    <${Router}>
      <div>
        <${Routes}>
          <${Route} 
            path="/" 
            element=${html`
              <${CustomerLayout} cartCount=${totalCartCount} onOpenCart=${handleOpenCart}>
                <${HomePage} />
              <//>
            `} 
          />

          <${Route} 
            path="/shop" 
            element=${html`
              <${CustomerLayout} cartCount=${totalCartCount} onOpenCart=${handleOpenCart}>
                <${ShopPage} />
              <//>
            `} 
          />

          <${Route} 
            path="/help" 
            element=${html`
              <${CustomerLayout} cartCount=${totalCartCount} onOpenCart=${handleOpenCart}>
                <${HelpPage} />
              <//>
            `} 
          />

          <${Route} 
            path="/checkout" 
            element=${html`<${CustomerCheckoutLayout}><${CheckoutPage} /><//>`} 
          />

          <${Route} 
            path="/product/details" 
            element=${html`
              <${CustomerLayout} cartCount=${totalCartCount} onOpenCart=${handleOpenCart}>
                <${ProductDetailsPage} />
              <//>
            `} 
          />

          <${Route} 
            path="/confirmation/order" 
            element=${html`<${CustomerCheckoutLayout}><${OrderConfirmationPage} /><//>`} 
          />

          <${Route} 
            path="/admin/login" 
            element=${html`<${LoginPage} />`} 
          />

          <${Route} 
            path="/admin/dashboard" 
            element=${html`<${AdminLayout}><${DashboardLayout}><${DashboardPage} /><//>`} 
          />

          <${Route} 
            path="/admin/customer" 
            element=${html`<${AdminLayout}><${CustomerPage} /><//>`} 
          />

          <${Route} 
            path="/admin/order/details" 
            element=${html`<${OrderDetailsLayout}><${OrderDetailsPage} /><//>`} 
          />

          <${Route} 
            path="/admin/orders" 
            element=${html`<${AdminLayout}><${OrdersPage} /><//>`} 
          />

          <${Route} 
            path="/admin/products" 
            element=${html`<${AdminLayout}><${ProductLayout}><${ProductsPage} /><//>`} 
          />
        <//>

        <${CartModal} 
          isOpen=${isCartOpen} 
          onClose=${() => setIsCartOpen(false)} 
          cartItems=${cartItems} 
          setCartItems=${setCartItems} 
        />
      </div>
    <//>
  `;
}

// Ensure the React app mounts to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(html`<${App} />`);
}