import React from 'react';
import htm from 'htm';
import FilledButton from './FilledButton.js';

const html = htm.bind(React.createElement);

export default function FeaturedProductCard({
  image = 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
  title = 'Heady Studio Monitor 50',
  tagline = 'BEST SELLER',
  description = 'our #1 best-selling headphones built for pristine clarity, deep bass accuracy, and zero fatigue during long production sessions.',
  buyNowTo = '/checkout',
  onBuyNowClick,
  onAddToCartClick,
  className = ''
}) {
  const fontStyle = {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  };

  return html`
    <!-- Load SF Pro CDN Font -->
    <link 
      rel="stylesheet" 
      href="https://fonts.cdnfonts.com/css/sf-pro-display-cdn" 
    />

    <!-- Carousel Item Container (flex-shrink-0 w-full makes it slide/carousel-ready) -->
    <div 
      style=${fontStyle}
      class=${`
        flex-shrink-0 w-full max-w-[1000px] mx-auto bg-[#171719] text-white 
        rounded-[36px] p-6 sm:p-8 md:p-10 shadow-2xl border border-zinc-800/60 
        select-none ${className}
      `}
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        
        <!-- Left: Image Container -->
        <div class="w-full h-[320px] sm:h-[400px] md:h-[420px] rounded-[28px] overflow-hidden bg-zinc-900 flex-shrink-0">
          <img 
            src=${image} 
            alt=${title} 
            class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        <!-- Right: Text & Action Content -->
        <div class="flex flex-col justify-center items-start space-y-4 md:space-y-6">
          
          <!-- Tagline Header -->
          <span class="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-zinc-300">
            ${tagline}
          </span>

          <!-- Product Title -->
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] text-white">
            ${title}
          </h2>

          <!-- Description -->
          <p class="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal max-w-md">
            ${description}
          </p>

          <!-- Buttons Row -->
          <div class="flex items-center gap-4 pt-2 sm:pt-4 w-full flex-wrap">
            <!-- Buy Now Button (Reusing your FilledButton) -->
            <${FilledButton}
              text="Buy Now"
              to=${buyNowTo}
              onClick=${onBuyNowClick}
              width="w-[140px] sm:w-[160px]"
              height="h-[52px] sm:h-[56px]"
              className="text-base sm:text-lg font-extrabold"
            />

            <!-- Add to Cart Secondary Button -->
            <button
              type="button"
              onClick=${onAddToCartClick}
              class="
                w-[140px] sm:w-[160px] h-[52px] sm:h-[56px] rounded-full 
                bg-white text-black font-extrabold text-base sm:text-lg tracking-tight 
                hover:bg-zinc-200 active:scale-95 transition-all duration-200 
                cursor-pointer shadow-md select-none flex items-center justify-center
              "
            >
              Add to Cart
            </button>
          </div>

        </div>

      </div>
    </div>
  `;
}