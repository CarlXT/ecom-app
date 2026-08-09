import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function PaymentMethodSection({ formData, onChange, onNext }) {
  const paymentMethods = [
    'Cash on Delivery (COD)',
    'GCash / E-Wallet',
    'Credit / Debit Card'
  ];

  return html`
    <div class="space-y-6">
      <h2 class="text-2xl font-bold mb-1">Payment Method</h2>
      <p class="text-zinc-400 text-xs mb-6">Select your preferred payment option.</p>

      <div class="space-y-3">
        ${paymentMethods.map((method) => html`
          <label key=${method} class="flex items-center justify-between p-4 bg-[#1c1c20] border ${formData.paymentMethod === method ? 'border-red-500' : 'border-zinc-700/60'} rounded-xl cursor-pointer hover:border-zinc-500">
            <span class="font-semibold text-sm">${method}</span>
            <input 
              type="radio" 
              name="paymentMethod" 
              value=${method} 
              checked=${formData.paymentMethod === method}
              onChange=${(e) => onChange && onChange({ ...formData, paymentMethod: e.target.value })}
              class="accent-red-600 w-4 h-4"
            />
          </label>
        `)}
      </div>

      <button 
        type="button"
        onClick=${onNext} 
        class="w-full py-4 bg-white text-black font-extrabold rounded-full hover:bg-zinc-200 transition-all cursor-pointer mt-4"
      >
        Confirm Payment Method
      </button>
    </div>
  `;
}

export default PaymentMethodSection;    