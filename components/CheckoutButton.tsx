import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import stripeConfig from '../config/stripe';

const stripePromisse = loadStripe(stripeConfig.publicKey);

interface Props {
  priceId: string;
}

const CheckoutButton: React.FC<Props> = ( { priceId } ) => {
  async function handleClick() {
    const stripe = await stripePromisse;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{price: 'price_1Hgd6pFbEZtWWvbFiD6MVqDA', quantity: 1}],
      mode: 'payment',

      successUrl: 'https://localhost:3000/success',
      cancelUrl: 'https://localhost:3000/cancel',
    });

    if (error){
      console.log(error);
    }
  };
  return (
    <button role='link' onClick={handleClick}>
      Buy
    </button>
  );
}

export default CheckoutButton;