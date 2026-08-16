import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Default SVG Microphone Icon matching the design
const DefaultMicIcon = html`
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-16 h-16 text-zinc-200"
  >
    <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v6.75a3.75 3.75 0 1 1-7.5 0V4.5Z" />
    <path d="M6 10.5a.75.75 0 0 1 .75.75 5.25 5.25 0 1 0 10.5 0 .75.75 0 0 1 1.5 0 6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709A.75.75 0 0 1 6 10.5Z" />
  </svg>
`;

export default function CategoryButton({ 
  label = "Microphones", 
  icon = DefaultMicIcon, 
  onClick, 
  className = "" 
}) {
  const fontStyle = {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  };

  return html`
    <!-- Load SF Pro font stylesheet -->
    <link 
      rel="stylesheet" 
      href="https://fonts.cdnfonts.com/css/sf-pro-display-cdn" 
    />

    <button
      onClick=${onClick}
      style=${fontStyle}
      className=${`
        group relative flex flex-col items-center justify-center gap-4
        w-[271px] h-[241px] rounded-[32px] overflow-hidden
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 via-red-600 to-red-900
        text-white font-medium shadow-xl shadow-red-950/30
        border border-red-400/20 active:scale-95 transition-all duration-200 cursor-pointer
        hover:brightness-110 ${className}
      `}
    >
      <!-- Subtle top inner glow highlight -->
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/20 via-transparent to-black/30 pointer-events-none"></div>

      <!-- Dynamic Icon Container -->
      <div className="relative z-10 transition-transform duration-200 group-hover:scale-110">
        ${icon}
      </div>

      <!-- Dynamic Label Text -->
      <span className="relative z-10 text-3xl font-normal tracking-tight text-white drop-shadow-sm">
        ${label}
      </span>
    </button>
  `;
}
