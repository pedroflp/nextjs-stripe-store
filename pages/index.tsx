import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../config/stripe';


interface Props {
  skus: Stripe.Sku[],
  prods: Stripe.Product[],
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

    <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
    {skus.map((sku) => (
        <div
          key={sku.id}
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
          
          {sku.image && (
            <img
              src={sku.image}
              style={{
                width: '100px',
              }}
            />
          )}

          {/* <h1>{sku.name}</h1>
          <span>{sku.description}</span> */}


          <h2>{Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}</h2>

          <Link href={`/${sku.id}`}>Buy</Link>

        </div>
      ))}
    </div>

    </>
  )
}

export default HomePage;
