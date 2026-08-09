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
    status, // Optional explicit status: 'full' | 'depleting' | 'out_of_stock'
    depletingThreshold = 10,
    onAddToCart,
    onViewDetails
  } = props;

  // Dynamic stock indicator badge color logic
  const getBadgeColorClass = () => {
    if (status === 'out_of_stock' || stock <= 0) {
      return 'bg-[#8E8E93]'; // Grey
    }
    if (status === 'depleting' || stock <= depletingThreshold) {
      return 'bg-[#FF3B30]'; // Red
    }
    return 'bg-[#34C759]'; // Green (Full stock)
  };

  // Formats price into standard currency format
  const formattedPrice = typeof price === 'number' 
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price;
    
  const handleViewDetails = (e) => {
    if (onViewDetails) {
      e.preventDefault(); // Prevents default href redirect
      onViewDetails(e, props);
    }
  };

  const handleAddToCart = (e) => {
    if (onAddToCart) {
      onAddToCart(e, props);
    }
  };

  const targetUrl = productUrl || `/product.html?id=${id || encodeURIComponent(title)}`;
 
  return html`
    <!-- Outer Card: Fluid width for 2-column grid, original desktop max dimensions -->
    <div className="w-full max-w-[436px] bg-transparent text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] flex flex-col justify-between p-1.5 sm:p-2.5 select-none box-border">
      
      <!-- Product Image: Responsive Aspect-Ratio box with rounded corners -->
      <div className="w-full aspect-square overflow-hidden rounded-2xl sm:rounded-[32px] mx-auto flex-shrink-0 bg-zinc-900">
        <img 
          src=${image} 
          alt=${title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <!-- Card Details Container -->
      <div className="px-0.5 sm:px-1 flex flex-col justify-between flex-grow pt-2 sm:pt-4 pb-0.5 gap-1.5 sm:gap-3">
        
        <!-- Category & Dynamic Stock Badge Row -->
        <div className="flex items-center justify-between text-[11px] xs:text-xs sm:text-[24px] font-light leading-tight text-zinc-300 sm:text-zinc-100">
          <span className="truncate max-w-[50%]">${category}</span>
          
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <span>${stock > 0 ? `${stock} stocks` : 'Out of stock'}</span>
            <span className=${`w-2.5 h-2.5 sm:w-5 sm:h-5 rounded-full inline-block transition-colors duration-300 ${getBadgeColorClass()}`}></span>
          </div>
        </div>

        <!-- Product Name -->
        <h2 className="text-sm sm:text-[32px] font-black uppercase tracking-tight leading-snug sm:leading-[1.05] text-white line-clamp-2">
          ${title}
        </h2>

        <!-- Price & Action Icons Row -->
        <div className="flex items-center justify-between pt-0.5 sm:pt-1">
          <!-- Price Label -->
          <span className="text-sm xs:text-base sm:text-[32px] font-bold sm:font-normal tracking-tight text-white whitespace-nowrap">
            ${currency} ${formattedPrice}
          </span>

          <!-- Icons Container -->
          <div className="flex items-center gap-2 sm:gap-5 text-white shrink-0">
            <!-- View Details Button (Opens Product Details Page in a New Tab) -->
            <a 
              href=${targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick=${handleViewDetails}
              className="p-0.5 sm:p-1 hover:text-red-400 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label="View Details"
            >
              <svg className="w-5 h-4 sm:w-9 sm:h-7 stroke-current" viewBox="0 0 36 20" fill="none" strokeWidth="3" strokeLinecap="round">
                <line x1="2" y1="5" x2="34" y2="5" />
                <line x1="2" y1="15" x2="26" y2="15" />
              </svg>
            </a>

            <!-- Add to Cart Button -->
            <button 
              onClick=${handleAddToCart}
              type="button"
              className="p-0.5 sm:p-1 hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
              aria-label="Add to Cart"
            >
              <svg className="w-5 h-5 sm:w-10 sm:h-10 fill-none stroke-current" viewBox="0 0 28 28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h3l2.4 12.5a2 2 0 002 1.5h11.2a2 2 0 002-1.6l1.8-8.4H7" />
                <circle cx="11" cy="22" r="1.5" fill="currentColor" />
                <circle cx="20" cy="22" r="1.5" fill="currentColor" />
                <path d="M16 8h4M18 6v4" strokeWidth="2.5" />
              </svg>
            </button>
          </div>

        </div>

      </div>

    </div>
  `;
}