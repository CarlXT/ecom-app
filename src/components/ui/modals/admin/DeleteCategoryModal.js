import React, { useState } from 'react';
import htm from 'htm';

import FilledButton from '../../buttons/FilledButton.js';

const html = htm.bind(React.createElement);

export function DeleteCategoryModal({ isOpen = true, onClose, onSubmit }) {
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
          <h2 className="text-[36px] font-bold text-red-700 tracking-tight leading-tight">
            Action prohibited!
          </h2>
          <p className="text-[16px] font-medium text-yellow-400 leading-snug max-w-[500px]">
            This DELETION CAN NOT PROCEED as this category already contains products.
          </p>
        </div>

          <${FilledButton}
            type="submit"
            onClick=${handleSubmit}
          >
            Ok
          <//>
        </form>
      </div>
    </div>
  `;
}

export default DeleteCategoryModal;
