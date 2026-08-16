import React, { createContext, useContext, useState, useEffect } from 'react';
import htm from 'htm';
import * as productApi from '../services/productApi.js';

const html = htm.bind(React.createElement);

export const ProductContext = createContext();

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProducts = async (options = {}) => {
    setLoading(true);
    const { data, error } = await productApi.fetchProducts(options);
    if (error) {
      setError(error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  const refreshCategories = async () => {
    const { data, error } = await productApi.fetchCategories();
    if (!error) {
      setCategories(data);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([refreshProducts(), refreshCategories()]);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  const addProduct = async (product) => {
    const { data, error } = await productApi.createProduct(product);
    if (!error) refreshProducts();
    return { data, error };
  };

  const updateProduct = async (id, updates) => {
    const { data, error } = await productApi.updateProduct(id, updates);
    if (!error) refreshProducts();
    return { data, error };
  };

  const deleteProduct = async (id) => {
    const { success, error } = await productApi.deleteProduct(id);
    if (success) refreshProducts();
    return { success, error };
  };

  const addCategory = async (category) => {
    const { data, error } = await productApi.createCategory(category);
    if (!error) refreshCategories();
    return { data, error };
  };

  const value = {
    products,
    categories,
    loading,
    error,
    refreshProducts,
    refreshCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory
  };

  return html`
    <${ProductContext.Provider} value=${value}>
      ${children}
    </${ProductContext.Provider}>
  `;
}
