// src/pages/customer/HomePage.js
import React from 'react';
import htm from 'htm';

import BannerSection from '../../components/customer/shop/BannerSection.js';
import CollectionSection from '../../components/customer/shop/CollectionSection.js';

const html = htm.bind(React.createElement);

// Add 'export default' before function
export default function ShopPage() {
  return html`
    <div>
      <${BannerSection}/>
      <${CollectionSection}/>
    </div>
  `;
}