import React from 'react';
import htm from 'htm';
import { ProductOrderedCard } from '../../ui/cards/customer/ProductOrderedCard.js';

const html = htm.bind(React.createElement);

export function OrderSummarySection({ cartItems = [], subtotal = 0 }) {
  const totalItemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return html`
    <div className="lg:col-span-5 bg-[#171719] border border-zinc-800 rounded-3xl p-6 space-y-6 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
      <h3 className="text-xl font-bold text-white">Your Orders</h3>

      <!-- Items Preview list rendered via ProductOrderedCard -->
      <div className="space-y-4">
        ${cartItems.map(
          (item) => html`
            <${ProductOrderedCard}
              key=${item.id}
              image=${item.image}
              productName=${item.productName || item.title}
              category=${item.category || 'Headphone'}
              price=${item.price}
              quantity=${item.quantity}
            />
          `
        )}
      </div>

      <!-- Price Breakdown -->
      <div className="border-t border-zinc-800 pt-4 space-y-2 text-sm">
        <div className="flex justify-between font-bold text-lg text-white">
          <span>Subtotal:</span>
          <span>Php ${typeof subtotal === 'number' ? subtotal.toFixed(2) : subtotal}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>No. of Items:</span>
          <span>${totalItemCount}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Shipping Fee:</span>
          <span>Php 0.00</span>
        </div>
        <div className="flex justify-between font-extrabold text-xl text-white border-t border-zinc-800 pt-3">
          <span>Total:</span>
          <span>Php ${typeof subtotal === 'number' ? subtotal.toFixed(2) : subtotal}</span>
        </div>
      </div>
    </div>
  `;
}

export default OrderSummarySection;
