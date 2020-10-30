import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Stripe from 'stripe';

import ReactImageZoom from 'react-image-zoom';

import CheckoutButton from '../components/CheckoutButton';
import { FiArrowLeft } from 'react-icons/fi';

interface Props {
  sku: Stripe.Sku;
}

export const getStaticPaths: GetStaticPaths = async ( ) => {
  const stripe = new Stripe(process.env.SECRET_KEY, {
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
  const stripe = new Stripe(process.env.SECRET_KEY, {
    apiVersion: '2020-08-27',
  }); 

  const { skuId } = params;

  const sku = await stripe.skus.retrieve(skuId as string);

  return {
    props: {
      sku,
    },
    revalidate: 20,
  }
  
}

const Product: React.FC<Props> = ( { sku } ) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <span>Loading products..</span>
  }

  return (
    <>
    <Link href='/products'>
      <FiArrowLeft size={30} />
    </Link>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          width: '900px',
          maxWidth: '900px',
          margin: '50px auto',

        }}
        key={sku.id}
        >
        
        {sku.image && (
          <ReactImageZoom img={sku.image}
          width={600} 
          height={600}
          zoomHeight={500}
          zoomWidth={500}
          zoomStyle='
            background: white;
            border: 2px solid black;
            border-radius: 10px;
            box-shadow: 0px 0px 20px rgba(0,0,0,0.3);
            '
           />
        )}

       <div
          style={{
            maxHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginLeft: '20px',
          }}
       >
          <h1
            style={{
              fontSize: '60px',
              lineHeight: '50px',
              margin: '0',
            }}
          >{sku.attributes.name}</h1>
          <span>{sku.attributes.description}</span>

          <h2
            style={{
              fontSize: '40px',
              margin: '50px 0px',
            }}
          >{Number(sku.price / 100)} {sku.currency.toUpperCase()}</h2>

          <CheckoutButton skuId={sku.id} itemName={sku.attributes.name} />
       </div>

      </div>
      
    </>
  );
}


export default Product;