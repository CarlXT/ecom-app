import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import htm from 'htm';

// Asset paths resolved relative to runtime location
const headyAdminLogo = new URL('../assets/logos/heady-admin-logo.svg', import.meta.url).href;

const html = htm.bind(React.createElement);

export function AdminLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getNavLinkClass = (target) => {
    const isActive = target.startsWith('#')
      ? location.hash === target
      : (currentPath === target && !location.hash);
    return `text-sm font-medium transition-colors ${
      isActive ? 'text-red-500 font-semibold' : 'text-white hover:text-red-400'
    }`;
  };

  return html`
    <div className="min-h-screen bg-[#121214] text-white flex flex-col justify-between font-sans relative scroll-smooth">
      
      <!-- ================= HEADER / NAVBAR ================= -->
      <header className="sticky top-0 z-40 w-full bg-[#121214]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div className="w-full px-4 sm:px-8 h-20 flex items-center justify-between">          
          
          <!-- Brand Logo (Navbar) -->
          <${Link} to="/" className="hover:opacity-90 transition-opacity">
            <img src=${headyAdminLogo} alt="Heady Logo" className="h-12 w-auto" />
          <//> 

          <!-- Desktop Navigation Links -->
          <nav className="hidden md:flex items-center gap-8 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
            <${Link} to="/admin/dashboard" className=${getNavLinkClass('/admin/dashboard')}>Dashboard<//>
            <${Link} to="/admin/products" className=${getNavLinkClass('/admin/products')}>Products<//>
            <${Link} to="/admin/customer" className=${getNavLinkClass('/admin/customer')}>Customer<//>
            <${Link} to="/admin/orders" className=${getNavLinkClass('/admin/orders')}>Orders<//>
          </nav>

          <!-- Desktop Action Icons -->
          <div className="hidden md:flex items-center gap-6 text-zinc-300">
            <!-- User Profile -->
            <${Link} to="/account" className="hover:text-white transition-colors" title="Account">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            <//>
          </div>

          <!-- Mobile Hamburger Button -->
          <button 
            onClick=${() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-zinc-300 hover:text-white p-2 transition-colors focus:outline-none"
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
        ${isMobileMenuOpen && html`
          <div className="md:hidden bg-[#121214] border-b border-zinc-800 px-6 py-6 flex flex-col gap-6 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
            
            <!-- Quick Action Icons inside Mobile Drawer -->
            <div className="flex items-center justify-around py-3 border-b border-zinc-800/80 text-zinc-300">
              <${Link} 
                to="/account" 
                onClick=${() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center gap-1 text-xs hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              <//>
            </div>

            <!-- Mobile Navigation Links -->
            <nav className="flex flex-col gap-4 text-base">
              <${Link} to="/admin/dashboard" onClick=${() => setIsMobileMenuOpen(false)} className=${getNavLinkClass('/admin/dashboard')}>Dashboard<//>
              <${Link} to="/admin/products" onClick=${() => setIsMobileMenuOpen(false)} className=${getNavLinkClass('/admin/products')}>Products<//>
              <${Link} to="/admin/customer" onClick=${() => setIsMobileMenuOpen(false)} className=${getNavLinkClass('/admin/customer')}>Customer<//>
              <${Link} to="/admin/orders" onClick=${() => setIsMobileMenuOpen(false)} className=${getNavLinkClass('/admin/orders')}>Orders<//>
            </nav>

          </div>
        `}
      </header>

      <!-- ================= MAIN CONTENT INJECTION ================= -->
      <main className="flex-grow">
        ${children}
      </main>

      <footer className="text-zinc-600 text-xs text-center py-4 border-t border-zinc-800/50">
        © 2026 Heady. All rights reserved.
      </footer>

    </div>
  `;
}
