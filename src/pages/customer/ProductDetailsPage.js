import React, { useState } from 'react';
import htm from 'htm';

import { CustomerLayout } from '../../layouts/CustomerLayout.js';
import ProductDetailSection from '../../components/customer/details/ProductDetailSection.js';
import RelatedProductSection from '../../components/customer/details/RelatedProductSection.js';
import CartModal from '../../components/ui/modals/customer/CartModal.js';

const html = htm.bind(React.createElement);

export default function ProductDetailsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return html`
    <${CustomerLayout} onOpenCart=${() => setIsCartOpen(true)}>
      <div>
        <${ProductDetailSection} />
        <${RelatedProductSection} />
      </div>

      <${CartModal} 
        isOpen=${isCartOpen} 
        onClose=${() => setIsCartOpen(false)} 
        cartItems=${cartItems}
      />
    <//>
  `;
}