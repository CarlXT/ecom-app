import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Reusable Red Filled Button Component
export function FilledButton({ children, onClick, className = '' }) {
  return html`
    <button
      type="button"
      onClick=${onClick}
      class=${`px-8 py-3 bg-[#E50914] hover:bg-red-700 active:scale-95 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase rounded-full shadow-lg shadow-red-900/40 transition-all duration-200 focus:outline-none cursor-pointer ${className}`}
    >
      ${children}
    </button>
  `;
}

// Sample Featured Products List
const sampleFeaturedProducts = [
  {
    id: 1,
    tag: 'NO. 1 BEST SELLER',
    title: 'HEADY STUDIO MONITOR 50',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 2,
    tag: 'NEW RELEASE',
    title: 'HEADY DYNAMIC MIC PRO',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 3,
    tag: 'TOP RATED',
    title: 'ACOUSTIC MESH FILTER X',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 4,
    tag: 'ESSENTIAL GEAR',
    title: 'HEAVY DUTY BOOM ARM MOUNT',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80'
  }
];

export default function BannerSection({ 
  products = sampleFeaturedProducts, 
  onBuyNow 
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const currentProduct = products[activeIndex] || products[0];

  // Auto-advance slide every 5 seconds
  useEffect(() => {
    if (!products || products.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products]);

  const handleActionClick = () => {
    if (onBuyNow) {
      onBuyNow(currentProduct);
    } else {
      navigate('/shop');
    }
  };

  // Font style constant for SF Pro family
  const sfProFontStyle = {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  };

  return html`

    <!-- Load SF Pro Display Web Font CDN for devices without native Apple fonts -->
    <link 
      rel="stylesheet" 
      href="https://fonts.cdnfonts.com/css/sf-pro-display-cdn" 
    />
    
    <!-- SECTION: Full edge-to-edge viewport dimensions -->
    <section 
      style=${sfProFontStyle}
      class="relative w-full h-[500px] lg:h-[750px] rounded-none rounded-b-[40px] sm:rounded-b-[60px] md:rounded-b-[82px] overflow-hidden bg-black select-none flex flex-col justify-between m-0 p-0"
    >
      <!-- Background Image Track with Smooth Slide Animation -->
      <div 
        class="absolute inset-0 w-full h-full flex transition-transform duration-700 ease-out"
        style=${{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        ${products.map(
          (prod) => html`
            <div
              key=${prod.id || prod.title}
              class="w-full h-full flex-shrink-0 bg-cover bg-center"
              style=${{ backgroundImage: `url(${prod.image})` }}
            />
          `
        )}
      </div>

      <!-- Vignette Gradient Overlay to ensure text readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

      <!-- Content Overlay (Left Aligned Text & Button) -->
      <div class="absolute inset-0 p-8 sm:p-12 md:p-16 flex flex-col justify-end z-10">
        <div class="max-w-xl space-y-3 sm:space-y-4">
          
          <!-- Tag Line -->
          <span class="block text-white text-base sm:text-xl font-bold tracking-widest uppercase opacity-95 drop-shadow-md">
            ${currentProduct.tag}
          </span>

          <!-- Product Title -->
          <h2 class="text-white text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.05] drop-shadow-lg">
            ${currentProduct.title}
          </h2>

          <!-- Buy / Shop Action Button -->
          <div class="pt-2 sm:pt-4">
            <${FilledButton} onClick=${handleActionClick}>
              BUY NOW
            <//>
          </div>

        </div>
      </div>

      <!-- Pagination Dots (Bottom Right Aligned) -->
      <div class="absolute bottom-6 right-8 sm:bottom-10 sm:right-12 z-20 flex items-center gap-3">
        ${products.map(
          (_, idx) => html`
            <button
              key=${idx}
              type="button"
              onClick=${() => setActiveIndex(idx)}
              aria-label="Go to slide ${idx + 1}"
              class="transition-all duration-300 focus:outline-none cursor-pointer rounded-full ${
                activeIndex === idx
                  ? 'w-4 h-4 bg-white shadow-md scale-110'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }"
            ></button>
          `
        )}
      </div>

    </section>
  `;
}