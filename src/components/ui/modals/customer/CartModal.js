import React, { useState } from 'react';
import htm from 'htm';
import FilledButton from '../../buttons/FilledButton.js';

const html = htm.bind(React.createElement);

export default function CartModal({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQty, 
  onRemoveItem, 
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  const [editingId, setEditingId] = useState(null);
  const [editQty, setEditQty] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditQty(item.quantity);
  };

  const handleConfirmEdit = (itemId) => {
    const parsed = parseInt(editQty, 10);
    if (!isNaN(parsed) && parsed > 0) {
      if (typeof onUpdateQty === 'function') {
        onUpdateQty(itemId, parsed);
      }
    }
    setEditingId(null);
  };

  const handleCheckout = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    window.open('/checkout.html', '_blank', 'noopener,noreferrer');
    if (typeof onProceedToCheckout === 'function') {
      onProceedToCheckout(e, cartItems);
    }
  };

  return html`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 font-['SF_Pro_Display',-apple-system,sans-serif]">
      
      <!-- Modal Container -->
      <div class="relative w-full max-w-2xl bg-[#52525c] text-white rounded-2xl sm:rounded-[32px] p-4 sm:p-8 shadow-2xl border border-white/10 flex flex-col max-h-[90vh] sm:max-h-[85vh]">
        
        <!-- Header -->
        <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
          <button 
            onClick=${onClose}
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center font-bold hover:bg-zinc-200 transition-transform active:scale-90 cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            ✕
          </button>
          <h2 class="text-xl sm:text-3xl font-extrabold tracking-tight truncate">Items in your cart</h2>
        </div>

        <!-- Items Container -->
        <div class="flex-grow overflow-y-auto mb-4 sm:mb-6 pr-1 sm:pr-2">
          
          <!-- Desktop Header (Exact Screenshot Columns) -->
          <div class="hidden md:grid grid-cols-12 text-zinc-200 text-sm font-semibold pb-4 px-2 items-center text-center">
            <span class="col-span-4 text-left font-semibold text-base">Items</span>
            <span class="col-span-2 font-semibold text-base">Quantity</span>
            <span class="col-span-2 font-semibold text-base border-r border-zinc-400/40 pr-2">Price</span>
            <span class="col-span-1.5 font-semibold text-base pl-2">Edit qty</span>
            <span class="col-span-1.5 font-semibold text-base">Remove</span>
            <span class="col-span-1 font-semibold text-base">Confirm</span>
          </div>

          <!-- Item Rows -->
          ${cartItems.map((item) => {
            const isEditing = editingId === item.id;

            return html`
              <!-- Desktop Row -->
              <div key=${item.id} class="hidden md:grid grid-cols-12 items-center text-center py-4 text-base border-b border-zinc-400/20">
                
                <!-- Items Title -->
                <div class="col-span-4 text-left font-medium text-white pr-3 leading-snug">
                  ${item.title}
                </div>

                <!-- Quantity -->
                <div class="col-span-2 font-medium text-lg">
                  ${isEditing ? html`
                    <input 
                      type="number" 
                      min="1"
                      value=${editQty}
                      onChange=${(e) => setEditQty(e.target.value)}
                      class="w-14 text-center bg-zinc-700 text-white border border-white/30 rounded py-0.5 focus:outline-none focus:border-red-500"
                    />
                  ` : html`
                    ${String(item.quantity).padStart(2, '0')}
                  `}
                </div>

                <!-- Price + Vertical Divider -->
                <div class="col-span-2 font-medium text-base border-r border-zinc-400/40 pr-2">
                  ${item.price.toFixed(2)}
                </div>

                <!-- Edit Qty Button -->
                <div class="col-span-1.5 flex justify-center pl-2">
                  <button 
                    onClick=${() => handleStartEdit(item)}
                    class="w-9 h-9 rounded-2xl bg-white text-black flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    title="Edit Quantity"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

                <!-- Remove Button -->
                <div class="col-span-1.5 flex justify-center">
                  <button 
                    onClick=${() => onRemoveItem(item.id)}
                    class="w-9 h-9 rounded-2xl bg-white text-black flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    title="Remove Item"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Confirm Button -->
                <div class="col-span-1 flex justify-center">
                  <button 
                    onClick=${() => handleConfirmEdit(item.id)}
                    class=${`w-9 h-9 rounded-2xl text-black flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform cursor-pointer ${
                      isEditing ? 'bg-green-400' : 'bg-white'
                    }`}
                    title="Confirm Quantity"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

              </div>

              <!-- Mobile Card Row -->
              <div key="mobile-${item.id}" class="md:hidden bg-[#3f3f46]/60 rounded-xl p-3 mb-2 border border-white/5 space-y-2">
                <div class="flex justify-between items-start gap-2">
                  <span class="font-bold text-white text-base leading-snug">${item.title}</span>
                  <span class="font-extrabold text-white text-base">Php ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                
                <div class="flex items-center justify-between pt-1 border-t border-white/10 text-xs sm:text-sm text-zinc-300">
                  <div>
                    Qty: 
                    ${isEditing ? html`
                      <input 
                        type="number" 
                        value=${editQty}
                        onChange=${(e) => setEditQty(e.target.value)}
                        class="w-12 ml-1 bg-zinc-700 text-white rounded text-center"
                      />
                    ` : html`
                      <strong class="text-white font-bold ml-1">${String(item.quantity).padStart(2, '0')}</strong>
                    `}
                    <span class="text-zinc-400 ml-1">(${item.price.toFixed(2)} ea)</span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <button 
                      onClick=${() => handleStartEdit(item)} 
                      class="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold active:scale-90"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick=${() => onRemoveItem(item.id)} 
                      class="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold active:scale-90"
                    >
                      ✕
                    </button>
                    <button 
                      onClick=${() => handleConfirmEdit(item.id)} 
                      class="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold active:scale-90"
                    >
                      ✓
                    </button>
                  </div>
                </div>
              </div>
            `;
          })}

          ${cartItems.length === 0 ? html`
            <div class="text-center text-zinc-400 py-12 text-base">Your cart is empty.</div>
          ` : null}
        </div>

        <!-- Bottom Action Bar -->
        <div class="w-full bg-[#1e1e24] rounded-2xl md:rounded-full p-3 sm:p-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3 border border-white/10 shadow-xl flex-shrink-0">
          
          <div class="flex items-center justify-between w-full md:w-auto md:justify-start gap-4 text-sm sm:text-base font-bold">
            <div>
              <span class="text-zinc-400 mr-1.5">Subtotal:</span>
              <span class="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span class="text-zinc-400 mr-1.5">Total:</span>
              <span class="text-white font-extrabold">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 w-full md:w-auto">
            <${FilledButton} 
              text="Checkout"
              onClick=${handleCheckout}
              bgColor="bg-red-600 hover:bg-red-700"
              textColor="text-white"
              width="flex-1 md:flex-none w-auto"
              height="h-10 sm:h-11"
              class="px-5 font-extrabold text-xs sm:text-sm rounded-full shadow-lg active:scale-95 transition-all text-center cursor-pointer"
            />
            <${FilledButton} 
              text="Cancel Items"
              onClick=${onClose}
              bgColor="bg-white hover:bg-zinc-200"
              textColor="text-black"
              width="flex-1 md:flex-none w-auto"
              height="h-10 sm:h-11"
              class="px-4 font-extrabold text-xs sm:text-sm rounded-full active:scale-95 transition-all text-center cursor-pointer"
            />
          </div>

        </div>

      </div>
    </div>
  `;
}