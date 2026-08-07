import React, { createContext, useContext, useState, useEffect } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const CART_STORAGE_KEY = 'heady_audio_cart_v1';

export const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  // Load initial cart state from LocalStorage on mount
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from LocalStorage:', error);
      return [];
    }
  });

  // Sync cart state to LocalStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to LocalStorage:', error);
    }
  }, [cart]);

  // Add item or increment quantity if already present
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove item by ID
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update item quantity directly (removes item if quantity <= 0)
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Empty cart (e.g., after successful checkout)
  const clearCart = () => {
    setCart([]);
  };

  // Compute total cost
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Compute aggregate item quantity count
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount
  };

  return html`
    <${CartContext.Provider} value=${value}>
      ${children}
    </${CartContext.Provider}>
  `;
}