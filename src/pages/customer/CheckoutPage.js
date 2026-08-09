import React, { useState } from 'react';
import htm from 'htm';

import OrderConfirmationPage from '../../pages/customer/OrderConfirmationPage.js';
import CheckoutStepperSection from '../../components/customer/checkout/CheckoutStepperSection.js';
import ShippingDetailsSection from '../../components/customer/checkout/ShippingDetailsSection.js';
import PaymentMethodSection from '../../components/customer/checkout/PaymentMethodSection.js';
import CheckoutOrderSection from '../../components/customer/checkout/CheckoutOrderSection.js';
import OrderSummarySection from '../../components/customer/checkout/OrderSummarySection.js';
import { CustomerCheckoutLayout } from '../../layouts/CustomerCheckoutLayout.js';

const html = htm.bind(React.createElement);

export default function CheckoutPage({ cartItems = [], onCompleteOrder }) {
  const [step, setStep] = useState(1);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Melisa McCarthy',
    email: 'melisamc@gmail.com',
    address: 'Sanciangko St., Kalubihan, Cebu City 6000',
    contact: '+63 1234567890',
    note: '',
    paymentMethod: 'Cash on Delivery (COD)'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      const finalOrder = {
        orderId: `#HDY-${Math.floor(10000 + Math.random() * 90000)}-2026`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        ...formData,
        items: cartItems,
        total: subtotal
      };

      setCompletedOrder(finalOrder);

      if (onCompleteOrder) {
        onCompleteOrder(finalOrder);
      }
    }
  };

  if (completedOrder) {
    return html`
      <${OrderConfirmationPage} 
        orderDetails=${completedOrder} 
        onContinue=${() => { window.location.hash = '/shop'; }} 
      />
    `;
  }

  return html`
    <${CustomerCheckoutLayout} onClose=${() => window.history.back()}>
      <div class="w-full">
        <${CheckoutStepperSection} 
          step=${step} 
          onStepChange=${(nextStep) => setStep(nextStep)} 
        />

        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-7 space-y-6">
            ${step === 1 && html`
              <${ShippingDetailsSection} 
                formData=${formData} 
                onChange=${setFormData} 
                onSubmit=${handleSubmit} 
              />
            `}

            ${step === 2 && html`
              <${PaymentMethodSection} 
                formData=${formData} 
                onChange=${setFormData} 
                onNext=${() => setStep(3)} 
              />
            `}

            ${step === 3 && html`
              <${CheckoutOrderSection} 
                formData=${formData} 
                onSubmit=${handleSubmit} 
              />
            `}
          </div>

          <${OrderSummarySection} 
            cartItems=${cartItems} 
            subtotal=${subtotal} 
          />
        </div>
      </div>
    </${CustomerCheckoutLayout}>
  `;
}