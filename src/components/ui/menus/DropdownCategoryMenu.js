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
  // SVG Icons
  const seeMoreIcon = html`
    <svg className="w-5 h-5 text-white stroke-[2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `;

  const editIcon = html`
    <svg className="w-5 h-5 text-white stroke-[2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
  `;

  const deleteIcon = html`
    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#e3e3e5] flex items-center justify-center shrink-0">
      <div className="w-3 h-[2px] bg-[#3b3642] rounded-full"></div>
    </div>
  `;

  const activeIcon = html`
    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#e3e3e5] flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-[#3b3642] stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>
  `;

  const inactiveIcon = html`
    <svg className="w-5 h-5 text-white stroke-[2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;

  const outOfStockIcon = html`
    <div className="w-3.5 h-5 border-[2px] border-white/80 rounded-[3px] shrink-0"></div>
  `;

  return html`
    <div
      className=${`w-80 sm:w-96 max-w-[calc(100vw-3rem)] bg-[#423c4a]/95 backdrop-blur-md border border-white/20 rounded-3xl p-5 sm:p-6 flex flex-col gap-4 text-white shadow-2xl select-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] -translate-x-16 sm:-translate-x-28 mr-4 sm:mr-8 ${className}`}
    >
      <!-- Group 1: Category Actions -->
      <div className="flex flex-col gap-2.5">
        <h3 className="text-sm sm:text-base font-normal text-zinc-300 tracking-tight truncate">
          Category: <span className="text-white font-semibold">${categoryName}</span>
        </h3>
        
        <div className="flex flex-col gap-2 [&_button]:py-2.5 [&_button]:px-4 [&_button]:text-sm sm:[&_button]:text-base [&_button]:rounded-2xl [&_button]:min-h-0 [&_button]:h-auto [&_button]:border-white/20">
          <${DropDownMenuButton}
            label="See more products"
            icon=${seeMoreIcon}
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
      <div className="w-full h-[1px] bg-white/15 my-0.5"></div>

      <!-- Group 2: Filter Actions -->
      <div className="flex flex-col gap-2.5">
        <h3 className="text-sm sm:text-base font-normal text-zinc-300 tracking-tight">
          Filter by:
        </h3>

        <div className="flex flex-col gap-2 [&_button]:py-2.5 [&_button]:px-4 [&_button]:text-sm sm:[&_button]:text-base [&_button]:rounded-2xl [&_button]:min-h-0 [&_button]:h-auto [&_button]:border-white/20">
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