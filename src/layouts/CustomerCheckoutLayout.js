import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function CustomerCheckoutLayout({ title = "Checkout your items", onClose, children }) {
  return html`
    <div class="min-h-screen bg-[#121214] text-white p-6 sm:p-12 font-['SF_Pro_Display',-apple-system,sans-serif] flex flex-col justify-between items-center">
      
      <!-- Reusable Checkout Header -->
      <header class="w-full max-w-6xl flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <button 
          onClick=${onClose}
          class="flex items-center gap-2 text-zinc-300 hover:text-white text-lg font-bold transition-colors cursor-pointer focus:outline-none"
        >
          <span class="text-xl">✕</span>
          <span>${title}</span>
        </button>
        
        <div class="flex items-center gap-2">
          <div class="text-red-600 font-black text-2xl tracking-tighter flex items-center gap-1">
            <!-- Heady Logo Icon -->
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a1 1 0 011 1v18a1 1 0 11-2 0V3a1 1 0 011-1zm-5 4a1 1 0 011 1v10a1 1 0 11-2 0V7a1 1 0 011-1zm10 0a1 1 0 011 1v10a1 1 0 11-2 0V7a1 1 0 011-1z" />
            </svg>
            <span>heady</span>
          </div>
        </div>
      </header>

      <!-- Main Dynamic Content Wrapper -->
      <main class="w-full max-w-6xl my-auto py-8">
        ${children}
      </main>

      <!-- Footer -->
      <footer class="text-zinc-600 text-xs text-center py-4">
        © 2026 Heady. All rights reserved.
      </footer>

    </div>
  `;
}

export default CustomerCheckoutLayout;