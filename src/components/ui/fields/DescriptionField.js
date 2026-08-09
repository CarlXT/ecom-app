import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function DescriptionField({
  label = 'Leave a note',
  value = '',
  onChange,
  placeholder = 'Write your note here...',
  name,
  id,
  rows = 4,
  className = '',
  disabled = false,
  ...props
}) {
  return html`
    <div 
      class=${`flex flex-col justify-start px-5 py-4 rounded-[10px] border border-white bg-[#1a1a1c] text-white w-full transition-colors focus-within:border-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <label 
        htmlFor=${id || name}
        class="text-[20px] font-thin text-zinc-300 leading-snug tracking-wide select-none cursor-pointer mb-2"
      >
        ${label}
      </label>
      
      <textarea
        id=${id || name}
        name=${name}
        value=${value}
        onInput=${onChange}
        placeholder=${placeholder}
        disabled=${disabled}
        rows=${rows}
        class="bg-transparent text-[24px] font-thin text-white focus:outline-none w-full p-0 m-0 border-none leading-relaxed tracking-wide placeholder-zinc-500 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] resize-none"
        ...${props}
      ></textarea>
    </div>
  `;
}

export default DescriptionField;