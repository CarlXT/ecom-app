import React from 'react';
import { createRoot } from 'react-dom/client';
import htm from 'htm';

const html = htm.bind(React.createElement);

function TestApp() {
  return html`
    <div class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div class="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md text-center shadow-xl">
        <div class="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-slate-950 text-2xl mx-auto mb-4">
          H
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">Heady Audio is Online!</h1>
        <p class="text-slate-400 text-sm">
          React 18 + htm + Tailwind CSS is working properly without npm.
        </p>
      </div>
    </div>
  `;
}

const root = createRoot(document.getElementById('root'));
root.render(html`<${TestApp} />`);