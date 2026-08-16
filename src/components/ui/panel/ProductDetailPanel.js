import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function ProductDetailPanel({ product, onClose, onEditClick }) {
  if (!product) return null;

  // Destructure attributes with dynamic fallback values
  const {
    name = '',
    category = 'Uncategorized',
    status = 'Active',
    price = '0.00',
    description = 'No description available for this product.',
    stocks = 0,
    image = '/assets/placeholder.jpg'
  } = product;

  return html`
    <div className="w-full flex flex-col gap-8 text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] animate-fadeIn">
      
      <!-- Top Close / View Title Bar -->
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick=${onClose}
          className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Close view"
        >
          <svg className="w-8 h-8 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-[32px] font-normal tracking-tight text-white">
          Edit product
        </h2>
      </div>

      <!-- Main Two-Column Layout -->
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <!-- Left: Dynamic Product Image -->
        <div className="w-full h-[520px] rounded-[32px] overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
          <img
            src=${image}
            alt=${name}
            className="w-full h-full object-cover"
          />
        </div>

        <!-- Right: Dynamic Product Details -->
        <div className="flex flex-col justify-between h-full space-y-6 pt-2">
          
          <!-- Dynamic Category & Status -->
          <div className="flex items-center justify-between w-full">
            <span className="text-[28px] font-light text-zinc-400">
              ${category}
            </span>

            <span className="px-6 py-1.5 rounded-full border border-emerald-600/80 text-emerald-400 text-sm font-normal tracking-wide">
              ${status}
            </span>
          </div>

          <!-- Dynamic Price -->
          <div className="text-[36px] font-bold text-white tracking-tight">
            Php ${price}
          </div>

          <!-- Dynamic Title / Name -->
          <h1 className="text-[44px] font-bold text-white tracking-tight leading-tight">
            ${name}
          </h1>

          <!-- Dynamic Description -->
          <p className="text-zinc-300 text-lg font-light leading-relaxed max-w-[540px]">
            ${description}
          </p>

          <!-- Dynamic Stocks -->
          <div className="text-[24px] font-light text-zinc-300 pt-2">
            No. of Stocks: ${stocks}
          </div>

          <!-- Action Button -->
          <div className="pt-4 max-w-[420px]">
            <button
              type="button"
              onClick=${() => onEditClick && onEditClick(product)}
              className="w-full py-4 bg-white text-[#121214] hover:bg-zinc-200 rounded-full text-xl font-normal transition-colors cursor-pointer text-center"
            >
              Edit product
            </button>
          </div>

        </div>

      </div>
    </div>
  `;
}

export default ProductDetailPanel;
