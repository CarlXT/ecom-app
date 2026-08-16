import React, { useState, useEffect } from 'react';
import htm from 'htm';
import InputTextField from '../../fields/InputTextField.js';
import DescriptionField from '../../fields/DescriptionField.js';
import InputNumberField from '../../fields/InputNumberField.js';
import FilledButton from '../../buttons/FilledButton.js';
import UploadProductPictureButton from '../../buttons/UploadProductPictureButton.js';

const html = htm.bind(React.createElement);

export default function ProductDetailsModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  categories = []
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
    status: 'Active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: categories[0] || '',
        image: '',
        status: 'Active'
      });
    }
  }, [initialData, isOpen, categories]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onSubmit(formData);
  };

  return html`
    <div 
      onClick=${onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div 
        onClick=${(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#1c1c1e] rounded-[32px] p-8 sm:p-12 text-white shadow-2xl relative border border-white/10 my-8"
      >
        <h2 className="text-3xl font-bold mb-8">
          ${initialData ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit=${handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <${UploadProductPictureButton}
              onUpload=${(url) => handleChange('image', url)}
              currentImage=${formData.image}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Product Name</label>
              <${InputTextField}
                placeholder="Product Name"
                value=${formData.name}
                onChange=${(val) => handleChange('name', val)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Category</label>
              <select
                value=${formData.category}
                onChange=${(e) => handleChange('category', e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                ${categories.map(cat => html`<option key=${cat} value=${cat}>${cat}</option>`)}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Description</label>
              <${DescriptionField}
                placeholder="Product description..."
                value=${formData.description}
                onChange=${(val) => handleChange('description', val)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Price (Php)</label>
                <${InputNumberField}
                  value=${formData.price}
                  onChange=${(val) => handleChange('price', val)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Stock</label>
                <${InputNumberField}
                  value=${formData.stock}
                  onChange=${(val) => handleChange('stock', val)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Status</label>
              <div className="flex gap-4">
                ${['Active', 'Inactive', 'Out of Stock'].map(status => html`
                  <label key=${status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value=${status}
                      checked=${formData.status === status}
                      onChange=${(e) => handleChange('status', e.target.value)}
                      className="accent-red-500"
                    />
                    <span className="text-sm">${status}</span>
                  </label>
                `)}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick=${onClose}
                className="flex-1 px-6 py-3 border border-zinc-700 rounded-full font-bold hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <${FilledButton}
                type="submit"
                onClick=${handleSubmit}
                className="flex-1"
              >
                ${initialData ? 'Update Product' : 'Add Product'}
              <//>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}
