import React, { useState } from 'react';
import htm from 'htm';

import { CustomerLayout } from '../../layouts/admin/CustomerLayout.js';
import ProductDetailSection from '../../components/customer/details/ProductDetailSection.js';
import RelatedProductSection from '../../components/customer/details/RelatedProductSection.js';
import CartModal from '../../components/ui/modals/customer/CartModal.js';

const html = htm.bind(React.createElement);

export default function ProductDetailsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Add or increment item quantity in cart
  const handleAddToCart = (productItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === productItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += productItem.quantity || 1;
        return updated;
      }
      return [...prevItems, { ...productItem, quantity: productItem.quantity || 1 }];
    });
  };

  // Update item quantity directly
  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Proceed to Checkout redirect
  const handleProceedToCheckout = () => {
    window.location.href = '/checkout.html';
  };

  return html`
    <${CustomerLayout} onOpenCart=${() => setIsCartOpen(true)}>
      <div>
        <${ProductDetailSection} onAddToCart=${handleAddToCart} />
        <${RelatedProductSection} onAddToCart=${handleAddToCart} />
      </div>

      <${CartModal} 
        isOpen=${isCartOpen} 
        onClose=${() => setIsCartOpen(false)} 
        cartItems=${cartItems}
        onUpdateQty=${handleUpdateQty}
        onRemoveItem=${handleRemoveItem}
        onProceedToCheckout=${handleProceedToCheckout}
      />
    <//>
  `;
}