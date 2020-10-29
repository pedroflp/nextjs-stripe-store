import Link from 'next/link';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          width: '50%',
        }}
      >

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              width: '600px',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontSize: '30px',
                fontWeight: '100',
                width: '100px',
                marginBottom: '20px', 
                transform: 'rotate(-90deg)',
              }}
            >
            06 a.m.</span>
            <h1 style={{
              maxWidth: '450px',
              lineHeight: '80px',
              fontSize: '100px',
            }}>Welcome to the <strong>06a.m. T-Shirts</strong>!</h1>
          </div>

        <Link href='/products'>List Products</Link>
      </div>

    </>
  )
}

export default HomePage;