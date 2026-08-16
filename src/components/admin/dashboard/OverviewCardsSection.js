import React from 'react';
import htm from 'htm';
import OverviewCard from '../../ui/cards/admin/OverviewCards.js';
import { useProducts } from '../../../context/ProductState.js';
import { useOrders } from '../../../context/OrderState.js';

const html = htm.bind(React.createElement);

export function OverviewCardsSection({ customerCount = 0 }) {
  const { products } = useProducts();
  const { orders } = useOrders();

  const stats = {
    totalProducts: products.length,
    totalCustomers: customerCount,
    totalOrders: orders.length,
    totalSales: orders.reduce((sum, o) => sum + Number(o.total), 0).toFixed(2),
    completedOrders: orders.filter(o => o.status === 'Completed').length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length
  };

  return html`
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-36 w-full">
      
      <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-[380px] shrink-0">
        <span className="text-xl sm:text-2xl lg:text-[25px] font-light text-white tracking-tight leading-snug">
          No. of Products & Customers
        </span>

        <${OverviewCard}
          label="Total Products"
          value=${stats.totalProducts}
        />
        <${OverviewCard}
          label="Total Customers"
          value=${stats.totalCustomers}
        />
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 w-full flex-grow">
        <span className="text-xl sm:text-2xl lg:text-[25px] font-light text-white tracking-tight leading-snug">
          No. of Orders & Sales
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          <${OverviewCard}
            label="Total Orders"
            value=${stats.totalOrders}
          />
          <${OverviewCard}
            label="Total Sales"
            value=${stats.totalSales}
          />
          <${OverviewCard}
            label="Completed Orders"
            value=${stats.completedOrders}
          />
          <${OverviewCard}
            label="Pending Orders"
            value=${stats.pendingOrders}
          />
        </div>
      </div>

    </div>
  `;
}

export default OverviewCardsSection;
