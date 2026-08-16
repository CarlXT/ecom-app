import React, { useState, useRef } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function UploadProductPictureButton({ 
  initialFileName = 'img-2026-1234567890', 
  onImageSelect 
}) {
  const [fileName, setFileName] = useState(initialFileName);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onImageSelect) {
        onImageSelect(file);
      }
    }
  };

  return html`
    <div 
      onClick=${handleClick}
      className="w-[496px] h-[441px] bg-[#3a3541] border border-white/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#433e4b] transition-colors select-none p-6 text-center font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif]"
    >
      <input 
        type="file" 
        ref=${fileInputRef} 
        onChange=${handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <!-- Upload Icon Tray -->
      <div className="mb-6">
        <svg 
          className="w-12 h-12 text-zinc-200 stroke-[1.2]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2M12 3v12m0-12l-4 4m4-4l4 4" 
          />
        </svg>
      </div>

      <!-- Main Label -->
      <span className="text-[20px] font-thin text-zinc-300 mb-2 block tracking-tight">
        Upload product image
      </span>

      <!-- Dynamic Subtitle (Filename) -->
      <span className="text-[24px] font-thin text-zinc-100 max-w-[420px] truncate block tracking-tight">
        ${fileName}
      </span>
    </div>
  `;
}

export default UploadProductPictureButton;
