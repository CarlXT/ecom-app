import React, { useState } from 'react';
import htm from 'htm';

import CategoryCard from '../../components/ui/cards/admin/CategoryCard.js';
import ProductLayout from '../../layouts/admin/ProductLayout.js';
import CreateCategoryModal from '../../components/ui/modals/admin/CreateCategoryModal.js';
import ProductDetailsModal from '../../components/ui/modals/admin/ProductDetailsModal.js';
import DeleteConfirmModal from '../../components/ui/modals/admin/DeleteConfirmModal.js';
import { useProducts } from '../../context/ProductState.js';

const html = htm.bind(React.createElement);

export default function ProductsPage() {
  const {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory
  } = useProducts();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchValue, setSearchValue] = useState('');

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const categoryNames = ['All', ...categories.map(c => c.name)];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchValue.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveCategory = async (name) => {
    await addCategory({ name, slug: name.toLowerCase().replace(/ /g, '-') });
    setIsCategoryModalOpen(false);
  };

  const handleSaveProduct = async (productData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async () => {
    if (deletingProduct) {
      await deleteProduct(deletingProduct.id);
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);
    }
  };

  if (loading) {
    return html`<div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">Loading products...</div>`;
  }

  // Group filtered products by category for the CategoryCard component
  const groupedProducts = {};
  filteredProducts.forEach(p => {
    if (!groupedProducts[p.category]) groupedProducts[p.category] = [];
    groupedProducts[p.category].push(p);
  });

  const categoriesToShow = activeCategory === 'All'
    ? categories.map(c => c.name)
    : [activeCategory];

  return html`
    <${ProductLayout}
      title="Product Management"
      categories=${categoryNames}
      activeCategory=${activeCategory}
      onSelectCategory=${setActiveCategory}
      onAddClick=${() => setIsCategoryModalOpen(true)}
      searchValue=${searchValue}
      onSearchChange=${setSearchValue}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick=${() => { setEditingProduct(null); setIsProductModalOpen(true); }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold transition-colors"
        >
          + Add Product
        </button>
      </div>

      <div className="space-y-12">
        ${categoriesToShow.map(cat => html`
          <${CategoryCard}
            key=${cat}
            categoryName=${cat}
            productCount=${groupedProducts[cat]?.length || 0}
            products=${groupedProducts[cat] || []}
            overallStocks=${(groupedProducts[cat] || []).reduce((sum, p) => sum + (p.stock || 0), 0)}
            onEditProduct=${(p) => { setEditingProduct(p); setIsProductModalOpen(true); }}
            onDeleteProduct=${(p) => { setDeletingProduct(p); setIsDeleteModalOpen(true); }}
          />
        `)}
      </div>

      <${CreateCategoryModal}
        isOpen=${isCategoryModalOpen}
        onClose=${() => setIsCategoryModalOpen(false)}
        onSubmit=${handleSaveCategory}
      />

      <${ProductDetailsModal}
        isOpen=${isProductModalOpen}
        onClose=${() => { setIsProductModalOpen(false); setEditingProduct(null); }}
        onSubmit=${handleSaveProduct}
        initialData=${editingProduct}
        categories=${categories.map(c => c.name)}
      />

      <${DeleteConfirmModal}
        isOpen=${isDeleteModalOpen}
        onClose=${() => setIsDeleteModalOpen(false)}
        onConfirm=${handleDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    <//>
  `;
}
