import React from 'react';
import htm from 'htm';
import { useNavigate } from 'react-router-dom';

import BannerSection from '../../components/customer/shop/BannerSection.js';
import CollectionSection from '../../components/customer/shop/CollectionSection.js';
import { useProducts } from '../../context/ProductState.js';
import { useCart } from '../../context/CartState.js';

const html = htm.bind(React.createElement);

export default function ShopPage() {
  const { products, categories, loading } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleViewDetails = (id) => {
    navigate(`/product/details?id=${id}`);
  };

  if (loading) {
    return html`<div className="min-h-screen bg-[#1e1e24] text-white flex items-center justify-center">Loading shop...</div>`;
  }

  return html`
    <div className="min-h-screen bg-[#1e1e24] text-white">
      <${BannerSection} />
      
      <${CollectionSection}
        products=${products} 
        categories=${categories.map(c => c.name)}
        onAddToCart=${handleAddToCart}
        onViewDetails=${handleViewDetails}
      />
    </div>
  `;
}
