import React, { useEffect, useState } from 'react';
import htm from 'htm';

import OverviewCardsSection from '../../components/admin/dashboard/OverviewCardsSection.js';
import { fetchCustomers } from '../../services/customerApi.js';
import { useOrders } from '../../context/OrderState.js';

const html = htm.bind(React.createElement);

export default function DashboardPage() {
  const [customerCount, setCustomerCount] = useState(0);
  const { refreshOrders } = useOrders();

  useEffect(() => {
    const loadData = async () => {
      refreshOrders();
      const { data, error } = await fetchCustomers();
      if (!error) {
        setCustomerCount(data.length);
      }
    };
    loadData();
  }, []);

  return html`
    <div className="w-full min-h-screen bg-[#121214] p-10 md:p-12 flex flex-col gap-8 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
      <h1 className="text-[48px] font-bold tracking-tight text-white mb-4">Dashboard Overview</h1>
      <${OverviewCardsSection} customerCount=${customerCount} />
    </div>
  `;
}
