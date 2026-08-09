import React, { useState, useEffect, useRef } from 'react';
import htm from 'htm';

import DropdownCategoryMenu from '../../menus/DropDownCategoryMenu.js';

const html = htm.bind(React.createElement);

export function CategoryCard({
  categoryName = 'Headphones',
  overallStocks = 3500,
  productCount = 10,
  products = [],
  onDropdownClick,
  onEditProduct,
  onDeleteProduct,
  onEditCategory,
  onDeleteCategory,
  onFilterChange,
  className = ''
}) {
  // Local state to handle dropdown menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Reference to the dropdown container to detect clicks outside
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = (e) => {
    setIsDropdownOpen((prev) => !prev);
    if (onDropdownClick) {
      onDropdownClick(e);
    }
  };

  // Mock data fallback displaying up to 3 cards
  const defaultProducts = [
    { id: 1, name: 'HEADY STUDIO MONITOR 50', category: 'Headphone', stocks: 120, price: '900.00', image: '/assets/headphone.jpg' },
    { id: 2, name: 'HEADY STUDIO MONITOR 50', category: 'Headphone', stocks: 120, price: '900.00', image: '/assets/headphone.jpg' },
    { id: 3, name: 'HEADY STUDIO MONITOR 50', category: 'Headphone', stocks: 120, price: '900.00', image: '/assets/headphone.jpg' }
  ];

  // Restrict display to a maximum of 3 product preview cards
  const displayProducts = (products.length > 0 ? products : defaultProducts).slice(0, 3);

  return html`
    <div
      className=${`relative w-full max-w-[1382px] bg-[#141416] border border-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 lg:p-10 flex flex-col justify-between text-white select-none gap-8 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <!-- Header Section -->
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-light text-white tracking-tight">
          Category: <span className="font-normal">${categoryName}</span>
        </h2>

        <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-4 w-full lg:w-auto flex-wrap">
          <!-- Outlined Button: Overall Stocks -->
          <div className="px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full border border-white text-xs sm:text-lg lg:text-[24px] font-normal text-white bg-transparent flex items-center justify-center whitespace-nowrap">
            Overall Stocks: ${overallStocks}
          </div>

          <!-- Outlined Button: No. of products -->
          <div className="px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full border border-white text-xs sm:text-lg lg:text-[24px] font-normal text-white bg-transparent flex items-center justify-center whitespace-nowrap">
            No. of products : ${productCount}
          </div>

          <!-- Relative Anchor & Ref for Dropdown Menu -->
          <div ref=${dropdownRef} className="relative shrink-0 ml-auto lg:ml-0">
            <!-- Dropdown Circular Button -->
            <button
              type="button"
              onClick=${toggleDropdown}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e3e3e5] hover:bg-white text-[#141416] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle options"
            >
              <svg
                className=${`w-5 h-5 sm:w-6 sm:h-6 stroke-[3] transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <!-- Compact Floating Category Dropdown Menu -->
            ${isDropdownOpen && html`
              <div className="absolute right-0 top-12 sm:top-14 z-30 w-[220px] sm:w-[250px]">
                <${DropdownCategoryMenu}
                  categoryName=${categoryName}
                  onClose=${() => setIsDropdownOpen(false)}
                  onEditCategory=${onEditCategory}
                  onDeleteCategory=${onDeleteCategory}
                  onFilterChange=${onFilterChange}
                />
              </div>
            `}
          </div>
        </div>
      </header>

      <!-- Responsive Product Preview Grid -->
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start w-full">
        ${displayProducts.map((product) => html`
          <div key=${product.id} className="flex flex-col gap-3 sm:gap-4 w-full">
            <!-- Product Thumbnail Image -->
            <div className="w-full h-[220px] sm:h-[280px] lg:h-[320px] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-zinc-800 border border-white/10">
              <img
                src=${product.image}
                alt=${product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <!-- Category & Stocks Info -->
            <div className="flex items-center justify-between text-zinc-300 text-sm sm:text-lg font-normal pt-1">
              <span>${product.category}</span>
              <div className="flex items-center gap-2">
                <span>${product.stocks} stocks</span>
                <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#22c55e] inline-block"></span>
              </div>
            </div>

            <!-- Product Title -->
            <h3 className="text-lg sm:text-2xl font-bold text-white uppercase tracking-wide leading-tight line-clamp-2 min-h-[48px] sm:min-h-[60px]">
              ${product.name}
            </h3>

            <!-- Price & Actions -->
            <div className="flex items-center justify-between pt-1">
              <span className="text-lg sm:text-2xl font-medium text-white">
                Php ${product.price}
              </span>

              <div className="flex items-center gap-3 sm:gap-4">
                <!-- Edit Action -->
                <button
                  type="button"
                  onClick=${() => onEditProduct && onEditProduct(product)}
                  className="text-white hover:text-zinc-300 transition-colors p-1 cursor-pointer"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>

                <!-- Delete Action -->
                <button
                  type="button"
                  onClick=${() => onDeleteProduct && onDeleteProduct(product)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e3e3e5] hover:bg-white text-[#141416] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <div className="w-3.5 sm:w-4 h-[2.5px] sm:h-[3px] bg-[#141416] rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        `)}
      </div>
    </div>
  `;
}

export default CategoryCard;