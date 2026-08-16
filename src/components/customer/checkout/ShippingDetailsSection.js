import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function ShippingDetailsSection({ formData, onChange, onSubmit }) {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange({ ...formData, [field]: value });
    }
  };

  return html`
    <form onSubmit=${onSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-1">Shipping Details</h2>
      <p className="text-zinc-400 text-xs mb-6">Please confirm the shipping details below.</p>

      <div>
        <label className="text-xs text-zinc-400 block mb-1">Customer Name</label>
        <input 
          type="text" 
          value=${formData.name} 
          onChange=${(e) => handleChange('name', e.target.value)}
          className="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
          required 
        />
      </div>

      <div>
        <label className="text-xs text-zinc-400 block mb-1">Email Address</label>
        <input 
          type="email" 
          value=${formData.email} 
          onChange=${(e) => handleChange('email', e.target.value)}
          className="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
          required 
        />
      </div>

      <div>
        <label className="text-xs text-zinc-400 block mb-1">Delivery Address</label>
        <input 
          type="text" 
          value=${formData.address} 
          onChange=${(e) => handleChange('address', e.target.value)}
          className="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
          required 
        />
      </div>

      <div>
        <label className="text-xs text-zinc-400 block mb-1">Contact Number</label>
        <input 
          type="text" 
          value=${formData.contact} 
          onChange=${(e) => handleChange('contact', e.target.value)}
          className="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" 
          required 
        />
      </div>

      <div>
        <label className="text-xs text-zinc-400 block mb-1">Leave a note</label>
        <textarea 
          placeholder="Write your note here..." 
          value=${formData.note}
          onChange=${(e) => handleChange('note', e.target.value)}
          className="w-full bg-[#1c1c20] border border-zinc-700/60 rounded-xl px-4 py-3 h-28 text-white focus:outline-none focus:border-red-500 resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="w-full py-4 bg-white text-black font-extrabold rounded-full hover:bg-zinc-200 transition-all cursor-pointer mt-4"
      >
        Confirm Shipping Details
      </button>
    </form>
  `;
}

export default ShippingDetailsSection;
