import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function CustomerLayout({
  title = 'Customer Management',
  columns = [
    { key: 'customer', label: 'Customer' },
    { key: 'email', label: 'Email Address' },
    { key: 'contact', label: 'Contact Number' },
    { key: 'orders', label: 'No. of Orders' },
    { key: 'amount', label: 'Purchase Amount' },
    { key: 'status', label: 'Account Status' }
  ],
  children
}) {
  return html`
    <div className="w-full min-h-screen bg-[#0a0a0c] text-white p-6 lg:p-12 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] flex flex-col gap-6">
      
      <!-- Page Title -->
      <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white">
        ${title}
      </h1>

      <!-- Table Header Card (6 Columns) -->
      <div className="w-full bg-[#18171a] border border-white/20 rounded-2xl sm:rounded-3xl px-6 py-4 shadow-md">
        <div className="grid grid-cols-6 gap-4 items-center text-center text-sm font-normal text-zinc-300">
          ${columns.map(
            (col) => html`
              <div key=${col.key} className="truncate px-1">
                ${col.label}
              </div>
            `
          )}
        </div>
      </div>

      <!-- Main Body Slot for Table Rows -->
      <div className="w-full flex flex-col gap-3">
        ${children}
      </div>

    </div>
  `;
}

export default CustomerLayout;