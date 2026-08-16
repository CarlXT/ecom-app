import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function DashboardLayout({
  title = "Overview",
  className = ""
}) {
  return html`
    <div
      className=${`w-full flex flex-col gap-4 sm:gap-6 text-white select-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <!-- Main Overview Title: Scaled down for mobile -->
      <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-none">
        ${title}
      </h1>
    </div>
  `;
}

export default DashboardLayout;