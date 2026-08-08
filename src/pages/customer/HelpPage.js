import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Add 'export default' before function
export default function HelpPage() {
  return html`
    <div class="p-8">
      <h1 class="text-3xl font-bold">Welcome to Help page</h1>
    </div>
  `;
}