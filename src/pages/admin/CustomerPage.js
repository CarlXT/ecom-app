import React, { useEffect, useState } from 'react';
import htm from 'htm';
import CustomerTable from '../../components/ui/table/CustomerTable.js';
import { fetchCustomers } from '../../services/customerApi.js';

const html = htm.bind(React.createElement);

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      const { data, error } = await fetchCustomers();
      if (!error) {
        setCustomers(data);
      }
      setLoading(false);
    };
    loadCustomers();
  }, []);

  return html`
    <div className="p-6 lg:p-12 bg-[#0a0a0c] min-h-screen text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
      <header className="mb-10">
        <h1 className="text-[48px] font-bold tracking-tight">Customer Management</h1>
        <p className="text-zinc-500 text-lg">View and manage your store customers and their purchase history.</p>
      </header>

      ${loading ? html`
        <div className="text-center py-20 text-zinc-500">Loading customers...</div>
      ` : html`
        <${CustomerTable} data=${customers} />
      `}
    </div>
  `;
}
