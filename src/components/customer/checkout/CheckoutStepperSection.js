import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function CheckoutStepperSection({ step = 1, onStepChange }) {
  return html`
    <div className="max-w-xl mx-auto flex items-center justify-between mb-12 text-sm font-semibold">
      <!-- Step 1 Button -->
      <button 
        type="button"
        onClick=${() => onStepChange && onStepChange(1)}
        className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none ${step >= 1 ? 'text-green-500' : 'text-zinc-500'}"
      >
        ${step > 1 ? html`<span>✓</span>` : ''}
        <span className="${step === 1 ? 'underline underline-offset-4 font-bold' : ''}">Shipping Details</span>
      </button>

      <span className="text-zinc-600">›</span>

      <!-- Step 2 Button -->
      <button 
        type="button"
        onClick=${() => onStepChange && onStepChange(2)}
        className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none ${step >= 2 ? 'text-green-500' : 'text-zinc-500'}"
      >
        ${step > 2 ? html`<span>✓</span>` : ''}
        <span className="${step === 2 ? 'underline underline-offset-4 font-bold' : ''}">Payment Method</span>
      </button>

      <span className="text-zinc-600">›</span>

      <!-- Step 3 Button -->
      <button 
        type="button"
        onClick=${() => onStepChange && onStepChange(3)}
        className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none ${step === 3 ? 'text-red-500 font-bold' : 'text-zinc-500'}"
      >
        <span className="${step === 3 ? 'underline underline-offset-4' : ''}">Checkout Order</span>
      </button>
    </div>
  `;
}

export default CheckoutStepperSection;
