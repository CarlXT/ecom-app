import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function InputTextField({
  label = 'Customer Name',
  value = '',
  onChange,
  placeholder = '',
  name,
  id,
  className = '',
  disabled = false,
  ...props
}) {
  // Enforce text-only input (strips numbers and special symbols except spaces, hyphens, and apostrophes)
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    const textOnlyValue = rawValue.replace(/[^a-zA-Z\s'-]/g, '');

    if (onChange) {
      e.target.value = textOnlyValue;
      onChange(e);
    }
  };

  return html`
    <div 
      class=${`flex flex-col justify-center px-5 py-3 rounded-[10px] border border-white bg-[#1a1a1c] text-white w-full transition-colors focus-within:border-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <label 
        htmlFor=${id || name}
        class="text-[20px] font-thin text-zinc-300 leading-snug tracking-wide select-none cursor-pointer"
      >
        ${label}
      </label>
      
      <input
        type="text"
        id=${id || name}
        name=${name}
        value=${value}
        onInput=${handleInputChange}
        placeholder=${placeholder}
        disabled=${disabled}
        class="bg-transparent text-[32px] font-thin text-white focus:outline-none w-full p-0 m-0 border-none leading-tight tracking-wide placeholder-zinc-600 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
        ...${props}
      />
    </div>
  `;
}

export default InputTextField;