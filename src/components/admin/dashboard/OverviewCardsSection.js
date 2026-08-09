import React from 'react';
import htm from 'htm';
import OverviewCard from '../../ui/cards/admin/OverviewCards.js';

const html = htm.bind(React.createElement);

export function OverviewCardsSection({
  data = {
    totalProducts: 500,
    totalCustomers: 125,
    totalOrders: 100,
    totalSales: "500.65",
    completedOrders: 91,
    pendingOrders: "09"
  },
  leftLabel = "No. of Products & Customers",
  rightLabel = "No. of Orders & Sales",
  className = ""
}) {
  return html`
    <!-- Main Flex Container -->
    <div className=${`flex flex-col lg:flex-row gap-6 lg:gap-36 w-full ${className}`}>
      
      <!-- Column 1: Left Label + Products & Customers Cards -->
      <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-[380px] shrink-0">
        <span className="text-xl sm:text-2xl lg:text-[25px] font-light text-white tracking-tight leading-snug">
          ${leftLabel}
        </span>

        <${OverviewCard}
          label="Total Products"
          value=${data.totalProducts}
        />
        <${OverviewCard}
          label="Total Customers"
          value=${data.totalCustomers}
        />
      </div>

      <!-- Column 2: Right Label + Orders & Sales 2x2 Grid -->
      <div className="flex flex-col gap-4 sm:gap-6 w-full flex-grow">
        <span className="text-xl sm:text-2xl lg:text-[25px] font-light text-white tracking-tight leading-snug">
          ${rightLabel}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          <${OverviewCard}
            label="Total Orders"
            value=${data.totalOrders}
          />
          <${OverviewCard}
            label="Total Sales"
            value=${data.totalSales}
          />
          <${OverviewCard}
            label="Completed Orders"
            value=${data.completedOrders}
          />
          <${OverviewCard}
            label="Pending Orders"
            value=${data.pendingOrders}
          />
        </div>
      </div>

    </div>
  `;
}

export default OverviewCardsSection;