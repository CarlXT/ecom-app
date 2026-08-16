import React, { useState } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function OutlinedButton({ 
  label = 'Mounts', 
  isActive: externalIsActive, 
  onClick 
}) {
  const [internalIsActive, setInternalIsActive] = useState(false);

  // Supports both controlled (passed via props) and uncontrolled (internal click state) modes
  const isSelected = externalIsActive !== undefined ? externalIsActive : internalIsActive;

  const handleClick = (e) => {
    if (externalIsActive === undefined) {
      setInternalIsActive(!internalIsActive);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return html`
    <button
      type="button"
      onClick=${handleClick}
      className="w-[169px] h-[68px] rounded-[1000px] border border-1 ${isSelected ? 'border-red-600' : 'border-white'} text-white text-[24px] font-normal flex items-center justify-center transition-colors duration-200 cursor-pointer bg-transparent focus:outline-none select-none font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
    >
      ${label}
    </button>
  `;
}

export default OutlinedButton;
