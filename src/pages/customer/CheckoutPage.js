import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Add 'export default' before function
export default function CheckoutPage() {
  return html`
    <div class="p-8">
      <h1 class="text-3xl font-bold">Welcome to Checkout page</h1>
    </div>
  `;
}