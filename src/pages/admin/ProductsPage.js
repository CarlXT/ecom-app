import React, { useState } from 'react';
import htm from 'htm';

import CategoryCard from '../../components/ui/cards/admin/CategoryCard.js';
import ProductLayout from '../../layouts/admin/ProductLayout.js';

const html = htm.bind(React.createElement);

export function ProductsPage({
  categories = ['Headphones', 'Microphones', 'Filters', 'Mounts'],
  selectedCategory,
  onSelectCategory,
  onAddCategory
}) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || categories[0]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCategory = (categoryData) => {
    if (onAddCategory) {
      onAddCategory(categoryData);
    }
    setIsModalOpen(false);
  };

  return html`
    <${ProductLayout}
      title="Product Management"
      categories=${categories}
      activeCategory=${activeCategory}
      onSelectCategory=${handleCategoryClick}
      onAddClick=${() => setIsModalOpen(true)}
      searchValue=${searchValue}
      onSearchChange=${setSearchValue}
    >
      <!-- DYNAMIC SCROLLABLE CARDS CONTENT -->
      ${categories.map((category) => html`
        <${CategoryCard} key=${category} categoryName=${category} />
      `)}

      <!-- CREATE CATEGORY MODAL -->
      ${isModalOpen && html`
        <${CreateCategoryModal}
          isOpen=${isModalOpen}
          onClose=${handleCloseModal}
          onSave=${handleSaveCategory}
        />
      `}
    <//>
  `;
}

export default ProductsPage;