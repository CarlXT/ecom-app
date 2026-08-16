import React from 'react';
import htm from 'htm';
import OutlinedButton from '../../components/ui/buttons/OutLinedButton.js';

const html = htm.bind(React.createElement);

export function ProductLayout({
  title = 'Product Management',
  categories = ['Headphones', 'Microphones', 'Filters', 'Mounts'],
  activeCategory,
  onSelectCategory,
  onAddClick,
  searchValue = '',
  onSearchChange,
  children
}) {
  return html`
    <div className="w-full min-h-screen bg-[#0a0a0c] text-white flex flex-col font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
      
      <!-- STICKY HEADER CONTAINER -->
      <header className="sticky top-0 z-25 bg-[#0a0a0c]/95 backdrop-blur-md px-6 lg:px-12 pt-8 pb-6 border-b border-white/10 flex flex-col gap-6">
        
        <!-- Top Row: Title + Search Bar + Add Button -->
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-tight">
            ${title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-[320px] lg:w-[400px]">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value=${searchValue}
                onChange=${(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full bg-[#242429] text-white placeholder-zinc-400 pl-11 pr-4 py-2.5 sm:py-3 rounded-full text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <!-- Add Category Button -->
            <button 
              type="button"
              onClick=${onAddClick}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-transparent hover:bg-white/10 border border-white/30 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
              aria-label="Add Category"
            >
              <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>

        <!-- DYNAMIC CATEGORY PILL BAR -->
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <span className="text-xl sm:text-2xl lg:text-[32px] font-light tracking-tight shrink-0">
            Lists of categories:
          </span>

          <!-- Horizontal Scrollable Dynamic Pills -->
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            ${categories.map((category) => {
              const isSelected = activeCategory === category;
              return html`
                <${OutlinedButton}
                  key=${category}
                  onClick=${() => onSelectCategory && onSelectCategory(category)}
                  isActive=${isSelected}
                  isSelected=${isSelected}
                  className=${isSelected ? 'border-red-500 text-red-400 bg-red-500/10' : ''}
                >
                  ${category}
                <//>
              `;
            })}
          </div>
        </div>
      </header>

      <!-- DYNAMIC SCROLLABLE BODY CONTENT -->
      <main className="flex-1 px-6 lg:px-12 py-8 flex flex-col gap-8">
        ${children}
      </main>

    </div>
  `;
}

export default ProductLayout;