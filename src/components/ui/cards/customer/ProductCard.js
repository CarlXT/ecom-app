import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function ProductCard(props) {
  const {
    id,
    productUrl,
    image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    title = 'HEADY STUDIO MONITOR 50',
    category = 'Headphone',
    price = 900.00,
    currency = 'Php',
    stock = 120,
    status,
    depletingThreshold = 10,
    onAddToCart,
    onViewDetails
  } = props;

  const isOutOfStock = status === 'out_of_stock' || stock <= 0;

  const getBadgeColorClass = () => {
    if (isOutOfStock) return 'bg-[#8E8E93]';
    if (status === 'depleting' || stock <= depletingThreshold) return 'bg-[#FF3B30]';
    return 'bg-[#34C759]';
  };

  const formattedPrice = typeof price === 'number' 
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price;
    
  const handleViewDetails = (e) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(e, props);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    if (typeof onAddToCart === 'function') {
      onAddToCart({
        id: id || title,
        title,
        price,
        image,
        category,
        stock,
        quantity: 1
      }, e);
    } else {
      console.warn('onAddToCart handler is missing from parent component props.');
    }
  };

  const targetUrl = productUrl || `/product.html?id=${id || encodeURIComponent(title)}`;

  return html`
    <div class="w-full max-w-[436px] bg-transparent text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] flex flex-col justify-between p-1.5 sm:p-2.5 select-none box-border">
      
      <!-- Product Image -->
      <div class="w-full aspect-square overflow-hidden rounded-2xl sm:rounded-[32px] mx-auto flex-shrink-0 bg-zinc-900">
        <img 
          src=${image} 
          alt=${title} 
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <!-- Card Details Container -->
      <div class="px-0.5 sm:px-1 flex flex-col justify-between flex-grow pt-2 sm:pt-4 pb-0.5 gap-1.5 sm:gap-3">
        
        <!-- Category & Dynamic Stock Badge Row -->
        <div class="flex items-center justify-between text-[11px] xs:text-xs sm:text-[24px] font-light leading-tight text-zinc-300 sm:text-zinc-100">
          <span class="truncate max-w-[50%]">${category}</span>
          
          <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <span>${stock > 0 ? `${stock} stocks` : 'Out of stock'}</span>
            <span class=${`w-2.5 h-2.5 sm:w-5 sm:h-5 rounded-full inline-block transition-colors duration-300 ${getBadgeColorClass()}`}></span>
          </div>
        </div>

        <!-- Product Name -->
        <h2 class="text-sm sm:text-[32px] font-black uppercase tracking-tight leading-snug sm:leading-[1.05] text-white line-clamp-2">
          ${title}
        </h2>

        <!-- Price & Action Icons Row -->
        <div class="flex items-center justify-between pt-0.5 sm:pt-1">
          <!-- Price Label -->
          <span class="text-sm xs:text-base sm:text-[32px] font-bold sm:font-normal tracking-tight text-white whitespace-nowrap">
            ${currency} ${formattedPrice}
          </span>

          <!-- Icons Container -->
          <div class="flex items-center gap-2 sm:gap-5 text-white shrink-0">
            <!-- View Details Button -->
            <a 
              href=${targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick=${handleViewDetails}
              class="p-1 hover:text-red-400 transition-colors focus:outline-none cursor-pointer flex items-center justify-center active:scale-90"
              aria-label="View Details"
            >
              <svg class="w-5 h-4 sm:w-9 sm:h-7 stroke-current" viewBox="0 0 36 20" fill="none" strokeWidth="3" strokeLinecap="round">
                <line x1="2" y1="5" x2="34" y2="5" />
                <line x1="2" y1="15" x2="26" y2="15" />
              </svg>
            </a>

            <!-- Add to Cart Button -->
            <button 
              onClick=${handleAddToCart}
              disabled=${isOutOfStock}
              type="button"
              class=${`p-1 hover:text-red-400 transition-all focus:outline-none cursor-pointer flex items-center justify-center active:scale-90 ${
                isOutOfStock ? 'opacity-40 cursor-not-allowed hover:text-white' : ''
              }`}
              aria-label="Add to Cart"
            >
              <svg class="w-5 h-5 sm:w-8 sm:h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </button>
          </div>

        </div>

      </div>

    </div>
  `;
}