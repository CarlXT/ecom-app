import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import htm from 'htm';
import ProductStatusBadge from '../../ui/badge/ProductStatusBadge.js';
import FilledButton from '../../ui/buttons/FilledButton.js';

const html = htm.bind(React.createElement);

export default function ProductDetailSection({ product = {}, onAddToCart, onClose }) {
  const {
    id,
    image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category = 'Headphone',
    price = 900.00,
    currency = 'Php',
    title = 'Heady Studio Monitor 50',
    description = 'our #1 best-selling headphones built for pristine clarity, deep bass accuracy, and zero fatigue during long production sessions.',
    stock = 100,
    status = 'Active'
  } = product;

  const [quantity, setQuantity] = useState(1);

  // Sync quantity if stock changes
  useEffect(() => {
    if (stock <= 0) {
      setQuantity(0);
    } else {
      setQuantity(1);
    }
  }, [stock]);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(stock > 0 ? 1 : 0, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (onAddToCart && quantity > 0) {
      onAddToCart(product, quantity);
    }
  };

  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : price;
  const formattedQuantity = String(quantity).padStart(2, '0');

  const sfProStyle = {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  };

  return html`
    <link 
      rel="stylesheet" 
      href="https://fonts.cdnfonts.com/css/sf-pro-display-cdn" 
    />

    <section style=${sfProStyle} className="w-full bg-[#18181b] text-white pt-16 sm:pt-20 md:pt-24 px-4 sm:px-8 md:px-12 pb-8 select-none">
      <div className="max-w-6xl mx-auto space-y-6">

        <!-- Product Main Container -->
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          
          <!-- Product Image -->
          <div className="w-full aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl">
            <img 
              src=${image} 
              alt=${title} 
              className="w-full h-full object-cover"
            />
          </div>

          <!-- Product Details Column -->
          <div className="flex flex-col space-y-4 sm:space-y-6">
            
            <!-- Category (32px Thin) & Status Badge -->
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl sm:text-[32px] font-thin text-zinc-300 tracking-wide leading-none">
                ${category}
              </span>
              <${ProductStatusBadge} status=${status} />
            </div>

            <!-- Price (36px Bold) -->
            <div className="text-2xl sm:text-[36px] font-bold text-white tracking-tight leading-none">
              ${currency} ${formattedPrice}
            </div>

            <!-- Product Name (48px Black) -->
            <h1 className="text-3xl sm:text-[48px] font-black text-white leading-none uppercase tracking-tight">
              ${title}
            </h1>

            <!-- Product Description (32px Light) -->
            <p className="text-base sm:text-[22px] lg:text-[28px] xl:text-[32px] font-light text-zinc-300 leading-snug sm:leading-snug">
              ${description}
            </p>

            <!-- Stock Count & Quantity Selector -->
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              
              <!-- Stock Number (32px Thin) -->
              <div className="text-base sm:text-[24px] lg:text-[32px] font-thin text-zinc-300">
                No. of Stocks: <span className="font-normal text-white">${stock}</span>
              </div>

              <!-- Quantity Controls (Label & Digits: 32px Thin) -->
              <div className="flex items-center gap-3">
                <span className="text-base sm:text-[24px] lg:text-[32px] font-thin text-zinc-300">
                  Qty:
                </span>
                
                <div className="flex items-center gap-3">
                  <!-- Decrement Button -->
                  <button 
                    type="button"
                    onClick=${handleDecrement}
                    disabled=${quantity <= 1}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black font-bold text-lg flex items-center justify-center hover:bg-zinc-200 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    -
                  </button>

                  <!-- Quantity Digit (32px Thin) -->
                  <span className="text-base sm:text-[24px] lg:text-[32px] font-thin text-white min-w-[2ch] text-center">
                    ${formattedQuantity}
                  </span>

                  <!-- Increment Button -->
                  <button 
                    type="button"
                    onClick=${handleIncrement}
                    disabled=${quantity >= stock}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black font-bold text-lg flex items-center justify-center hover:bg-zinc-200 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            <!-- Add to Cart FilledButton -->
            <div className="pt-4 sm:pt-6">
              <${FilledButton} 
                text="Add to Cart"
                onClick=${handleAddToCart}
                disabled=${stock <= 0}
                bgColor="bg-white"
                textColor="text-black"
                width="w-full"
                height="h-[52px] sm:h-[60px]"
                className="text-base sm:text-lg font-semibold hover:bg-zinc-200 rounded-full shadow-lg"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  `;
}