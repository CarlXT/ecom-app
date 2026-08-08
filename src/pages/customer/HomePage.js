import React from 'react';
import htm from 'htm';

import HeroSection from '../../components/customer/home/HeroSection.js';
import FeauturedSection from '../../components/customer/home/FeaturedSection.js';
import PromotionalSection from '../../components/customer/home/PromotionalSection.js';

const html = htm.bind(React.createElement);

// Add 'export default' before function
export default function HomePage() {
  return html`
    <div >
      <${HeroSection} />
      <${FeauturedSection}/>
      <${PromotionalSection}/>
    </div>
  `;
}