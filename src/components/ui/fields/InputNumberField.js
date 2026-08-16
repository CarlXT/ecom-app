import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function InputNumberField({
  label = 'Phone Number',
  value = '',
  onChange,
  countryCode = '+63',
  onCountryCodeChange,
  countryCodes = ['+63', '+1', '+44', '+61', '+81', '+86', '+91'],
  placeholder = '9123456789',
  name,
  id,
  className = '',
  disabled = false,
  ...props
}) {
  // Enforce numbers-only input (strips any non-digit character)
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    const numberOnlyValue = rawValue.replace(/[^0-9]/g, '');

    if (onChange) {
      e.target.value = numberOnlyValue;
      onChange(e);
    }
  };

  return html`
    <div 
      className=${`flex flex-col justify-center px-5 py-3 rounded-[10px] border border-white bg-[#1a1a1c] text-white w-full transition-colors focus-within:border-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] ${className}`}
    >
      <label 
        htmlFor=${id || name}
        className="text-[20px] font-thin text-zinc-300 leading-snug tracking-wide select-none cursor-pointer"
      >
        ${label}
      </label>
      
      <div className="flex items-center gap-3">
        <!-- Country Code Spinner / Selector -->
        <div className="relative flex items-center flex-shrink-0">
          <select
            value=${countryCode}
            onChange=${onCountryCodeChange}
            disabled=${disabled}
            className="bg-transparent text-[28px] font-thin text-zinc-300 focus:outline-none cursor-pointer pr-4 appearance-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
          >
            ${countryCodes.map(
              (code) => html`
                <option key=${code} value=${code} className="bg-[#1a1a1c] text-white text-base">
                  ${code}
                </option>
              `
            )}
          </select>
          <!-- Dropdown Arrow Indicator -->
          <span className="absolute right-0 pointer-events-none text-zinc-400 text-xs select-none">
            ▼
          </span>
        </div>

        <!-- Vertical Separator -->
        <span className="text-zinc-600 font-thin text-2xl select-none">|</span>

        <!-- Number Input -->
        <input
          type="text"
          inputmode="numeric"
          id=${id || name}
          name=${name}
          value=${value}
          onInput=${handleInputChange}
          placeholder=${placeholder}
          disabled=${disabled}
          className="bg-transparent text-[32px] font-thin text-white focus:outline-none w-full p-0 m-0 border-none leading-tight tracking-wide placeholder-zinc-600 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
          ...${props}
        />
      </div>
    </div>
  `;
}

export default InputNumberField;
