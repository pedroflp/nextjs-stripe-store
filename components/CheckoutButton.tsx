import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import stripeConfig from '../config/stripe';

const stripePromisse = loadStripe(stripeConfig.publicKey);

interface Props {
  skuId: string;
  itemName: string;
}

const CheckoutButton: React.FC<Props> = ( { skuId, itemName } ) => {
  async function handleClick() {
    const stripe = await stripePromisse;

    const { error } = await stripe.redirectToCheckout({
      items: [{
        sku: skuId,
        quantity: 1,
      }],
      successUrl: `http://06am.vercel.app/success?itemName=${itemName}&skuId=${skuId}`,
      cancelUrl: `http://06am.vercel.app/cancel?itemName=${itemName}&skuId=${skuId}`,
    });

    if (error){
      console.log(error);
    }
  }
  return (
    <button
    style={{
      letterSpacing: '5px',
      textTransform: 'uppercase',
      padding: '20px 40px',
      background: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      outline: 'none',
    }}
    role='link' onClick={handleClick}>
      Checkout
    </button>
  );
}

export default CheckoutButton;