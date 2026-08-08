import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import htm from 'htm';

// Asset paths resolved relative to runtime location
const headDarkLogo = new URL('../assets/logos/heady-dark.svg', import.meta.url).href;
const headyFullLogo = new URL('../assets/logos/heady-dark-full.svg', import.meta.url).href;
const headyFooterLogo = new URL('../assets/logos/heady-dark-footer.svg', import.meta.url).href;

const html = htm.bind(React.createElement);

export function CustomerLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // Search & Mobile State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Heady Studio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Section State (Replaces location.hash for HashRouter compatibility)
  const [activeSection, setActiveSection] = useState(null);

  // Scroll Helper & Section Highlighter
  const scrollToSection = (id) => {
    setActiveSection(id);
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 130);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clear active section when navigating to standard routes
  const handleNavClick = () => {
    setActiveSection(null);
    setIsMobileMenuOpen(false);
  };

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
    const isActive = currentPath === target && !activeSection;
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
            <button 
              onClick=${() => scrollToSection('contact')} 
              class=${`text-sm font-medium transition-colors focus:outline-none ${
                activeSection === 'contact' ? 'text-red-500 font-semibold' : 'text-white hover:text-red-400'
              }`}
            >
              Contact
            </button>

            <button 
              onClick=${() => scrollToSection('follow')} 
              class=${`text-sm font-medium transition-colors focus:outline-none ${
                activeSection === 'follow' ? 'text-red-500 font-semibold' : 'text-white hover:text-red-400'
              }`}
            >
              Follow
            </button>
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
             <button 
                onClick=${() => { setIsMobileMenuOpen(false); scrollToSection('contact'); }} 
                class="text-left text-sm font-medium text-white hover:text-red-400 transition-colors focus:outline-none"
              >
                Contact
              </button>

              <button 
                onClick=${() => { setIsMobileMenuOpen(false); scrollToSection('follow'); }} 
                class="text-left text-sm font-medium text-white hover:text-red-400 transition-colors focus:outline-none"
              >
                Follow
              </button>
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

      <!-- ================= FOOTER ================= -->
      <footer class="bg-[#121214] text-zinc-300 pt-12 md:pt-16 pb-8 border-t border-zinc-800/60 overflow-hidden relative font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"> 
        <div class="w-full px-4 sm:px-8">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16 relative z-10 text-center sm:text-left">
            
            <div id="follow" class="flex flex-col items-center sm:items-start">
              <h3 class=${`font-semibold text-lg mb-3 md:mb-4 transition-colors ${
                activeSection === 'follow' ? 'text-red-500 font-bold' : 'text-white'
              }`}>
                Follow us on
              </h3>
              <ul class="space-y-2 text-sm font-medium text-zinc-400">
                <li><a href="#" class="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" class="hover:text-white transition-colors">TikTok</a></li>
              </ul>
            </div>

            <div id="contact" class="flex flex-col items-center sm:items-start">
              <h3 class=${`font-semibold text-lg mb-3 md:mb-4 transition-colors ${
                activeSection === 'contact' ? 'text-red-500 font-bold' : 'text-white'
              }`}>
                Contact
              </h3>
              <ul class="space-y-2 text-sm font-medium text-zinc-400">
                <li><a href="mailto:heady@support.com" class="hover:text-white transition-colors">heady@support.com</a></li>
                <li><span>(308) 551-236</span></li>
                <li><span>Colon St., Cebu City, 6000</span></li>
              </ul>
            </div>

            <div class="flex flex-col items-center sm:items-start">
              <h3 class="text-white font-semibold text-lg mb-3 md:mb-4">Help</h3>
              <ul class="space-y-2 text-sm font-medium text-zinc-400">
                <li><${Link} to="/faq" class="hover:text-white transition-colors">FAQ<//></li>
                <li><${Link} to="/privacy" class="hover:text-white transition-colors">Privacy Policy<//></li>
                <li><${Link} to="/terms" class="hover:text-white transition-colors">Terms & Conditions<//></li>
                <li><${Link} to="/cookies" class="hover:text-white transition-colors">Cookie Policy<//></li>
                <li><${Link} to="/about" class="hover:text-white transition-colors">About<//></li>
              </ul>
            </div>

            <div class="order-first md:order-none flex flex-col items-center sm:items-start justify-start mb-4 sm:mb-0">
              <img src=${headyFullLogo} alt="Heady Logo" class="h-10 md:h-12 w-auto mb-2 scale-200" />
            </div>
            
          </div>

          <div class="my-8 md:my-12 py-4 md:py-6 flex items-center justify-center opacity-90 select-none overflow-hidden">
            <img src=${headyFooterLogo} alt="Heady Watermark" class="h-20 sm:h-36 md:h-48 lg:h-80 w-auto object-contain scale-120" />
          </div>

          <div class="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3 text-center sm:text-left">
            <p>© 2026 Heady. All rights reserved.</p>
            <p class="font-medium text-zinc-300">Need premium audio gear ? Get Heady!</p>
          </div>

        </div>
      </footer>

    </div>
  `;
}