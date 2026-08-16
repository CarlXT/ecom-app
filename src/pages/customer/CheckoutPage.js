import React, { useState } from 'react';
import htm from 'htm';
import { useNavigate } from 'react-router-dom';

import CheckoutStepperSection from '../../components/customer/checkout/CheckoutStepperSection.js';
import ShippingDetailsSection from '../../components/customer/checkout/ShippingDetailsSection.js';
import PaymentMethodSection from '../../components/customer/checkout/PaymentMethodSection.js';
import CheckoutOrderSection from '../../components/customer/checkout/CheckoutOrderSection.js';
import OrderSummarySection from '../../components/customer/checkout/OrderSummarySection.js';
import { useCart } from '../../context/CartState.js';
import { useOrders } from '../../context/OrderState.js';

const html = htm.bind(React.createElement);

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    note: '',
    paymentMethod: 'Cash on Delivery (COD)'
  });

  const subtotal = getCartTotal();

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const orderData = {
        customer_name: formData.name,
        email: formData.email,
        phone: formData.contact,
        address: formData.address,
        payment_method: formData.paymentMethod,
        order_notes: formData.note,
        subtotal: subtotal,
        total: subtotal, // Assuming no tax/shipping for now
        status: 'Pending'
      };

      const { data, error } = await placeOrder(orderData, cart);
      setLoading(false);

      if (!error) {
        clearCart();
        navigate('/confirmation/order', { state: { order: data } });
      } else {
        alert('Failed to place order: ' + error);
      }
    }
  };

  if (cart.length === 0 && step === 1) {
    return html`
      <div className="min-h-screen bg-[#1e1e24] text-white flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button onClick=${() => navigate('/shop')} className="px-6 py-2 bg-red-600 rounded-full font-bold">Return to Shop</button>
      </div>
    `;
  }

  return html`
    <div className="w-full bg-[#1e1e24] min-h-screen pt-10 px-4">
      <${CheckoutStepperSection}
        step=${step}
        onStepChange=${(nextStep) => setStep(nextStep)}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-10">
        <div className="lg:col-span-7 space-y-6">
          ${step === 1 && html`
            <${ShippingDetailsSection}
              formData=${formData}
              onChange=${(updates) => setFormData(prev => ({ ...prev, ...updates }))}
              onSubmit=${handleSubmit}
            />
          `}

          ${step === 2 && html`
            <${PaymentMethodSection}
              formData=${formData}
              onChange=${(updates) => setFormData(prev => ({ ...prev, ...updates }))}
              onNext=${() => setStep(3)}
            />
          `}

          ${step === 3 && html`
            <${CheckoutOrderSection}
              formData=${formData}
              onSubmit=${handleSubmit}
              loading=${loading}
            />
          `}
        </div>

        <${OrderSummarySection}
          cartItems=${cart}
          subtotal=${subtotal}
        />
      </div>
    </div>
  `;
}
