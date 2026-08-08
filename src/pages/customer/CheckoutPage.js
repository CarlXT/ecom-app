import React, { useState } from 'react';
import htm from 'htm';
import OrderConfirmationPage from './OrderConfirmationPage.js';

const html = htm.bind(React.createElement);

export default function CheckoutPage({ cartItems = [], onCompleteOrder }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [completedOrder, setCompletedOrder] = useState(null); // Stores placed order state
  const [formData, setFormData] = useState({
    name: 'Melisa McCarthy',
    email: 'melisamc@gmail.com',
    address: 'Sanciangko St., Kalubihan, Cebu City 6000',
    contact: '+63 1234567890',
    note: '',
    paymentMethod: 'Cash on Delivery (COD)'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create final order object
      const finalOrder = {
        orderId: `#HDY-${Math.floor(10000 + Math.random() * 90000)}-2026`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        ...formData,
        items: cartItems,
        total: subtotal
      };

      // Set local state to trigger OrderConfirmationPage view
      setCompletedOrder(finalOrder);

      // Trigger optional parent callback if provided
      if (onCompleteOrder) {
        onCompleteOrder(finalOrder);
      }
    }
  };

  // Render Order Confirmation screen when order is placed
  if (completedOrder) {
    return html`
      <${OrderConfirmationPage} 
        orderDetails=${completedOrder} 
        onContinue=${() => { window.location.hash = '/shop'; }} 
      />
    `;
  }

  return html`
    <div class="w-full">
      <!-- Step Wizard Indicator -->
      <div class="max-w-xl mx-auto flex items-center justify-between mb-12 text-sm font-semibold">
        <!-- Step 1 Button -->
        <button 
          type="button"
          onClick=${() => setStep(1)}
          class="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none ${step >= 1 ? 'text-green-500' : 'text-zinc-500'}"
        >
          ${step > 1 ? html`<span>✓</span>` : ''}
          <span class="${step === 1 ? 'underline underline-offset-4 font-bold' : ''}">Shipping Details</span>
        </button>

        <span class="text-zinc-600">›</span>

        <!-- Step 2 Button -->
        <button 
          type="button"
          onClick=${() => setStep(2)}
          class="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none ${step >= 2 ? 'text-green-500' : 'text-zinc-500'}"
        >
          ${step > 2 ? html`<span>✓</span>` : ''}
          <span class="${step === 2 ? 'underline underline-offset-4 font-bold' : ''}">Payment Method</span>
        </button>

        <span class="text-zinc-600">›</span>

        <!-- Step 3 Button -->
        <button 
          type="button"
          onClick=${() => setStep(3)}
          class="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none ${step === 3 ? 'text-red-500 font-bold' : 'text-zinc-500'}"
        >
          <span class="${step === 3 ? 'underline underline-offset-4' : ''}">Checkout Order</span>
        </button>
      </div>

      <!-- Main Form Grid -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left Column: Dynamic Forms based on step -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Step 1: Shipping Details -->
          ${step === 1 && html`
            <form onSubmit=${handleSubmit} class="space-y-4">
              <h2 class="text-2xl font-bold mb-1">Shipping Details</h2>
              <p class="text-zinc-400 text-xs mb-6">Please confirm the shipping details below.</p>

              <div>
                <label class="text-xs text-zinc-400 block mb-1">Customer Name</label>
                <input 
                  type="text" 
                  value=${formData.name} 
                  onChange=${(e) => setFormData({ ...formData, name: e.target.value })}
                  class="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
                  required 
                />
              </div>

              <div>
                <label class="text-xs text-zinc-400 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value=${formData.email} 
                  onChange=${(e) => setFormData({ ...formData, email: e.target.value })}
                  class="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
                  required 
                />
              </div>

              <div>
                <label class="text-xs text-zinc-400 block mb-1">Delivery Address</label>
                <input 
                  type="text" 
                  value=${formData.address} 
                  onChange=${(e) => setFormData({ ...formData, address: e.target.value })}
                  class="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
                  required 
                />
              </div>

              <div>
                <label class="text-xs text-zinc-400 block mb-1">Contact Number</label>
                <input 
                  type="text" 
                  value=${formData.contact} 
                  onChange=${(e) => setFormData({ ...formData, contact: e.target.value })}
                  class="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
                  required 
                />
              </div>

              <div>
                <label class="text-xs text-zinc-400 block mb-1">Leave a note</label>
                <textarea 
                  placeholder="Write your note here..." 
                  value=${formData.note}
                  onChange=${(e) => setFormData({ ...formData, note: e.target.value })}
                  class="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 h-28 text-white focus:outline-none focus:border-red-500 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="w-full py-4 bg-white text-black font-extrabold rounded-full hover:bg-zinc-200 transition-all cursor-pointer mt-4"
              >
                Confirm Shipping Details
              </button>
            </form>
          `}

          <!-- Step 2: Payment Method -->
          ${step === 2 && html`
            <div class="space-y-6">
              <h2 class="text-2xl font-bold mb-1">Payment Method</h2>
              <p class="text-zinc-400 text-xs mb-6">Select your preferred payment option.</p>

              <div class="space-y-3">
                ${['Cash on Delivery (COD)', 'GCash / E-Wallet', 'Credit / Debit Card'].map((method) => html`
                  <label key=${method} class="flex items-center justify-between p-4 bg-[#1c1c20] border ${formData.paymentMethod === method ? 'border-red-500' : 'border-zinc-700/60'} rounded-xl cursor-pointer hover:border-zinc-500">
                    <span class="font-semibold text-sm">${method}</span>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value=${method} 
                      checked=${formData.paymentMethod === method}
                      onChange=${(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      class="accent-red-600 w-4 h-4"
                    />
                  </label>
                `)}
              </div>

              <button 
                onClick=${() => setStep(3)} 
                class="w-full py-4 bg-white text-black font-extrabold rounded-full hover:bg-zinc-200 transition-all cursor-pointer mt-4"
              >
                Confirm Payment Method
              </button>
            </div>
          `}

          <!-- Step 3: Checkout Order -->
          ${step === 3 && html`
            <div class="space-y-6">
              <h2 class="text-2xl font-bold">Checkout Order</h2>
              <p class="text-zinc-400 text-xs">Please finalize the details below before completing your order.</p>

              <div class="flex justify-between items-baseline border-b border-zinc-800 pb-3">
                <span class="text-xl font-bold">Customer:</span>
                <span class="text-2xl font-black">${formData.name}</span>
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between"><span class="text-zinc-400">Email Address:</span><span>${formData.email}</span></div>
                <div class="flex justify-between"><span class="text-zinc-400">Delivery Address:</span><span class="text-right max-w-xs">${formData.address}</span></div>
                <div class="flex justify-between"><span class="text-zinc-400">Contact Number:</span><span>${formData.contact}</span></div>
                <div class="flex justify-between"><span class="text-zinc-400">Note:</span><span>${formData.note || 'None'}</span></div>
                <div class="flex justify-between"><span class="text-zinc-400">Payment Method:</span><span>${formData.paymentMethod}</span></div>
              </div>

              <button 
                type="button"
                onClick=${handleSubmit} 
                class="w-full py-4 bg-white text-black font-extrabold rounded-full hover:bg-zinc-200 transition-all cursor-pointer active:scale-98"
              >
                Checkout Order
              </button>
            </div>
          `}
        </div>

        <!-- Right Column: Order Summary Card -->
        <div class="lg:col-span-5 bg-[#171719] border border-zinc-800 rounded-3xl p-6 space-y-6">
          <h3 class="text-xl font-bold">Your Orders</h3>

          <!-- Items Preview list -->
          <div class="space-y-3">
            ${cartItems.map((item) => html`
              <div key=${item.id} class="flex items-center gap-4 bg-zinc-800/40 p-3 rounded-2xl">
                <img src=${item.image} class="w-16 h-16 rounded-xl object-cover" />
                <div class="flex-grow text-xs">
                  <h4 class="font-bold text-white text-sm">${item.title}</h4>
                  <p class="text-zinc-400">Headphone</p>
                </div>
                <div class="text-right text-xs">
                  <span class="font-bold block">Php ${item.price.toFixed(2)}</span>
                  <span class="text-zinc-400">Qty: ${item.quantity}</span>
                </div>
              </div>
            `)}
          </div>

          <div class="border-t border-zinc-800 pt-4 space-y-2 text-sm">
            <div class="flex justify-between font-bold text-lg"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div class="flex justify-between text-zinc-400"><span>No. of Items:</span><span>${cartItems.length}</span></div>
            <div class="flex justify-between text-zinc-400"><span>Shipping Fee:</span><span>Php 0.00</span></div>
            <div class="flex justify-between font-extrabold text-xl border-t border-zinc-800 pt-3"><span>Total:</span><span>Php ${subtotal.toFixed(2)}</span></div>
          </div>
        </div>

      </div>
    </div>
  `;
}