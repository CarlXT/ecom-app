import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import htm from 'htm';

// Imported Context Providers
import { AuthProvider } from './context/AuthState.js';
import { CartProvider, useCart } from './context/CartState.js';
import { ProductProvider } from './context/ProductState.js';
import { OrderProvider } from './context/OrderState.js';

// Imported layouts 
import { CustomerLayout } from './layouts/customer/CustomerLayout.js';
import { AdminLayout } from './layouts/admin/AdminLayout.js';
import { CustomerCheckoutLayout } from './layouts/customer/CustomerCheckoutLayout.js';
import { DashboardLayout } from './layouts/admin/DashboardLayout.js';
import { ProductLayout } from './layouts/admin/ProductLayout.js';
import { OrderDetailsLayout } from './layouts/admin/OrderDetailsLayout.js';

// Imported Protected Route
import ProtectedRoute from './components/admin/ProtectedRoute.js';

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

function AppContent() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { cart, getItemCount } = useCart();

  const totalCartCount = getItemCount();
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
            element=${html`<${ProtectedRoute}><${AdminLayout}><${DashboardLayout}><${DashboardPage} /><//><//>`}
          />

          <${Route} 
            path="/admin/customer" 
            element=${html`<${ProtectedRoute}><${AdminLayout}><${CustomerPage} /><//><//>`}
          />

          <${Route} 
            path="/admin/order/details" 
            element=${html`<${ProtectedRoute}><${OrderDetailsLayout}><${OrderDetailsPage} /><//><//>`}
          />

          <${Route} 
            path="/admin/orders" 
            element=${html`<${ProtectedRoute}><${AdminLayout}><${OrdersPage} /><//><//>`}
          />

          <${Route} 
            path="/admin/products" 
            element=${html`<${ProtectedRoute}><${AdminLayout}><${ProductLayout}><${ProductsPage} /><//><//>`}
          />
        <//>

        <${CartModal} 
          isOpen=${isCartOpen} 
          onClose=${() => setIsCartOpen(false)} 
        />
      </div>
    <//>
  `;
}

export default function App() {
  return html`
    <${AuthProvider}>
      <${ProductProvider}>
        <${CartProvider}>
          <${OrderProvider}>
            <${AppContent} />
          <//>
        <//>
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