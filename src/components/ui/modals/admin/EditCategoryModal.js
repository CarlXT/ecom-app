import React, { useState } from 'react';
import htm from 'htm';

import InputTextField from '../../fields/InputTextField.js';
import FilledButton from '../../buttons/FilledButton.js';

const html = htm.bind(React.createElement);

export function EditCategoryModal({ isOpen = true, onClose, onSubmit }) {
  const [categoryName, setCategoryName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSubmit) {
      onSubmit(categoryName);
    }
  };

  return html`
    <div 
      onClick=${onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
    >
      <div 
        onClick=${(e) => e.stopPropagation()}
        className="w-[628px] h-[406px] bg-[#3b3642] rounded-[32px] p-10 flex flex-col justify-between text-white shadow-2xl relative border border-white/10 select-none"
      >
        <!-- Header Text Section -->
        <div className="space-y-3">
          <h2 className="text-[36px] font-bold text-white tracking-tight leading-tight">
            Do you want to edit this category?
          </h2>
          <p className="text-[16px] font-medium text-zinc-300 leading-snug max-w-[500px]">
            You can change the name of this category. Once change products in this category is affected.
          </p>
        </div>

        <!-- Form Section -->
        <form onSubmit=${handleSubmit} className="space-y-6">
          <${InputTextField}
            placeholder="Headphone"
            value=${categoryName}
            onChange=${(e) => setCategoryName(e.target ? e.target.value : e)}
          />

          <${FilledButton}
            type="submit"
            onClick=${handleSubmit}
          >
            Proceed
          <//>
        </form>
      </div>
    </div>
  `;
}

export default EditCategoryModal;
