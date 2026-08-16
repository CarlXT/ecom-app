import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function DropDownMenuButton({
  label = "Delete category",
  icon,
  onClick,
  className = ""
}) {
  // Default circular minus icon matching the screenshot
  const defaultIcon = html`
    <div className="w-8 h-8 rounded-full bg-[#e3e3e5] flex items-center justify-center shrink-0">
      <div className="w-4 h-[3px] bg-[#3b3642] rounded-full"></div>
    </div>
  `;

  return html`
    <button
      type="button"
      onClick=${onClick}
      className=${`w-full px-5 py-3.5 bg-[#3b3642] hover:bg-[#484252] border border-white rounded-[10px] text-white text-[32px] font-normal flex items-center gap-4 transition-colors cursor-pointer select-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      ${icon !== undefined ? icon : defaultIcon}
      <span>${label}</span>
    </button>
  `;
}

export default DropDownMenuButton;
