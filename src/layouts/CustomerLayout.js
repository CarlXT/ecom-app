import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import htm from 'htm';

// Asset paths resolved relative to runtime location
const headDarkLogo = new URL('../assets/logos/heady-dark.svg', import.meta.url).href;
const headyFullLogo = new URL('../assets/logos/heady-dark-full.svg', import.meta.url).href;
const headyFooterLogo = new URL('../assets/logos/heady-dark-footer.svg', import.meta.url).href;

const html = htm.bind(React.createElement);

export function CustomerLayout({ children, cartCount = 0, onOpenCart }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // Search & Mobile State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Heady Studio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Section State
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

  // State to track scroll position for header background
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return html`
    <div className="min-h-screen w-full bg-[#121214] text-white flex flex-col overflow-x-hidden">
      
      <!-- ================= HEADER / NAVBAR ================= -->
      <header className=${`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#121214]/95 backdrop-blur-md border-b border-zinc-800/50 shadow-xl py-4' 
          : 'bg-transparent border-b border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          <!-- Brand Logo (Navbar) -->
          <${Link} to="/" className="hover:opacity-90 transition-opacity">
            <img src=${headDarkLogo} alt="Heady Logo" className="h-12 w-auto" />
          <//> 

          <!-- Desktop Navigation Links -->
          <nav className="hidden md:flex items-center gap-8 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
            <${Link} to="/" onClick=${handleNavClick} className=${getNavLinkClass('/')}>Home<//>
            <${Link} to="/shop" onClick=${handleNavClick} className=${getNavLinkClass('/shop')}>Shop<//>
            <button 
              onClick=${() => scrollToSection('contact')} 
              className=${`text-sm font-medium transition-colors focus:outline-none cursor-pointer ${
                activeSection === 'contact' ? 'text-red-500 font-semibold' : 'text-white hover:text-red-400'
              }`}
            >
              Contact
            </button>

            <button 
              onClick=${() => scrollToSection('follow')} 
              className=${`text-sm font-medium transition-colors focus:outline-none cursor-pointer ${
                activeSection === 'follow' ? 'text-red-500 font-semibold' : 'text-white hover:text-red-400'
              }`}
            >
              Follow
            </button>
            <${Link} to="/help" className=${getNavLinkClass('/help')}>Help<//>
          </nav>

          <!-- Desktop Action Icons -->
          <div className="hidden md:flex items-center gap-6 text-zinc-300">
            <!-- Desktop Search Button -->
            <button 
              onClick=${() => setIsSearchOpen(true)} 
              className="hover:text-white transition-colors p-1 focus:outline-none cursor-pointer" 
              title="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- Cart Icon Button with Red Dot Indicator -->
            <button 
              onClick=${onOpenCart}
              className="relative p-2 text-white hover:text-red-500 transition-colors cursor-pointer focus:outline-none"
              aria-label="Open Cart"
            >
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>

              <!-- Persistent Red Dot Indicator -->
              ${cartCount > 0 ? html`
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-[#121214]"></span>
              ` : null}
            </button>
          </div>

          <!-- Mobile Hamburger Button -->
          <button 
            onClick=${() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-zinc-300 hover:text-white p-2 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${isMobileMenuOpen ? html`
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ` : html`
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              `}
            </svg>
          </button>
        </div>

        <!-- Mobile Collapsible Menu Drawer -->
        ${isMobileMenuOpen ? html`
          <div className="md:hidden bg-[#121214] border-b border-zinc-800 px-6 py-6 flex flex-col gap-6 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
            
            <!-- Quick Action Icons inside Mobile Drawer -->
            <div className="flex items-center justify-around py-3 border-b border-zinc-800/80 text-zinc-300">
              <!-- Mobile Search -->
              <button 
                type="button"
                onClick=${() => { 
                  setIsMobileMenuOpen(false); 
                  setIsSearchOpen(true); 
                }} 
                className="flex flex-col items-center gap-1 text-xs hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>

              <!-- Mobile Cart with Red Dot Indicator -->
              <button 
                type="button"
                onClick=${() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenCart) onOpenCart();
                }}
                className="relative flex flex-col items-center gap-1 text-xs hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  ${cartCount > 0 ? html`
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-[#121214]"></span>
                  ` : null}
                </div>
                Cart
              </button>
            </div>
            
            <!-- Mobile Navigation Links -->
            <nav className="flex flex-col gap-4 text-base">
              <${Link} to="/" onClick=${() => setIsMobileMenuOpen(false)} className=${getNavLinkClass('/')}>Home<//>
              <${Link} to="/shop" onClick=${() => setIsMobileMenuOpen(false)} className=${getNavLinkClass('/shop')}>Shop<//>
              <button 
                onClick=${() => { setIsMobileMenuOpen(false); scrollToSection('contact'); }} 
                className="text-left text-sm font-medium text-white hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
              >
                Contact
              </button>

              <button 
                onClick=${() => { setIsMobileMenuOpen(false); scrollToSection('follow'); }} 
                className="text-left text-sm font-medium text-white hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
              >
                Follow
              </button>
              <${Link} to="/help" onClick=${() => setIsMobileMenuOpen(false)} className=${getNavLinkClass('/help')}>Help<//>
            </nav>

          </div>
        ` : null}
      </header>

      <!-- ================= SEARCH OVERLAY MODAL ================= -->
      ${isSearchOpen ? html`
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col items-center pt-10 px-4 transition-all"
          onClick=${() => setIsSearchOpen(false)}
        >
          <div className="w-full max-w-2xl flex flex-col gap-3" onClick=${(e) => e.stopPropagation()}>
            <div className="bg-[#433e48] text-white rounded-full px-5 py-3 flex items-center gap-4 shadow-2xl border border-white/10">
              <button 
                type="button"
                onClick=${() => setIsSearchOpen(false)}
                className="text-zinc-300 hover:text-white transition-colors p-1 focus:outline-none cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <input 
                type="text" 
                value=${searchQuery} 
                onInput=${(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                autoFocus
                className="bg-transparent text-white text-lg w-full focus:outline-none placeholder-zinc-400 font-normal tracking-wide"
              />

              <button 
                type="button" 
                className="bg-white text-[#433e48] p-2.5 rounded-full hover:bg-zinc-200 transition-colors flex-shrink-0 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            ${searchQuery.trim().length > 0 ? html`
              <div className="bg-[#433e48] text-white rounded-[2rem] p-6 shadow-2xl border border-white/10 flex flex-col gap-3">
                ${filteredSuggestions.length > 0 ? filteredSuggestions.map(item => html`
                  <div 
                    key=${item}
                    onClick=${() => {
                      setSearchQuery(item);
                      setIsSearchOpen(false);
                    }}
                    className="text-zinc-100 hover:text-white text-lg font-medium cursor-pointer transition-colors py-1 px-3 rounded-xl hover:bg-white/10"
                  >
                    ${item}
                  </div>
                `) : html`
                  <div className="text-zinc-400 text-base py-2 px-3">No matching products found</div>
                `}
              </div>
            ` : null}
          </div>
        </div>
      ` : null}

      <!-- ================= MAIN CONTENT INJECTION ================= -->
      <main className="max-w-screen flex-grow">
        ${children}
      </main>

      <!-- ================= FOOTER ================= -->
      <footer className="bg-[#121214] text-zinc-300 pt-12 md:pt-16 pb-8 border-t border-zinc-800/60 overflow-hidden relative font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"> 
        <div className="w-full px-4 sm:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16 relative z-10 text-center sm:text-left">
            
            <div id="follow" className="flex flex-col items-center sm:items-start">
              <h3 className=${`font-semibold text-lg mb-3 md:mb-4 transition-colors ${
                activeSection === 'follow' ? 'text-red-500 font-bold' : 'text-white'
              }`}>
                Follow us on
              </h3>
              <ul className="space-y-2 text-sm font-medium text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
              </ul>
            </div>

            <div id="contact" className="flex flex-col items-center sm:items-start">
              <h3 className=${`font-semibold text-lg mb-3 md:mb-4 transition-colors ${
                activeSection === 'contact' ? 'text-red-500 font-bold' : 'text-white'
              }`}>
                Contact
              </h3>
              <ul className="space-y-2 text-sm font-medium text-zinc-400">
                <li><a href="mailto:heady@support.com" className="hover:text-white transition-colors">heady@support.com</a></li>
                <li><span>(308) 551-236</span></li>
                <li><span>Colon St., Cebu City, 6000</span></li>
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-white font-semibold text-lg mb-3 md:mb-4">Help</h3>
              <ul className="space-y-2 text-sm font-medium text-zinc-400">
                <li><${Link} to="/faq" className="hover:text-white transition-colors">FAQ<//></li>
                <li><${Link} to="/privacy" className="hover:text-white transition-colors">Privacy Policy<//></li>
                <li><${Link} to="/terms" className="hover:text-white transition-colors">Terms & Conditions<//></li>
                <li><${Link} to="/cookies" className="hover:text-white transition-colors">Cookie Policy<//></li>
                <li><${Link} to="/about" className="hover:text-white transition-colors">About<//></li>
              </ul>
            </div>

            <div className="order-first md:order-none flex flex-col items-center sm:items-start justify-start mb-4 sm:mb-0">
              <img src=${headyFullLogo} alt="Heady Logo" className="h-10 md:h-12 w-auto mb-2 scale-200" />
            </div>
            
          </div>

          <div className="my-8 md:my-12 py-4 md:py-6 flex items-center justify-center opacity-90 select-none overflow-hidden">
            <img src=${headyFooterLogo} alt="Heady Watermark" className="h-20 sm:h-36 md:h-48 lg:h-80 w-auto object-contain scale-120" />
          </div>

          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3 text-center sm:text-left">
            <p>© 2026 Heady. All rights reserved.</p>
            <p className="font-medium text-zinc-300">Need premium audio gear ? Get Heady!</p>
          </div>

        </div>
      </footer>

    </div>
  `;
}
