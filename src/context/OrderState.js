import React, { createContext, useContext, useState, useEffect } from 'react';
import htm from 'htm';
import * as orderApi from '../services/orderApi.js';

const html = htm.bind(React.createElement);

export const OrderContext = createContext();

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshOrders = async () => {
    setLoading(true);
    const { data, error } = await orderApi.fetchOrders();
    if (!error) {
      setOrders(data);
    }
    setLoading(false);
  };

  const placeOrder = async (orderData, items) => {
    const { data, error } = await orderApi.createOrder(orderData, items);
    return { data, error };
  };

  const updateStatus = async (id, status) => {
    const { data, error } = await orderApi.updateOrderStatus(id, status);
    if (!error) refreshOrders();
    return { data, error };
  };

  const value = {
    orders,
    loading,
    refreshOrders,
    placeOrder,
    updateStatus
  };

  return html`
    <${OrderContext.Provider} value=${value}>
      ${children}
    </${OrderContext.Provider}>
  `;
}
