import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function ProductCard({
  image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  title = 'HEADY STUDIO MONITOR 50',
  category = 'Headphone',
  price = 900.00,
  currency = 'Php',
  stock = 120,
  status, // Optional explicit status: 'full' | 'depleting' | 'out_of_stock'
  depletingThreshold = 10, // Stock level below which stock is considered depleting
  onAddToCart,
  onViewDetails
}) {

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

  // Formats price into standard currency format (e.g. 900.00)
  const formattedPrice = typeof price === 'number' 
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price;

  return html`
    <!-- Outer Card: Figma w-436 h-609, Transparent Background -->
    <div class="w-[436px] h-[609px] bg-transparent text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] flex flex-col justify-between p-2.5 select-none box-border">
      
      <!-- Product Image: Figma w-416 h-360, Corner Radius 32 -->
      <div class="w-[416px] h-[360px] overflow-hidden rounded-[32px] mx-auto flex-shrink-0 bg-zinc-900">
        <img 
          src=${image} 
          alt=${title} 
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <!-- Card Details Container -->
      <div class="px-1 flex flex-col justify-between flex-grow pt-4 pb-1">
        
        <!-- Category & Dynamic Stock Badge Row (Font size 24, Light) -->
        <div class="flex items-center justify-between text-[24px] font-light leading-tight text-zinc-100">
          <span>${category}</span>
          
          <div class="flex items-center gap-3">
            <span>${stock > 0 ? `${stock} stocks` : 'Out of stock'}</span>
            <span class=${`w-5 h-5 rounded-full inline-block transition-colors duration-300 ${getBadgeColorClass()}`}></span>
          </div>
        </div>

        <!-- Product Name (Font size 32, Black) -->
        <h2 class="text-[32px] font-black uppercase tracking-tight leading-[1.05] text-white line-clamp-2">
          ${title}
        </h2>

        <!-- Price & Action Icons Row (Font size 32, Regular) -->
        <div class="flex items-center justify-between items-baseline pt-1">
          <!-- Price Label -->
          <span class="text-[32px] font-normal tracking-tight text-white">
            ${currency} ${formattedPrice}
          </span>

          <!-- Icons Container -->
          <div class="flex items-center gap-5 text-white">
            <!-- Equalizer / Detail lines icon -->
            <button 
              onClick=${onViewDetails}
              type="button"
              class="p-1 hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
              aria-label="View Details"
            >
              <svg class="w-9 h-7 stroke-current" viewBox="0 0 36 20" fill="none" stroke-width="3" stroke-linecap="round">
                <line x1="2" y1="5" x2="34" y2="5" />
                <line x1="2" y1="15" x2="26" y2="15" />
              </svg>
            </button>

            <!-- Cart + Icon -->
            <button 
              onClick=${onAddToCart}
              type="button"
              class="p-1 hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
              aria-label="Add to Cart"
            >
              <svg class="w-10 h-10 fill-none stroke-current" viewBox="0 0 28 28" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3h3l2.4 12.5a2 2 0 002 1.5h11.2a2 2 0 002-1.6l1.8-8.4H7" />
                <circle cx="11" cy="22" r="1.5" fill="currentColor" />
                <circle cx="20" cy="22" r="1.5" fill="currentColor" />
                <!-- Plus Badge -->
                <path d="M16 8h4M18 6v4" stroke-width="2.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}