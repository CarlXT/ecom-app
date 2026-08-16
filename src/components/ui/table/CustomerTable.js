import React from 'react';
import htm from 'htm';
import AccountStatusBadge from '../../ui/badge/AccountStatusBadge.js';

const html = htm.bind(React.createElement);

export function CustomerTable({
  data = [],
  onRowClick
}) {
  return html`
    <div className="w-full flex flex-col gap-3 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-zinc-200 select-none">
      
      <!-- Table Header -->
      <div className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 mb-2 hidden md:block">
        <div className="grid grid-cols-6 gap-4 text-center text-xs font-bold uppercase tracking-widest text-zinc-500">
          <div className="text-left">Customer</div>
          <div>Email</div>
          <div>Contact</div>
          <div>Orders</div>
          <div>Total Purchase</div>
          <div>Status</div>
        </div>
      </div>

      <!-- Table Body Rows -->
      <div className="flex flex-col gap-3">
        ${data.length === 0
          ? html`
              <div className="w-full bg-[#18171a] border border-white/10 rounded-2xl p-8 text-center text-zinc-400 text-sm">
                No customers found.
              </div>
            `
          : data.map(
              (row) => html`
                <div
                  key=${row.email}
                  onClick=${() => onRowClick && onRowClick(row)}
                  className="w-full bg-[#18171a] border border-white/20 rounded-2xl sm:rounded-3xl px-6 py-4 shadow-md hover:border-white/40 transition-all cursor-pointer"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center text-center text-sm font-normal text-zinc-200">
                    <div className="truncate text-left font-bold md:font-normal">${row.name || '-'}</div>
                    <div className="break-all px-1 leading-tight text-zinc-400 md:text-zinc-200">${row.email || '-'}</div>
                    <div className="truncate px-1 text-zinc-400 md:text-zinc-200">${row.contact || '-'}</div>
                    <div className="truncate px-1">${row.orderCount || '0'}</div>
                    <div className="truncate px-1 font-bold">Php ${Number(row.totalPurchase).toFixed(2)}</div>
                    <div className="flex items-center justify-center">
                      <${AccountStatusBadge} status=${row.status || 'Active'} />
                    </div>
                  </div>
                </div>
              `
            )}
      </div>
    </div>
  `;
}

export default CustomerTable;
