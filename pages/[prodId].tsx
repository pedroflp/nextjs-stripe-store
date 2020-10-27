import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../config/stripe';
import CheckoutButton from '../components/CheckoutButton';

interface Props {
  prod: Stripe.Product;
  price: Stripe.Price;
}


export const getStaticPaths: GetStaticPaths = async ( ) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  }); 

  const products = await stripe.products.list();
  const prices = await stripe.prices.list();

  let paths = [];

  const paths1 = products.data.map((prod) => ({
    params: {
      prodId: 0,
    },
  }));

  const paths2 = prices.data.map((price) => ({
    params: {
      priceId: 0,
    },
  }));

  paths.push(paths1, paths2)

  return {
    paths,
    fallback: false,
  }
}


export const getStaticProps: GetStaticProps = async ( { params } ) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  }); 

  const { prodId, priceId } = params;

  const prod = await stripe.products.retrieve(prodId as string);
  const price = await stripe.prices.retrieve(priceId as string);

  return {
    props: {
      prod,
      price,
    },
  }
  
}

const prod: React.FC<Props> = ( { prod, price } ) => {
  return (
    <>

      <div
        className='product-card'
        key={prod.id}>
        
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

        {prod.metadata.Tamanho && (
          <h3>Tamanhos: <strong>{prod.metadata.Tamanho}</strong></h3>
        )}
        
        {prod.metadata.Cor && (
         <h4>Cor: {prod.metadata.Cor}</h4>
        )}

        <h2>R$ {Number(price.unit_amount).toFixed(2)}</h2>

        <CheckoutButton priceId={prod.id} />

        <br/>
        <br/>

        <Link href='/'>Go back</Link>

      </div>
      
    </>
  );
}


export default prod;