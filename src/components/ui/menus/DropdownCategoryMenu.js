import React from 'react';
import htm from 'htm';
import DropDownMenuButton from '../../ui/buttons/DropDownMenuButton.js';

const html = htm.bind(React.createElement);

export function DropdownCategoryMenu({
  categoryName = 'Headphones',
  onSeeMoreProducts,
  onEditCategory,
  onDeleteCategory,
  onSelectActiveProducts,
  onSelectInactiveProducts,
  onSelectOutOfStockProducts,
  className = ''
}) {
  // Micro SVG Icons (12x12px)
  const seeIcon = html`
    <svg className="w-3 h-3 text-white stroke-[2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `;

  const editIcon = html`
    <svg className="w-3 h-3 text-white stroke-[2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
  `;

  const deleteIcon = html`
    <div className="w-3 h-3 rounded-full bg-[#e3e3e5] flex items-center justify-center shrink-0">
      <div className="w-1.5 h-[1px] bg-[#3b3642] rounded-full"></div>
    </div>
  `;

  const activeIcon = html`
    <div className="w-3 h-3 rounded-full bg-[#e3e3e5] flex items-center justify-center shrink-0">
      <svg className="w-1.5 h-1.5 text-[#3b3642] stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>
  `;

  const inactiveIcon = html`
    <svg className="w-3 h-3 text-white stroke-[2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;

  const outOfStockIcon = html`
    <div className="w-1.5 h-2.5 border-[1px] border-white/80 rounded-[1px] shrink-0"></div>
  `;

  return html`
    <div
      className=${`w-40 sm:w-44 bg-[#332e3a]/95 backdrop-blur-md border border-white/15 rounded-lg p-1.5 flex flex-col gap-1 text-white shadow-xl select-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <!-- Group 1: Category Actions -->
      <div className="flex flex-col gap-0.5">
        <div className="px-1.5 py-0.5 text-[9px] font-semibold text-zinc-400 tracking-wider uppercase truncate">
          ${categoryName}
        </div>
        
        <!-- Overrides: Tight 24px item height, micro font, no borders/shadows -->
        <div className="flex flex-col gap-0.5 [&_button]:py-0.5 [&_button]:px-1.5 [&_button]:text-[10px] [&_button]:font-normal [&_button]:rounded [&_button]:min-h-0 [&_button]:h-6 [&_button]:border-none [&_button]:bg-transparent [&_button]:hover:bg-white/10 [&_button]:w-full [&_button]:justify-start [&_button]:gap-1.5 [&_button]:shadow-none">
          <${DropDownMenuButton}
            label="See more products"
            icon=${seeIcon}
            onClick=${onSeeMoreProducts}
          />
          <${DropDownMenuButton}
            label="Edit category"
            icon=${editIcon}
            onClick=${onEditCategory}
          />
          <${DropDownMenuButton}
            label="Delete category"
            icon=${deleteIcon}
            onClick=${onDeleteCategory}
          />
        </div>
      </div>

      <!-- Divider -->
      <div className="w-full h-[1px] bg-white/10 my-0.5"></div>

      <!-- Group 2: Filter Actions -->
      <div className="flex flex-col gap-0.5">
        <div className="px-1.5 py-0.5 text-[9px] font-semibold text-zinc-400 tracking-wider uppercase">
          Filter by
        </div>

        <div className="flex flex-col gap-0.5 [&_button]:py-0.5 [&_button]:px-1.5 [&_button]:text-[10px] [&_button]:font-normal [&_button]:rounded [&_button]:min-h-0 [&_button]:h-6 [&_button]:border-none [&_button]:bg-transparent [&_button]:hover:bg-white/10 [&_button]:w-full [&_button]:justify-start [&_button]:gap-1.5 [&_button]:shadow-none">
          <${DropDownMenuButton}
            label="Active products"
            icon=${activeIcon}
            onClick=${onSelectActiveProducts}
          />
          <${DropDownMenuButton}
            label="Inactive products"
            icon=${inactiveIcon}
            onClick=${onSelectInactiveProducts}
          />
          <${DropDownMenuButton}
            label="Out of stock products"
            icon=${outOfStockIcon}
            onClick=${onSelectOutOfStockProducts}
          />
        </div>
      </div>
    </div>
  `;
}

export default DropdownCategoryMenu;