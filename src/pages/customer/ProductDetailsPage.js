import React from 'react';
import htm from 'htm';
import { useLocation } from 'react-router-dom';

import ProductDetailSection from '../../components/customer/details/ProductDetailSection.js';
import RelatedProductSection from '../../components/customer/details/RelatedProductSection.js';
import { useProducts } from '../../context/ProductState.js';
import { useCart } from '../../context/CartState.js';

const html = htm.bind(React.createElement);

export default function ProductDetailsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id');

  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => String(p.id) === String(productId));

  if (loading) {
    return html`<div className="min-h-screen bg-[#1e1e24] text-white flex items-center justify-center">Loading product...</div>`;
  }

  if (!product) {
    return html`<div className="min-h-screen bg-[#1e1e24] text-white flex items-center justify-center">Product not found.</div>`;
  }

  const handleAddToCart = (product, qty) => {
    addToCart(product, qty);
  };

  return html`
    <div>
      <${ProductDetailSection} product=${product} onAddToCart=${handleAddToCart} />
      <${RelatedProductSection} onAddToCart=${handleAddToCart} />
    </div>
  `;
}
