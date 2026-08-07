import React from 'react';
import { createRoot } from 'react-dom/client';
import htm from 'htm';

const html = htm.bind(React.createElement);

function App() {
  return html`
    
      HEADY AUDIO
      Zero-npm React + Tailwind + Supabase architecture is running!
    
  `;
}

const root = createRoot(document.getElementById('root'));
root.render(html`<${App} />`);