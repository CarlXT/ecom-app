import React, { useState } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Reusable Category Button Component
export function CategoryButton({ label, icon, isActive, onClick }) {
  return html`
    <button
      onClick=${onClick}
      class="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-3xl transition-transform active:scale-95 shadow-lg aspect-square cursor-pointer focus:outline-none"
    >
      <div class="mb-3">
        ${icon}
      </div>
      <span class="text-sm sm:text-base font-medium tracking-tight">${label}</span>
    </button>
  `;
}

// Sample Data for Featured Carousel Products
const sampleFeaturedProducts = [
  {
    id: 1,
    tag: 'BEST SELLER',
    title: 'Heady Studio Monitor 50',
    description: 'our #1 best-selling headphones built for pristine clarity, deep bass accuracy, and zero fatigue during long production sessions.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    price: 900.00
  },
  {
    id: 2,
    tag: 'NEW RELEASE',
    title: 'Heady Dynamic Mic Pro',
    description: 'Broadcast-ready dynamic microphone with built-in pop filter and ultra-low noise floor for podcasts and vocal tracking.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    price: 1200.00
  },
  {
    id: 3,
    tag: 'TOP RATED',
    title: 'Acoustic Mesh Filter X',
    description: 'Dual-layer studio pop filter designed to eliminate plosives without muffling subtle high frequencies.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    price: 350.00
  },
  {
    id: 4,
    tag: 'ESSENTIAL GEAR',
    title: 'Heavy Duty Boom Arm Mount',
    description: 'Precision spring-loaded desk mount arm with internal cable channels for clean studio desk configurations.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    price: 450.00
  }
];

export default function FeaturedProductSection({ onAddToCart, onBuyNow }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentProduct = sampleFeaturedProducts[activeIndex];

  // Category items with SVG icons
  const categories = [
    {
      id: 'mics',
      label: 'Microphones',
      icon: html`
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
        </svg>
      `
    },
    {
      id: 'headphones',
      label: 'Headphones',
      icon: html`
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 00-9 9v7c0 1.1.9 2 2 2h3a1 1 0 001-1v-6a1 1 0 00-1-1H5v-1a7 7 0 0114 0v1h-2a1 1 0 00-1 1v6a1 1 0 001 1h3a2 2 0 002-2v-7a9 9 0 00-9-9z"/>
        </svg>
      `
    },
    {
      id: 'filters',
      label: 'Filters',
      icon: html`
        <svg class="w-8 h-8 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M4 6h16M7 12h10M10 18h4"/>
        </svg>
      `
    },
    {
      id: 'mounts',
      label: 'Mounts',
      icon: html`
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm0-8a5 5 0 110 10 5 5 0 010-10zm-7 13h14v2H5v-2z"/>
        </svg>
      `
    }
  ];

  return html`
    <section class="w-full bg-[#121214] text-white py-12 px-4 sm:px-8 font-['SF_Pro_Display',-apple-system,sans-serif]">
      <div class="max-w-4xl mx-auto space-y-10">

        <!-- Top Tagline Description -->
        <p class="text-center text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
          Discover studio-grade dynamic mics, flat-response headphones, and heavy-duty mounting gear designed to elevate your production quality.
        </p>

        <!-- Category Grid (4 Red Category Buttons) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          ${categories.map((cat, idx) => html`
            <${CategoryButton}
              key=${cat.id}
              label=${cat.label}
              icon=${cat.icon}
              onClick=${() => setActiveIndex(idx)}
            />
          `)}
        </div>

        <!-- Featured Product Carousel Display -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
          
          <!-- Product Image (Left Column) -->
          <div class="md:col-span-6">
            <div class="relative w-full aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <img 
                src=${currentProduct.image} 
                alt=${currentProduct.title}
                class="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
          </div>

          <!-- Product Details (Right Column) -->
          <div class="md:col-span-6 space-y-4 text-left">
            <span class="inline-block text-xs font-black tracking-widest text-zinc-300 uppercase">
              ${currentProduct.tag}
            </span>

            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              ${currentProduct.title}
            </h2>

            <p class="text-zinc-300 text-sm sm:text-base leading-relaxed">
              ${currentProduct.description}
            </p>

            <!-- Action Buttons -->
            <div class="flex items-center gap-4 pt-2">
              <button
                onClick=${() => onBuyNow && onBuyNow(currentProduct)}
                class="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-full shadow-lg active:scale-95 transition-transform cursor-pointer focus:outline-none"
              >
                Buy Now
              </button>
              
              <button
                onClick=${() => onAddToCart && onAddToCart(currentProduct)}
                class="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-extrabold text-sm rounded-full shadow-lg active:scale-95 transition-transform cursor-pointer focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>

        <!-- Carousel Pagination Dots -->
        <div class="flex justify-center items-center gap-2.5 pt-4">
          ${sampleFeaturedProducts.map((_, idx) => html`
            <button
              key=${idx}
              onClick=${() => setActiveIndex(idx)}
              aria-label="Go to slide ${idx + 1}"
              class="w-2.5 h-2.5 rounded-full transition-all focus:outline-none cursor-pointer ${activeIndex === idx ? 'bg-white scale-125' : 'bg-zinc-600 hover:bg-zinc-400'}"
            ></button>
          `)}
        </div>

      </div>
    </section>
  `;
}