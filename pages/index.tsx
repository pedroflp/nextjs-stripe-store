import React from 'react';
import styled from 'styled-components';
import Alert from '../components/Alert';

const Button = styled.a `
  padding: 5px;
  text-transform: uppercase;
  letter-spacing: 5px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  border-bottom: 1px solid black;
`

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
                fontSize: '20px',
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

        <Button href='/products'>List Products</Button>
      </div>

      <Alert />

    </>
  )
}

export default HomePage;