import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../config/stripe';


interface Props {
  skus: Stripe.Sku[],
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  }); 

  const skus = await stripe.skus.list();

  return {
    props: {
      skus: skus.data,
    }
  }
}

const HomePage: React.FC<Props> = ( { skus } ) => {
  return (
    <>
    <h1>Next Stripe Store</h1>

    <div className='product-section-list'>

    {skus.map((sku) => (
        <div
          className='product-card'
          key={sku.id}
        >
          
          {sku.image && (
            <img
              src={sku.image}
              style={{
                width: '200px',
              }}
            />
          )}

          <h1>{sku.attributes.name}</h1>

          <h2>{Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}</h2>

          <Link href={`/${sku.id}`}>Buy</Link>

        </div>
      ))}
    </div>

    </>
  )
}

export default HomePage;
