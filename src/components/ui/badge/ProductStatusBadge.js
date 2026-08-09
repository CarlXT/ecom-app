import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export default function ProductStatusBadge({ status = 'Active' }) {
  const statusKey = status.toLowerCase().trim();

  let badgeStyles = 'text-zinc-400 border-zinc-600/60 bg-zinc-800/30'; // Default / Inactive (Grey)

  if (statusKey === 'active') {
    badgeStyles = 'text-emerald-400 border-emerald-500/60 bg-emerald-950/20'; // Active (Green)
  } else if (statusKey === 'out of stock' || statusKey === 'outofstock') {
    badgeStyles = 'text-red-400 border-red-500/60 bg-red-950/20'; // Out of Stock (Red)
  }

  return html`
    <span className=${`inline-flex items-center justify-center px-4 py-1 text-xs sm:text-sm font-medium border rounded-full tracking-wide transition-colors ${badgeStyles}`}>
      ${status}
    </span>
  `;
}