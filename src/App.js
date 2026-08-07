import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import htm from 'htm';

import { CustomerLayout } from './layouts/CustomerLayout.js';
import HomePage from './pages/customer/HomePage.js';
import ShopPage from './pages/customer/ShopPage.js';

const html = htm.bind(React.createElement);

export default function App() {
  return html`
    <${Router}>
      <${Routes}>
        
        <${Route} 
          path="/" 
          element=${html`
            <${CustomerLayout}>
              <${HomePage} />
            </${CustomerLayout}>
          `} 
        />

        <${Route} 
          path="/shop" 
          element=${html`
            <${CustomerLayout}>
              <${ShopPage} />
            </${CustomerLayout}>
          `} 
        />

      <//>
    <//>
  `;
}

// Ensure the React app actually mounts to the DOM element in index.html
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(html`<${App} />`);
}