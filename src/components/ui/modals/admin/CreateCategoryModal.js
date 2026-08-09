import React, { useState } from 'react';
import htm from 'htm';

import InputTextField from '../../fields/InputTextField.js';
import FilledButton from '../../buttons/FilledButton.js';

const html = htm.bind(React.createElement);

export function CreateCategoryModal({ isOpen = true, onClose, onSubmit }) {
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
    >
      <div 
        onClick=${(e) => e.stopPropagation()}
        class="w-[628px] h-[406px] bg-[#3b3642] rounded-[32px] p-10 flex flex-col justify-between text-white shadow-2xl relative border border-white/10 select-none"
      >
        <!-- Header Text Section -->
        <div class="space-y-3">
          <h2 class="text-[36px] font-bold text-white tracking-tight leading-tight">
            Create product category
          </h2>
          <p class="text-[16px] font-medium text-zinc-300 leading-snug max-w-[500px]">
            To create a category please enter a general product name (e.g. headphone).
          </p>
        </div>

        <!-- Form Section -->
        <form onSubmit=${handleSubmit} class="space-y-6">
          <${InputTextField}
            placeholder="Headphone"
            value=${categoryName}
            onChange=${(e) => setCategoryName(e.target ? e.target.value : e)}
          />

          <${FilledButton}
            type="submit"
            onClick=${handleSubmit}
          >
            Create category
          <//>
        </form>
      </div>
    </div>
  `;
}

export default CreateCategoryModal;