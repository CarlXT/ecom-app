import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function ProductOrderedCard({
  image = '',
  productName = 'Heady Studio Monitor 50',
  category = 'Headphone',
  price = 'Php 900.00',
  quantity = 1,
  className = '',
  ...props
}) {
  return html`
    <div 
      className=${`flex items-center justify-between p-2.5 rounded-[22px] bg-[#433e48] text-white w-full max-w-[558px] h-[109px] font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] box-border overflow-hidden ${className}`}
      ...${props}
    >
      <!-- Left Content: Image & Details -->
      <div className="flex items-center gap-3.5 h-full min-w-0">
        <!-- Product Image -->
        <div className="w-[145px] h-[89px] rounded-[22px] overflow-hidden flex-shrink-0 bg-zinc-800">
          <img 
            src=${image} 
            alt=${productName} 
            className="w-full h-full object-cover object-center"
            onError=${(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        <!-- Text Details -->
        <div className="flex flex-col justify-center h-full min-w-0 pr-2">
          <h3 className="text-[24px] font-normal leading-tight text-white truncate">
            ${productName}
          </h3>
          <p className="text-[15px] font-thin text-zinc-300 leading-normal tracking-wide truncate">
            ${category}
          </p>
        </div>
      </div>

      <!-- Right Content: Price & Quantity -->
      <div className="flex flex-col justify-between items-end h-full py-1 pl-2 flex-shrink-0">
        <span className="text-[24px] font-normal text-white leading-tight">
          ${typeof price === 'number' ? `Php ${price.toFixed(2)}` : price}
        </span>
        <span className="text-[15px] font-thin text-zinc-300 leading-normal tracking-wide">
          Qty: ${quantity}
        </span>
      </div>
    </div>
  `;
}

export default ProductOrderedCard;
