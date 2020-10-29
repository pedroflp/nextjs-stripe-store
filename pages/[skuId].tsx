import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../config/stripe';
import CheckoutButton from '../components/CheckoutButton';

interface Props {
  sku: Stripe.Sku;
  prod: Stripe.Product;
}


export const getStaticPaths: GetStaticPaths = async ( ) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  }); 

  const skus = await stripe.skus.list();

  const paths = skus.data.map((sku) => ({
    params: {
      skuId: sku.id,
    },
  }));

  return {
    paths,
    fallback: true,
  }
}


export const getStaticProps: GetStaticProps = async ( { params } ) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  }); 

  const prod = await stripe.products.list();

  const { skuId } = params;

  const sku = await stripe.skus.retrieve(skuId as string);

  return {
    props: {
      sku,
      prod,
    },
    revalidate: 20,
  }
  
}

const Product: React.FC<Props> = ( { prod, sku } ) => {
  return (
    <>

      <div
        className='product-card'
        key={sku.id}
        >
        
        {sku.image && (
          <img
            src={sku.image}
            style={{
              width: '100px',
            }}
           />
        )}

        <h1>{sku.attributes.name}</h1>
        <span>{sku.attributes.description}</span>

        <h2>{Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}</h2>

        <CheckoutButton skuId={sku.id} />

        <br/>
        <br/>

        <Link href='/'>Go back</Link>

      </div>
      
    </>
  );
}


export default Product;