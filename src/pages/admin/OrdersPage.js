import React, { useEffect, useState } from 'react';
import htm from 'htm';
import OrderTable from '../../components/ui/table/OrderTable.js';
import { useOrders } from '../../context/OrderState.js';

const html = htm.bind(React.createElement);

export default function OrdersPage() {
  const { orders, loading, refreshOrders, updateStatus } = useOrders();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    refreshOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus(id, newStatus);
  };

  const filteredOrders = filter === 'All'
    ? orders
    : orders.filter(o => o.status === filter);

  const statuses = ['All', 'Pending', 'Confirmed', 'Preparing', 'Shipped', 'Completed', 'Cancelled'];

  return html`
    <div className="p-6 lg:p-12 bg-[#0a0a0c] min-h-screen text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
      <header className="mb-10 space-y-6">
        <h1 className="text-[48px] font-bold tracking-tight">Order Management</h1>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
          ${statuses.map(s => html`
            <button
              key=${s}
              onClick=${() => setFilter(s)}
              className=${`px-6 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                filter === s ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/20 text-zinc-400 hover:border-white/40'
              }`}
            >
              ${s}
            </button>
          `)}
        </div>
      </header>

      ${loading && orders.length === 0 ? html`
        <div className="text-center py-20 text-zinc-500">Loading orders...</div>
      ` : html`
        <${OrderTable}
          data=${filteredOrders}
          onStatusChange=${handleStatusChange}
          onRowClick=${(order) => { window.location.hash = `/admin/order/details?id=${order.id}`; }}
        />
      `}
    </div>
  `;
}
