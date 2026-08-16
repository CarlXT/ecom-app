import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import htm from 'htm';

const headyDarkLogo = new URL('../assets/logos/heady-dark.svg', import.meta.url).href;

const html = htm.bind(React.createElement);

export function CustomerCheckoutLayout({ 
  title = "Checkout your items", 
  onClose, 
  headDarkLogo = "../assets/logo.png", 
  children 
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return html`
    <div className="min-h-screen w-full bg-[#121214] text-white flex flex-col overflow-x-hidden">
      
      <header className=${`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#121214]/95 backdrop-blur-md border-b border-zinc-800/50 shadow-xl py-4' 
          : 'bg-transparent border-b border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          <button 
            type="button"
            onClick=${onClose || (() => window.history.back())}
            className="flex items-center gap-2 text-zinc-300 hover:text-white text-lg font-bold transition-colors cursor-pointer focus:outline-none"
          >
            <span className="text-xl">✕</span>
            <span>${title}</span>
          </button>

          <${Link} to="/" className="hover:opacity-90 transition-opacity">
            <img src=${headyDarkLogo} alt="Heady Logo" className="h-10 w-auto" />
          <//> 
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex-grow pt-28 pb-12">
        ${children}
      </main>

      <footer className="text-zinc-600 text-xs text-center py-4 border-t border-zinc-800/50">
        © 2026 Heady. All rights reserved.
      </footer>

    </div>
  `;
}

export default CustomerCheckoutLayout;
