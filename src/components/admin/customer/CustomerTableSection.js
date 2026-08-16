import React, { useState } from 'react';
import htm from 'htm';
import AdminTable from '../../ui/table/CustomerTable.js';

const html = htm.bind(React.createElement);

export function CustomerTableSection() {
  // Customer data state (New items added to this state will automatically render standard rows)
  const [customers, setCustomers] = useState([
    {
      id: 1,
      customer: 'Melisa McCarthy',
      email: 'melisamc@gmail.com',
      contact: '091234567890',
      orders: '01',
      amount: '900.00',
      status: 'Pending'
    }
  ]);

  // Dynamic columns config for Customer Management
  const customerColumns = [
    { key: 'customer', label: 'Customer' },
    { key: 'email', label: 'Email Address' },
    { key: 'contact', label: 'Contact Number' },
    { key: 'orders', label: 'No. of Orders' },
    { key: 'amount', label: 'Purchase Amount' },
    { key: 'status', label: 'Account Status' }
  ];

  const handleRowClick = (customerData) => {
    console.log('Customer selected:', customerData);
  };

  return html`
    <section className="w-full flex flex-col gap-6 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]">
      <!-- Section Header -->
      <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
        Customer Management
      </h1>

      <!-- Reusable Admin Table Component -->
      <${AdminTable}
        columns=${customerColumns}
        data=${customers}
        onRowClick=${handleRowClick}
      />
    </section>
  `;
}

export default CustomerTableSection;