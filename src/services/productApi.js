import { supabase } from './supabaseClient.js';

/**
 * Fetch all products with optional filtering, search, and sorting
 * @param {Object} options - Query parameters
 * @param {string} [options.category] - Filter by category slug
 * @param {string} [options.search] - Search query matching title or description
 * @param {string} [options.sortBy] - Column to sort by (default: 'created_at')
 * @param {boolean} [options.ascending] - Sort direction (default: false)
 */
export async function fetchProducts({ 
  category = null, 
  search = '', 
  sortBy = 'created_at', 
  ascending = false 
} = {}) {
  try {
    let query = supabase
      .from('products')
      .select('*');

    // Apply category filter if provided
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Apply text search on name or description
    if (search.trim()) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending });

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching products:', err.message);
    return { data: [], error: err.message };
  }
}

/**
 * Fetch a single product by its unique ID
 * @param {string|number} id - Product ID
 */
export async function fetchProductById(id) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error(`Error fetching product #${id}:`, err.message);
    return { data: null, error: err.message };
  }
}

/**
 * Create a new product (Admin)
 * @param {Object} product - Product details object
 */
export async function createProduct(product) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error creating product:', err.message);
    return { data: null, error: err.message };
  }
}

/**
 * Update an existing product by ID (Admin)
 * @param {string|number} id - Product ID
 * @param {Object} updates - Fields to update
 */
export async function updateProduct(id, updates) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error(`Error updating product #${id}:`, err.message);
    return { data: null, error: err.message };
  }
}

/**
 * Delete a product by ID (Admin)
 * @param {string|number} id - Product ID
 */
export async function deleteProduct(id) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (err) {
    console.error(`Error deleting product #${id}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Upload a product image to Supabase Storage bucket
 * @param {File} file - DOM File object from input[type="file"]
 * @returns {Promise<{ publicUrl: string|null, error: string|null }>}
 */
export async function uploadProductImage(file) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    // Upload image to 'products' bucket
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public accessible URL
    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return { publicUrl: data.publicUrl, error: null };
  } catch (err) {
    console.error('Error uploading image:', err.message);
    return { publicUrl: null, error: err.message };
  }
}