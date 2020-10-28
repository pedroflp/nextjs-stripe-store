import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import stripeConfig from '../config/stripe';

const stripePromisse = loadStripe(stripeConfig.publicKey);

interface Props {
  skuId: string;
}

const CheckoutButton: React.FC<Props> = ( { skuId } ) => {
  console.log(skuId);
  async function handleClick() {
    const stripe = await stripePromisse;

    const { error } = await stripe.redirectToCheckout({
      items: [{
        sku: skuId,
        quantity: 1,
      }],
      successUrl: 'https://localhost:3000/success',
      cancelUrl: 'https://localhost:3000/cancel',
    });
    if (error){
      console.log(error);
    }
  }
  return (
    <button role='link' onClick={handleClick}>
      Buy
    </button>
  );
}

export default CheckoutButton;