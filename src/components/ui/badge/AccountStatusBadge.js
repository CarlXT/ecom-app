import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function AccountStatusBadge({ status = 'Pending', className = '' }) {
  const normalizedStatus = String(status).trim().toLowerCase();
  const isPaid = normalizedStatus === 'paid';

  // 1px border outline, no background color (bg-transparent)
  // Yellow (#facc15) for Pending, Green (#34d399) for Paid
  const statusStyles = isPaid
    ? 'border-emerald-400 text-emerald-400'
    : 'border-[#facc15] text-[#facc15]';

  const displayLabel = isPaid ? 'Paid' : 'Pending';

  return html`
    <span
      className=${`inline-flex items-center justify-center px-7 py-2 rounded-2xl border bg-transparent text-sm font-normal tracking-wide transition-colors select-none ${statusStyles} ${className}`}
    >
      ${displayLabel}
    </span>
  `;
}

export default AccountStatusBadge;