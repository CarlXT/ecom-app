// src/pages/customer/HomePage.js
import React, { useState } from 'react';
import htm from 'htm';

import BannerSection from '../../components/customer/shop/BannerSection.js';
import CollectionSection from '../../components/customer/shop/CollectionSection.js';
import CartModal from '../../components/ui/modals/customer/CartModal.js';

const html = htm.bind(React.createElement);

export default function ShopPage({ products = [] }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add or increment item quantity
  const handleAddToCart = (productItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === productItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevItems, { ...productItem, quantity: 1 }];
    });
  };

  // Remove item from cart
  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Checkout redirect matching Product Details process
  const handleProceedToCheckout = () => {
    window.location.href = '/checkout.html';
  };

  return html`
    <div className="min-h-screen bg-[#1e1e24] text-white">
      <${BannerSection} />
      
      <!-- Pass products array and handleAddToCart handler to collection grid -->
      <${CollectionSection} 
        products=${products} 
        onAddToCart=${handleAddToCart} 
      />

      <!-- Cart Modal -->
      <${CartModal} 
        isOpen=${isCartOpen}
        onClose=${() => setIsCartOpen(false)}
        cartItems=${cartItems}
        onRemoveItem=${handleRemoveItem}
        onProceedToCheckout=${handleProceedToCheckout}
      />
    </div>
  `;
}
