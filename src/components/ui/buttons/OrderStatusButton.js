import React, { useState, useRef, useEffect } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

// Map of statuses with their respective Tailwind color classes (1px border outline, transparent bg)
const STATUS_CONFIG = {
  Pending: {
    label: 'Pending',
    styles: 'border-yellow-400 text-yellow-400'
  },
  Confirmed: {
    label: 'Confirmed',
    styles: 'border-blue-500 text-blue-500'
  },
  Preparing: {
    label: 'Preparing',
    styles: 'border-orange-500 text-orange-500'
  },
  Shipped: {
    label: 'Shipped',
    styles: 'border-purple-500 text-purple-500'
  },
  Completed: {
    label: 'Completed',
    styles: 'border-emerald-400 text-emerald-400'
  },
  Cancelled: {
    label: 'Cancelled',
    styles: 'border-red-500 text-red-500'
  }
};

export function OrderStatusButton({
  status = 'Pending',
  onStatusChange,
  className = ''
}) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Sync internal state if initial status prop updates
  useEffect(() => {
    if (status) {
      setCurrentStatus(status);
    }
  }, [status]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format lookup (fallback to Pending if unmapped)
  const activeConfig = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.Pending;

  const handleSelectStatus = (newStatusKey) => {
    setCurrentStatus(newStatusKey);
    setIsOpen(false);
    if (onStatusChange) {
      onStatusChange(newStatusKey);
    }
  };

  return html`
    <div className="relative inline-block text-left" ref=${menuRef}>
      <!-- Main Status Toggle Button -->
      <button
        type="button"
        onClick=${() => setIsOpen(!isOpen)}
        className=${`inline-flex items-center justify-between gap-2 px-6 py-2 rounded-2xl border bg-transparent text-sm font-normal tracking-wide transition-all cursor-pointer hover:bg-white/5 select-none ${activeConfig.styles} ${className}`}
      >
        <span>${activeConfig.label}</span>
        <svg
          className=${`w-4 h-4 stroke-[2] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <!-- Status Selection Menu Dropdown -->
      ${isOpen &&
      html`
        <div
          className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-40 bg-[#18171a]/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden p-1.5 flex flex-col gap-1"
        >
          ${Object.keys(STATUS_CONFIG).map((statusKey) => {
            const config = STATUS_CONFIG[statusKey];
            const isSelected = statusKey === currentStatus;

            return html`
              <button
                key=${statusKey}
                type="button"
                onClick=${() => handleSelectStatus(statusKey)}
                className=${`w-full text-left px-3.5 py-2 text-sm rounded-xl transition-colors flex items-center justify-between hover:bg-white/10 ${config.styles}`}
              >
                <span>${config.label}</span>
                ${isSelected &&
                html`
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                `}
              </button>
            `;
          })}
        </div>
      `}
    </div>
  `;
}

export default OrderStatusButton;