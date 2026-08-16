import { supabase } from './supabaseClient.js';

/**
 * Fetch all customers with their order stats
 * In a real app, this might be a view or a complex query.
 * For this assessment, we'll fetch from the 'orders' table to aggregate.
 */
export async function fetchCustomers() {
  try {
    // 1. Fetch unique customers from orders table
    // (In a more complete schema, we'd have a 'customers' table)
    const { data: orders, error } = await supabase
      .from('orders')
      .select('customer_name, email, phone, total, status');

    if (error) throw error;

    const customerMap = {};

    orders.forEach(order => {
      const email = order.email;
      if (!customerMap[email]) {
        customerMap[email] = {
          name: order.customer_name,
          email: order.email,
          contact: order.phone,
          orderCount: 0,
          totalPurchase: 0,
          status: 'Active' // Default
        };
      }
      customerMap[email].orderCount += 1;
      customerMap[email].totalPurchase += Number(order.total);
    });

    return { data: Object.values(customerMap), error: null };
  } catch (err) {
    console.error('Error fetching customers:', err.message);
    return { data: [], error: err.message };
  }
}
