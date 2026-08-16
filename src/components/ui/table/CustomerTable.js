import React from 'react';
import htm from 'htm';
import AccountStatusBadge from '../../ui/badge/AccountStatusBadge.js';

const html = htm.bind(React.createElement);

export function CustomerTable({
  data = [
    {
      id: 1,
      customer: 'Melisa McCarthy',
      email: 'melisamc@gmail.com',
      contact: '091234567890',
      orders: '01',
      amount: '900.00',
      status: 'Pending'
    }
  ],
  onRowClick
}) {
  return html`
    <div className="w-full flex flex-col gap-3 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-zinc-200 select-none">
      
      <!-- Table Body Rows Container -->
      <div className="flex flex-col gap-3">
        ${data.length === 0
          ? html`
              <div className="w-full bg-[#18171a] border border-white/10 rounded-2xl p-8 text-center text-zinc-400 text-sm">
                No record found.
              </div>
            `
          : data.map(
              (row) => html`
                <div
                  key=${row.id || row.email}
                  onClick=${() => onRowClick && onRowClick(row)}
                  className="w-full bg-[#18171a] border border-white/20 rounded-2xl sm:rounded-3xl px-6 py-3.5 shadow-md hover:border-white/40 transition-all cursor-pointer"
                >
                  <div className="grid grid-cols-6 gap-4 items-center text-center text-sm font-normal text-zinc-200">
                    <div className="truncate text-left sm:text-center">${row.customer || '-'}</div>
                    <div className="break-all px-1 leading-tight">${row.email || '-'}</div>
                    <div className="truncate px-1">${row.contact || '-'}</div>
                    <div className="truncate px-1">${row.orders || '-'}</div>
                    <div className="truncate px-1">${row.amount || '-'}</div>
                    <div className="flex items-center justify-center">
                      <${AccountStatusBadge} status=${row.status || 'Pending'} />
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