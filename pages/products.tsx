import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Stripe from 'stripe';
import styled from 'styled-components';


import { FiArrowLeft } from 'react-icons/fi';

import stripeConfig from '../config/stripe';


interface Props {
  skus: Stripe.Sku[];
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

const Button = styled.a `
  padding: 15px;
  width: 200px;
  background: white;
  border: none;
  border-radius: 50px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 5px;
  cursor: pointer;
  color: black;
  text-decoration: none;
`

const ProductCard: React.FC<Props> = ( { skus } ) => {
  return (
    <>
    <Link href='/'>
    <FiArrowLeft size={30} /> 
    </Link>
    
    <h1
      style={{
        fontSize: '60px',
        margin: '30px auto',
        textAlign: 'center',
      }}
    >Products</h1>

    <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          flexWrap: 'wrap',
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
            border: '1px solid black',
            borderRadius: '5px',
            width: '300px',
            maxWidth: '300px',
            maxHeight: '500px',
            margin: '10px',
            overflow: 'hidden',
          }}
        >
          
          {sku.image && (
            <img
              src={sku.image}
              style={{
                maxWidth: '220px',
                padding: '20px 20px 10px',
              }}
            />
          )}

          <div
            style={{
              background: 'black',
              minWidth: '260px',
              maxWidth: '260px',
              minHeight: '245px',
              maxHeight: '245px',
              padding: '20px',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                margin: '10px 0px 0px',
              }}
            >{sku.attributes.name}</h1>

            <h2
              style={{
                margin: '20px',
              }}
            ><strong>{Number(sku.price / 100)}</strong> {sku.currency.toUpperCase()}</h2>

            <Button href={`/${sku.id}`}>Buy</Button>
          </div>

        </div>
      ))}
    </div>

    </>
  )
}

export default ProductCard;
