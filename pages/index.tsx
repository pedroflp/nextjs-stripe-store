import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../config/stripe';


interface Props {
  products: Stripe.Product[],
  prices: Stripe.Price[],
}


export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  }); 

  const products = await stripe.products.list();
  const prices = await stripe.prices.list();

  return {
    props: {
      products: products.data,
      prices: prices.data,
    }
  }
}

const HomePage: React.FC<Props> = ( { products, prices } ) => {
  return (
    <>
    <h1>Next Stripe Store</h1>

    <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
    {products.map((prod) => (
        <div
          key={prod.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
            border: '1px solid black',
            width: '300px',
            maxWidth: '300px',
            margin: '10px',
          }}
        >
          
          {prod.images && (
            <img
              src={prod.images[0]}
              style={{
                width: '100px',
              }}
            />
          )}

          <h1>{prod.name}</h1>
          <span>{prod.description}</span>

        {prices.map((prices) => (
          <h2>R$ {Number(prices.unit_amount).toFixed(2)}</h2>
        ))}
          <Link href={`/${prod.id}`}>Buy</Link>

        </div>
      ))}
    </div>

    </>
  )
}

export default HomePage;
