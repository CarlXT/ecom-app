import React from 'react';
import htm from 'htm';

import OverviewHeaderSection from '../../components/admin/dashboard/OverviewHeaderSection.js';
import OverviewCardsSection from '../../components/admin/dashboard/OverviewCardsSection.js';

const html = htm.bind(React.createElement);

export default function DashboardPage() {
  return html`
    <div className="w-full min-h-screen bg-[#121214] p-10 md:p-12 flex flex-col gap-8 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
      <${OverviewHeaderSection} />
      <${OverviewCardsSection} />
    </div>
  `;
}