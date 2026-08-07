import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function Home() {
  return html`
    <div class="p-8 text-center text-white">
      <h1 class="text-3xl font-bold text-emerald-400">Welcome to Heady Audio</h1>
      <p class="mt-2 text-slate-400">Home page placeholder.</p>
    </div>
  `;
}