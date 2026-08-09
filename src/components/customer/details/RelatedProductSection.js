import React from 'react';
import htm from 'htm';
import { ProductCard } from '../../ui/cards/customer/ProductCard.js';
import FilledButton from '../../ui/buttons/FilledButton.js';

const html = htm.bind(React.createElement);

// Fallback sample products if database data isn't supplied
const sampleRelatedProducts = [
  { id: 101, category: 'Headphone', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 102, category: 'Headphone', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 103, category: 'Headphone', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 104, category: 'Headphone', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 105, category: 'Headphone', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 106, category: 'Headphone', title: 'HEADY STUDIO MONITOR 50', price: 900.00, stock: 0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
];

export default function RelatedProductSection({
  currentProduct = {},
  products = [],
  onAddToCart,
  onLoadMore
}) {
  const currentCategory = currentProduct?.category || '';
  const currentId = currentProduct?.id;

  // Filter products by matching category only, excluding the currently viewed product
  const sameCategoryProducts = products.filter((p) => {
    const isSameCategory = currentCategory
      ? p.category?.toLowerCase() === currentCategory.toLowerCase()
      : true;
    const isNotCurrent = p.id !== currentId;
    return isSameCategory && isNotCurrent;
  });

  const displayedProducts = sameCategoryProducts.length > 0 
    ? sameCategoryProducts 
    : sampleRelatedProducts;

  const sfProStyle = {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  };

  return html`
    <link 
      rel="stylesheet" 
      href="https://fonts.cdnfonts.com/css/sf-pro-display-cdn" 
    />

    <section style=${sfProStyle} className="w-full bg-[#18181b] py-8 sm:py-16 px-2 sm:px-8 text-white select-none">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        
        <!-- Section Header -->
        <div className="text-center space-y-2 px-2">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Similar Audio Gears
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base font-normal tracking-wide max-w-xl mx-auto">
            Studio-grade recording gear and desktop workstation essentials.
          </p>
        </div>

        <!-- Product Cards Grid: 2 cols on mobile, 3 cols on desktop -->
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 pt-2 w-full">
          ${displayedProducts.map((product) => html`
            <${ProductCard} 
              key=${product.id || product.title}
              id=${product.id}
              productUrl=${`/product.html?id=${product.id}`}
              ...${product}
              onAddToCart=${onAddToCart}
            />
          `)}
        </div>

        <!-- Bottom Action Button -->
        <div className="flex justify-center pt-4 sm:pt-8">
          <${FilledButton} 
            text="See more products"
            onClick=${onLoadMore}
            bgColor="bg-white"
            textColor="text-black"
            width="w-auto px-8 sm:px-10"
            height="h-[46px] sm:h-[52px]"
            className="shadow-white/10 text-sm sm:text-base font-semibold hover:bg-zinc-200 rounded-full"
          />
        </div>

      </div>
    </section>
  `;
}