import { supabase } from './supabaseClient.js';

/**
 * Create a new order with order items
 */
export async function createOrder(orderData, items) {
  try {
    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { data: order, error: null };
  } catch (err) {
    console.error('Error creating order:', err.message);
    return { data: null, error: err.message };
  }
}

/**
 * Fetch all orders (Admin)
 */
export async function fetchOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    return { data: [], error: err.message };
  }
}

/**
 * Update order status (Admin)
 */
export async function updateOrderStatus(id, status) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error(`Error updating order #${id} status:`, err.message);
    return { data: null, error: err.message };
  }
}

/**
 * Fetch orders for a specific customer
 */
export async function fetchCustomerOrders(customerId) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error(`Error fetching orders for customer #${customerId}:`, err.message);
    return { data: [], error: err.message };
  }
}
