import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Reusable Heady Logo Component (SVG)
function HeadyLogo({ className = "h-7" }) {
  return html`
    <div class=${`flex items-center gap-2.5 ${className}`}>
      <svg class="h-full w-auto" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="22" width="16" height="36" rx="8" fill="#E5383B" />
        <rect x="24" y="0" width="16" height="80" rx="8" fill="#E5383B" />
        <rect x="48" y="0" width="16" height="80" rx="8" fill="#E5383B" />
        <rect x="72" y="22" width="16" height="36" rx="8" fill="#E5383B" />
      </svg>
      <span class="font-extrabold tracking-wider text-2xl text-white lowercase">heady</span>
    </div>
  `;
}

export function CustomerLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Active navigation link styling helper
  const getNavLinkClass = (path) => {
    const isActive = currentPath === path;
    return `text-sm font-medium transition-colors ${
      isActive ? 'text-red-500 font-semibold' : 'text-zinc-200 hover:text-white'
    }`;
  };

  return html`
    <div class="min-h-screen bg-[#121214] text-white flex flex-col justify-between font-sans">
      
      <!-- ================= HEADER / NAVBAR ================= -->
      <header class="sticky top-0 z-40 w-full bg-[#121214]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <!-- Brand Logo -->
          <${Link} to="/" class="hover:opacity-90 transition-opacity">
            <${HeadyLogo} className="h-8" />
          <//>

          <!-- Center Navigation Links -->
          <nav class="hidden md:flex items-center gap-8">
            <${Link} to="/" class=${getNavLinkClass('/')}>Home<//>
            <${Link} to="/shop" class=${getNavLinkClass('/shop')}>Shop<//>
            <${Link} to="/contact" class=${getNavLinkClass('/contact')}>Contact<//>
            <a href="#follow" class="text-sm font-medium text-zinc-200 hover:text-white transition-colors">Follow</a>
            <${Link} to="/help" class=${getNavLinkClass('/help')}>Help & Support<//>
          </nav>

          <!-- Right Action Icons -->
          <div class="flex items-center gap-6 text-zinc-300">
            <!-- Search -->
            <button class="hover:text-white transition-colors" title="Search">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- User Profile -->
            <${Link} to="/account" class="hover:text-white transition-colors" title="Account">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            <//>

            <!-- Cart -->
            <${Link} to="/cart" class="hover:text-white transition-colors relative" title="Shopping Cart">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            <//>
          </div>

        </div>
      </header>

      <!-- ================= MAIN CONTENT INJECTION ================= -->
      <main class="flex-grow">
        ${children}
      </main>

      <!-- ================= FOOTER ================= -->
      <footer class="bg-[#121214] text-zinc-300 pt-16 pb-6 border-t border-zinc-800/60 overflow-hidden relative">
        <div class="max-w-7xl mx-auto px-6">
          
          <!-- Top Columns Section -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16 relative z-10">
            
            <!-- Column 1: Follow Us -->
            <div>
              <h3 class="text-white font-semibold text-lg mb-4">Follow us on</h3>
              <ul class="space-y-2.5 text-sm font-medium text-zinc-400">
                <li><a href="#" class="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" class="hover:text-white transition-colors">TikTok</a></li>
              </ul>
            </div>

            <!-- Column 2: Contact -->
            <div>
              <h3 class="text-white font-semibold text-lg mb-4">Contact</h3>
              <ul class="space-y-2.5 text-sm font-medium text-zinc-400">
                <li><a href="mailto:heady@support.com" class="hover:text-white transition-colors">heady@support.com</a></li>
                <li><span>(308) 551-236</span></li>
                <li><span>Colon St., Cebu City, 6000</span></li>
              </ul>
            </div>

            <!-- Column 3: Help & Support -->
            <div>
              <h3 class="text-white font-semibold text-lg mb-4">Help & Support</h3>
              <ul class="space-y-2.5 text-sm font-medium text-zinc-400">
                <li><${Link} to="/faq" class="hover:text-white transition-colors">FAQ<//></li>
                <li><${Link} to="/privacy" class="hover:text-white transition-colors">Privacy Policy<//></li>
                <li><${Link} to="/terms" class="hover:text-white transition-colors">Terms & Conditions<//></li>
                <li><${Link} to="/cookies" class="hover:text-white transition-colors">Cookie Policy<//></li>
                <li><${Link} to="/about" class="hover:text-white transition-colors">About<//></li>
              </ul>
            </div>

            <!-- Column 4: Brand Header -->
            <div class="flex flex-col justify-start">
              <${HeadyLogo} className="h-10 mb-2" />
              <p class="text-sm text-zinc-400 font-medium tracking-wide">Elevate Your Soundscape.</p>
            </div>

          </div>

          <!-- Middle Massive Watermark Logo -->
          <div class="my-12 py-6 flex items-center justify-center opacity-90 select-none">
            <${HeadyLogo} className="h-32 sm:h-44 md:h-52 w-auto scale-110" />
          </div>

          <!-- Bottom Sub-Footer Bar -->
          <div class="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
            <p>© 2026 Heady. All rights reserved.</p>
            <p class="font-medium text-zinc-300">Need premium audio gear ? Get Heady!</p>
          </div>

        </div>
      </footer>

    </div>
  `;
}