import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export default function CartModal({ isOpen, onClose, cartItems = [], onUpdateQty, onRemoveItem, onProceedToCheckout }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return html`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-['SF_Pro_Display',-apple-system,sans-serif]">
      
      <!-- Outer Card -->
      <div class="relative w-full max-w-2xl bg-[#52525c] text-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white/10 flex flex-col justify-between min-h-[480px]">
        
        <!-- Top Header Bar -->
        <div class="flex items-center gap-4 mb-6">
          <button 
            onClick=${onClose}
            class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold hover:bg-zinc-200 transition-transform active:scale-90 cursor-pointer"
          >
            ✕
          </button>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Items in your cart</h2>
        </div>

        <!-- Items Table -->
        <div class="flex-grow overflow-y-auto mb-6 pr-2">
          <!-- Table Header -->
          <div class="grid grid-cols-12 text-zinc-300 text-sm font-semibold border-b border-zinc-400/30 pb-3 px-2 text-center">
            <span class="col-span-4 text-left">Items</span>
            <span class="col-span-2">Quantity</span>
            <span class="col-span-2">Price</span>
            <span class="col-span-1">Edit qty</span>
            <span class="col-span-1">Remove</span>
            <span class="col-span-2">Confirm</span>
          </div>

          <!-- Table Rows -->
          ${cartItems.map((item) => html`
            <div key=${item.id} class="grid grid-cols-12 items-center text-center py-4 text-sm border-b border-zinc-400/20">
              <!-- Item Name -->
              <div class="col-span-4 text-left font-medium text-white truncate pr-2">
                ${item.title}
              </div>

              <!-- Quantity -->
              <div class="col-span-2 font-bold text-lg">
                ${String(item.quantity).padStart(2, '0')}
              </div>

              <!-- Price -->
              <div class="col-span-2 font-medium">
                ${item.price.toFixed(2)}
              </div>

              <!-- Edit Qty Icon Button -->
              <div class="col-span-1 flex justify-center">
                <button class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow hover:scale-105 active:scale-95">
                  ✏️
                </button>
              </div>

              <!-- Remove Icon Button -->
              <div class="col-span-1 flex justify-center">
                <button 
                  onClick=${() => onRemoveItem(item.id)}
                  class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow hover:scale-105 active:scale-95"
                >
                  ✕
                </button>
              </div>

              <!-- Confirm Icon Button -->
              <div class="col-span-2 flex justify-center">
                <button class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow hover:scale-105 active:scale-95">
                  ✓
                </button>
              </div>
            </div>
          `)}
        </div>

        <!-- Bottom Action Bar Overlay -->
        <div class="w-full bg-[#1e1e24] rounded-full p-3 sm:px-6 flex items-center justify-between border border-white/10 shadow-xl">
          <div class="flex items-center gap-6 text-sm sm:text-base font-bold">
            <div>
              <span class="text-zinc-400 mr-2">Total:</span>
              <span class="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span class="text-zinc-400 mr-2">Subtotal:</span>
              <span class="text-white">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onClick=${onProceedToCheckout}
              class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-full shadow-lg active:scale-95 transition-all"
            >
              Checkout
            </button>
            <button 
              onClick=${onClose}
              class="px-4 py-2.5 bg-white text-black font-extrabold text-sm rounded-full hover:bg-zinc-200 active:scale-95 transition-all"
            >
              Cancel Items
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}