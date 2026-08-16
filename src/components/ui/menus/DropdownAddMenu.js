import React from 'react';
import htm from 'htm';
import DropDownMenuButton from '../../ui/buttons/DropDownMenuButton.js';

const html = htm.bind(React.createElement);

export function DropdownAddMenu({
  onCreateCategory,
  onNewProduct,
  className = ''
}) {
  // Plus icon for "Create category"
  const plusIcon = html`
    <svg className="w-8 h-8 text-white stroke-[1.5] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  `;

  // Sparkle/Burst icon for "New product"
  const newProductIcon = html`
    <svg className="w-8 h-8 text-white stroke-[3] shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" viewBox="0 0 24 24">
      <path d="M6 19h5M10 13v5M5 12l4 4" />
    </svg>
  `;

  return html`
    <div
      className=${`w-[420px] bg-[#3c3644] border border-white/10 rounded-[32px] p-6 flex flex-col gap-3 text-white shadow-2xl select-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <${DropDownMenuButton}
        label="Create category"
        icon=${plusIcon}
        onClick=${onCreateCategory}
      />
      
      <${DropDownMenuButton}
        label="New product"
        icon=${newProductIcon}
        onClick=${onNewProduct}
      />
    </div>
  `;
}

export default DropdownAddMenu;
