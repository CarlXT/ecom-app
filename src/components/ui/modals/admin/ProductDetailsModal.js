import React, { useState } from 'react';
import htm from 'htm';

import UploadProductPictureButton from '../../buttons/UploadProductPictureButton.js';
import InputTextField from '../../fields/InputTextField.js';
import DescriptionField from '../../fields/DescriptionField.js';
import FilledButton from '../../buttons/FilledButton.js';

const html = htm.bind(React.createElement);

export function ProductDetailsModal({
  isOpen = true,
  title = "New product details",
  subtitle = "Fill up the product details below.",
  onClose,
  onSubmit,
  onCancel
}) {
  const [productName, setProductName] = useState('Heady Audio Monitor 50');
  const [productCategory, setProductCategory] = useState('headphones');
  const [productStatus, setProductStatus] = useState('active');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('900.00');
  const [productStock, setProductStock] = useState('100');
  const [productImage, setProductImage] = useState(null);

  // Status dropdown toggle state
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleSelectStatus = (statusValue) => {
    setProductStatus(statusValue);
    setIsStatusDropdownOpen(false);
  };

  const handleFormSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSubmit) {
      onSubmit({
        productName,
        productCategory,
        productStatus,
        productDescription,
        productPrice,
        productStock,
        productImage
      });
    }
  };

  const statusOptions = ['active', 'inactive', 'out of stock'];

  return html`
    <div 
      onClick=${onClose}
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-6 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
    >
      <div 
        onClick=${(e) => e.stopPropagation()}
        class="w-full max-w-[1520px] bg-[#3c3644] rounded-[32px] p-10 flex flex-col gap-10 text-white shadow-2xl relative border border-white/10 select-none overflow-y-auto max-h-[92vh]"
      >
        
        <!-- Header Section -->
        <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-2">
          <div class="space-y-1">
            <h1 class="text-[36px] font-bold text-white tracking-tight leading-tight">
              ${title}
            </h1>
            <p class="text-[16px] font-medium text-zinc-300 leading-normal">
              ${subtitle}
            </p>
          </div>

          <div class="flex items-center gap-4 shrink-0">
            <${FilledButton} 
              type="button" 
              onClick=${onCancel || onClose}
              class="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-full font-medium"
            >
              Cancel new prodcut
            <//>

            <${FilledButton} 
              type="button" 
              onClick=${handleFormSubmit}
              class="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-full font-medium"
            >
              Add new product
            <//>
          </div>
        </header>

        <!-- Main 3-Column Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <!-- Column 1: Product Appearance -->
          <div class="flex flex-col gap-6">
            <div class="space-y-1">
              <h2 class="text-[36px] font-bold text-white tracking-tight leading-tight">
                Product Appearance
              </h2>
              <p class="text-[16px] font-medium text-zinc-300">
                Upload an image of the product below.
              </p>
            </div>

            <div class="pt-2">
              <${UploadProductPictureButton} 
                onImageSelect=${(file) => setProductImage(file)} 
              />
            </div>
          </div>

          <!-- Column 2: Product Identity -->
          <div class="flex flex-col gap-6">
            <div class="space-y-1">
              <h2 class="text-[36px] font-bold text-white tracking-tight leading-tight">
                Product Identity
              </h2>
              <p class="text-[16px] font-medium text-zinc-300">
                Identify the product by filling up the field below.
              </p>
            </div>

            <div class="flex flex-col gap-4 pt-2 relative">
              <${InputTextField}
                label="Product name"
                placeholder="Product name"
                value=${productName}
                onChange=${(e) => setProductName(e.target ? e.target.value : e)}
              />

              <${InputTextField}
                label="Set product category"
                placeholder="Set product category"
                value=${productCategory}
                onChange=${(e) => setProductCategory(e.target ? e.target.value : e)}
              />

              <!-- Clickable Product Status Field with Small Pop-up Menu -->
              <div class="relative">
                <div onClick=${() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}>
                  <${InputTextField}
                    label="Set product status"
                    placeholder="Set product status"
                    value=${productStatus}
                    readOnly=${true}
                    class="cursor-pointer"
                  />
                </div>

                ${isStatusDropdownOpen && html`
                  <div class="absolute left-0 right-0 top-full mt-2 z-30 bg-[#2b2633] border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1">
                    ${statusOptions.map((option) => html`
                      <button
                        key=${option}
                        type="button"
                        onClick=${() => handleSelectStatus(option)}
                        class=${`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer capitalize ${
                          productStatus === option 
                            ? 'bg-white/10 text-white font-bold' 
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        ${option}
                      </button>
                    `)}
                  </div>
                `}
              </div>

              <${DescriptionField}
                label="Product description"
                placeholder="Product description"
                value=${productDescription}
                onChange=${(e) => setProductDescription(e.target ? e.target.value : e)}
              />
            </div>
          </div>

          <!-- Column 3: Product Price & Quantity -->
          <div class="flex flex-col gap-6">
            <div class="space-y-1">
              <h2 class="text-[36px] font-bold text-white tracking-tight leading-tight">
                Product Price & Quantity
              </h2>
              <p class="text-[16px] font-medium text-zinc-300">
                Set the quantity and price of the below.
              </p>
            </div>

            <div class="flex flex-col gap-4 pt-2">
              <${InputTextField}
                label="Product price"
                placeholder="00.00"
                value=${productPrice}
                onChange=${(e) => setProductPrice(e.target ? e.target.value : e)}
              />

              <${InputTextField}
                label="Product stock quantity"
                placeholder="0"
                value=${productStock}
                onChange=${(e) => setProductStock(e.target ? e.target.value : e)}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

export default ProductDetailsModal;