import React, { useState } from 'react';
import htm from 'htm';
import FeaturedProductCard from './FeaturedProductCard.js';

const html = htm.bind(React.createElement);

export default function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      tagline: 'BEST SELLER',
      title: 'Heady Studio Monitor 50',
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'our #1 best-selling headphones built for pristine clarity, deep bass accuracy, and zero fatigue during long production sessions.'
    },
    {
      id: 2,
      tagline: 'NEW ARRIVAL',
      title: 'Heady Wireless Pro X',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Active noise cancelling studio monitors designed for audiophiles on the go with 40-hour battery life.'
    }
  ];

  return html`
    <!-- Carousel Outer Wrapper -->
    <div class="relative w-full max-w-6xl mx-auto px-4 py-12 overflow-hidden">
      
      <!-- Track Slider -->
      <div 
        class="flex transition-transform duration-500 ease-out"
        style=${{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        ${products.map(
          (product) => html`
            <div key=${product.id} class="w-full flex-shrink-0 px-2">
              <${FeaturedProductCard}
                tagline=${product.tagline}
                title=${product.title}
                image=${product.image}
                description=${product.description}
                onBuyNowClick=${() => alert(`Buying ${product.title}`)}
                onAddToCartClick=${() => alert(`Added ${product.title} to cart`)}
              />
            </div>
          `
        )}
      </div>

      <!-- Controls -->
      <div class="flex justify-center gap-4 mt-6">
        <button 
          onClick=${() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          class="p-3 bg-zinc-800 text-white rounded-full hover:bg-zinc-700"
        >
          ←
        </button>
        <button 
          onClick=${() => setCurrentIndex((prev) => Math.min(products.length - 1, prev + 1))}
          class="p-3 bg-zinc-800 text-white rounded-full hover:bg-zinc-700"
        >
          →
        </button>
      </div>

    </div>
  `;
}