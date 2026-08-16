// src/components/customer/shop/CollectionSection.js
import React, { useState, useEffect } from 'react';
import htm from 'htm';
import { ProductCard } from '../../ui/cards/customer/ProductCard.js';
import FilledButton from '../../ui/buttons/FilledButton.js';

const html = htm.bind(React.createElement);

const fallbackCategories = ['Microphones', 'Headphones', 'Filters', 'Mounts'];

// Sample fallback products
const sampleProducts = [
  { id: 1, category: 'Headphones', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 2, category: 'Headphones', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 3, category: 'Headphones', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 4, category: 'Headphones', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 5, category: 'Headphones', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 6, category: 'Headphones', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
];

export default function CollectionSection({ 
  products = sampleProducts, 
  categories = [], 
  onAddToCart, 
  onViewDetails,
  onLoadMore,
  onCategorySelect 
}) {
  const categoryList = categories.length > 0 
    ? categories 
    : (products.length > 0 
        ? Array.from(new Set(products.map(p => p.category).filter(Boolean))) 
        : fallbackCategories);

  const [activeCategory, setActiveCategory] = useState('Headphones');

  useEffect(() => {
    if (categoryList.length > 0 && !categoryList.includes(activeCategory)) {
      setActiveCategory(categoryList[0]);
    }
  }, [categories, products]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (typeof onCategorySelect === 'function') {
      onCategorySelect(category);
    }
  };

  const displayedProducts = products.filter((product) => {
    if (!product.category) return true;
    return product.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const finalProductList = displayedProducts.length > 0 ? displayedProducts : products;

  const sfProFontStyle = {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  };

  return html`
    <section 
      style=${sfProFontStyle}
      className="w-full bg-[#18181b] py-8 sm:py-20 px-2 sm:px-8 text-white select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-12">
        
        <!-- Section Header -->
        <div className="text-center space-y-2 sm:space-y-3 px-2">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            The Heady Collection
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base font-normal tracking-wide max-w-xl mx-auto">
            Studio-grade recording gear and desktop workstation essentials.
          </p>
        </div>

        <!-- Dynamic Category Filter Tabs -->
        <nav className="flex justify-start sm:justify-center items-center gap-5 sm:gap-12 text-sm sm:text-base font-semibold pt-1 overflow-x-auto w-full px-2 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          ${categoryList.map((cat, idx) => html`
            <button
              key=${`${cat}-${idx}`}
              type="button"
              onClick=${() => handleCategoryClick(cat)}
              className=${`transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat 
                  ? 'text-[#E50914] font-bold' 
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              ${cat}
            </button>
          `)}
        </nav>

        <!-- Product Grid Layout -->
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 pt-2 w-full justify-items-center">
          ${finalProductList.map((product, idx) => html`
            <${ProductCard} 
              key=${product.id || product.title || `collection-product-${idx}`}
              id=${product.id}
              productUrl=${`/product.html?id=${product.id}`}
              ...${product}
              onAddToCart=${onAddToCart}
              onViewDetails=${onViewDetails}
            />
          `)}
        </div>

        <!-- Load More Button -->
        <div className="flex justify-center pt-4 sm:pt-8">
          <${FilledButton} 
            text="See more products"
            onClick=${onLoadMore}
            bgColor="bg-white"
            textColor="text-black"
            width="w-auto px-8 sm:px-10"
            height="h-[46px] sm:h-[52px]"
            className="shadow-white/10 text-sm sm:text-base font-semibold hover:bg-zinc-200 cursor-pointer"
          />
        </div>

      </div>
    </section>
  `;
}
