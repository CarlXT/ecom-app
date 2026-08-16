import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function ViewDetailsButton({ onClick, className = '' }) {
  return html`
    <button
      type="button"
      onClick=${onClick}
      className=${`inline-flex items-center justify-center px-6 py-2 rounded-2xl border border-white text-white bg-transparent text-sm font-normal tracking-wide transition-all cursor-pointer hover:bg-white/10 select-none ${className}`}
    >
      View Details
    </button>
  `;
}

export default ViewDetailsButton;