import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import htm from 'htm';

// Asset paths resolved relative to runtime location
const headDarkLogo = new URL('../assets/logos/heady-dark.svg', import.meta.url).href;
const headyFullLogo = new URL('../assets/logos/heady-dark-full.svg', import.meta.url).href;
const headyFooterLogo = new URL('../assets/logos/heady-dark-footer.svg', import.meta.url).href;

const html = htm.bind(React.createElement);

export function AdminLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Search Modal & Input State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Heady Studio');

  // Mobile Menu Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample Search Suggestions
  const sampleProducts = [
    'Heady Studio',
    'Heady Studio Pro',
    'Heady Studio Wireless',
    'Heady Studio Noise Cancelling',
    'Heady Studio Special Edition'
  ];

  const filteredSuggestions = sampleProducts.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getNavLinkClass = (target) => {
    const isActive = target.startsWith('#')
      ? location.hash === target
      : (currentPath === target && !location.hash);
    return `text-sm font-medium transition-colors ${
      isActive ? 'text-red-500 font-semibold' : 'text-white hover:text-red-400'
    }`;
  };

  return html`
    <div class="min-h-screen bg-[#121214] text-white flex flex-col justify-between font-sans relative scroll-smooth">
      
      <!-- ================= HEADER / NAVBAR ================= -->
      <header class="sticky top-0 z-40 w-full bg-[#121214]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div class="w-full px-4 sm:px-8 h-20 flex items-center justify-between">          
          
          <!-- Brand Logo (Navbar) -->
          <${Link} to="/" class="hover:opacity-90 transition-opacity">
            <img src=${headDarkLogo} alt="Heady Logo" class="h-12 w-auto" />
          <//> 

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-8 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
            <${Link} to="/" class=${getNavLinkClass('/')}>Home<//>
            <${Link} to="/shop" class=${getNavLinkClass('/shop')}>Shop<//>
            <a href="#contact" class=${getNavLinkClass('#contact')}>Contact</a>
            <a href="#follow" class=${getNavLinkClass('#follow')}>Follow</a>
            <${Link} to="/help" class=${getNavLinkClass('/help')}>Help<//>
          </nav>

          <!-- Desktop Action Icons -->
          <div class="hidden md:flex items-center gap-6 text-zinc-300">
            <!-- Desktop Search Button -->
            <button 
              onClick=${() => setIsSearchOpen(true)} 
              class="hover:text-white transition-colors p-1 focus:outline-none" 
              title="Search"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>


            <!-- Cart -->
            <${Link} to="/cart" class="hover:text-white transition-colors relative" title="Shopping Cart">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            <//>
          </div>

          <!-- Mobile Hamburger Button -->
          <button 
            onClick=${() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            class="md:hidden text-zinc-300 hover:text-white p-2 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${isMobileMenuOpen ? html`
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              ` : html`
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              `}
            </svg>
          </button>

        </div>

        <!-- Mobile Collapsible Menu Drawer -->
        ${isMobileMenuOpen && html`
          <div class="md:hidden bg-[#121214] border-b border-zinc-800 px-6 py-6 flex flex-col gap-6 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
            
            <!-- Quick Action Icons inside Mobile Drawer -->
            <div class="flex items-center justify-around py-3 border-b border-zinc-800/80 text-zinc-300">
              <!-- Mobile Drawer Search Icon -->
              <button 
                type="button"
                onClick=${() => { 
                  setIsMobileMenuOpen(false); 
                  setIsSearchOpen(true); 
                }} 
                class="flex flex-col items-center gap-1 text-xs hover:text-white transition-colors focus:outline-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>


              <${Link} 
                to="/cart" 
                onClick=${() => setIsMobileMenuOpen(false)}
                class="flex flex-col items-center gap-1 text-xs hover:text-white transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Cart
              <//>
            </div>

            <!-- Mobile Navigation Links -->
            <nav class="flex flex-col gap-4 text-base">
              <${Link} to="/" onClick=${() => setIsMobileMenuOpen(false)} class=${getNavLinkClass('/')}>Home<//>
              <${Link} to="/shop" onClick=${() => setIsMobileMenuOpen(false)} class=${getNavLinkClass('/shop')}>Shop<//>
              <a href="#contact" onClick=${() => setIsMobileMenuOpen(false)} class=${getNavLinkClass('#contact')}>Contact</a>
              <a href="#follow" onClick=${() => setIsMobileMenuOpen(false)} class=${getNavLinkClass('#follow')}>Follow</a>
              <${Link} to="/help" onClick=${() => setIsMobileMenuOpen(false)} class=${getNavLinkClass('/help')}>Help<//>
            </nav>

          </div>
        `}
      </header>

      <!-- ================= SEARCH OVERLAY MODAL ================= -->
      ${isSearchOpen && html`
        <div 
          class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col items-center pt-10 px-4 transition-all"
          onClick=${() => setIsSearchOpen(false)}
        >
          <!-- Search Container Box -->
          <div class="w-full max-w-2xl flex flex-col gap-3" onClick=${(e) => e.stopPropagation()}>
            
            <!-- Rounded Search Input Bar -->
            <div class="bg-[#433e48] text-white rounded-full px-5 py-3 flex items-center gap-4 shadow-2xl border border-white/10">
              <!-- Close Button (X) -->
              <button 
                type="button"
                onClick=${() => setIsSearchOpen(false)}
                class="text-zinc-300 hover:text-white transition-colors p-1 focus:outline-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Search Text Input -->
              <input 
                type="text" 
                value=${searchQuery} 
                onInput=${(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                autoFocus
                class="bg-transparent text-white text-lg w-full focus:outline-none placeholder-zinc-400 font-normal tracking-wide"
              />

              <!-- Search Circle Icon -->
              <button 
                type="button" 
                class="bg-white text-[#433e48] p-2.5 rounded-full hover:bg-zinc-200 transition-colors flex-shrink-0"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <!-- Suggestions Dropdown Box -->
            ${searchQuery.trim().length > 0 && html`
              <div class="bg-[#433e48] text-white rounded-[2rem] p-6 shadow-2xl border border-white/10 flex flex-col gap-3">
                ${filteredSuggestions.length > 0 ? filteredSuggestions.map(item => html`
                  <div 
                    key=${item}
                    onClick=${() => {
                      setSearchQuery(item);
                      setIsSearchOpen(false);
                    }}
                    class="text-zinc-100 hover:text-white text-lg font-medium cursor-pointer transition-colors py-1 px-3 rounded-xl hover:bg-white/10"
                  >
                    ${item}
                  </div>
                `) : html`
                  <div class="text-zinc-400 text-base py-2 px-3">No matching products found</div>
                `}
              </div>
            `}

          </div>
        </div>
      `}

      <!-- ================= MAIN CONTENT INJECTION ================= -->
      <main class="flex-grow">
        ${children}
      </main>

    </div>
  `;
}