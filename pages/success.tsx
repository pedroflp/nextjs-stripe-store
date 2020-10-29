import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  skuId: string;
}

const Cancel: React.FC<Props> = () => {
  const { query: { itemName, skuId } } = useRouter();
  
  return (
    <>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      margin: '50px auto',
      padding: '20px 30px',
      background: '#7dffa0',
      border: '1px solid #00b00f',
      borderRadius: '5px',
      maxWidth: '700px',
    }}
    >
      <h1 style={{
        marginTop: '10px',
        marginBottom: '20px',
      }}>Sua compra foi Concluída!</h1>

      <span>A compra do produto <strong>{itemName}</strong> foi concluída com sucesso! Obrigado pela preferência.</span>
      
      <h2 style={{
        fontSize: '11px',
        fontStyle: 'italic',
        marginTop: '20px',
      }}
      >O id do produto que você é [{skuId}]</h2>
    </div>

    <Link href='/'>Back to home</Link>

    </>
  )
}

export default Cancel;