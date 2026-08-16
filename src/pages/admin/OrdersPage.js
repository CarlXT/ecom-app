import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Add 'export default' before function
export default function OrdersPage() {
  return html`
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to Orders page</h1>
    </div>
  `;
}
