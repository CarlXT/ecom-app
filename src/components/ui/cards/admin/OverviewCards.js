import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function OverviewCard({
  label = 'Pending Orders',
  value = '09',
  className = ''
}) {
  // Ensures single digits are padded with a leading zero if a number is passed
  const formattedValue = typeof value === 'number' 
    ? String(value).padStart(2, '0') 
    : value;

  return html`
    <div
      className=${`border border-white rounded-[10px] p-8 flex flex-col justify-between text-white select-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <h3 className="text-[36px] font-medium text-white tracking-tight leading-tight">
        ${label}
      </h3>
      
      <div className="text-[96px] font-bold text-white tracking-tight leading-none pt-4">
        ${formattedValue}
      </div>
    </div>
  `;
}

export default OverviewCard;
