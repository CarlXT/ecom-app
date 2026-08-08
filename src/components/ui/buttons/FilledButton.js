import React from 'react';
import { Link } from 'react-router-dom';
import htm from 'htm';

const html = htm.bind(React.createElement);

export default function FilledButton({
  text = 'Buy Now',
  onClick,
  to,
  type = 'button',
  bgColor = 'bg-gradient-to-b from-red-500 via-red-600 to-red-800', // Default red pill gradient
  textColor = 'text-white',
  className = '',
  width = 'w-[196px]',
  height = 'h-[68px]'
}) {
  const content = html`
    <button
      type=${to ? undefined : type}
      onClick=${onClick}
      class=${`
        relative inline-flex items-center justify-center 
        ${width} ${height} 
        rounded-full 
        ${bgColor} ${textColor}
        font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif] 
        text-xl font-bold tracking-tight 
        shadow-lg shadow-red-950/40 
        hover:opacity-95 hover:scale-[1.02] 
        active:scale-95 
        transition-all duration-200 ease-out 
        cursor-pointer select-none overflow-hidden
        border border-white/10
        ${className}
      `}
    >
      <!-- Top subtle highlight glow -->
      <span class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none rounded-full"></span>

      <!-- Button Text -->
      <span class="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
        ${text}
      </span>
    </button>
  `;

  if (to) {
    return html`
      <${Link} to=${to} class="inline-block no-underline">
        ${content}
      <//>
    `;
  }

  return content;
}