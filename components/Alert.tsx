import { exec } from 'child_process';
import React from 'react';

function Alert(){
  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        bottom: '0',
        color: 'white',
        background: 'black',
        padding: '20px',
        marginLeft: '-10px',
      }}
    >
      <span>This website is a prototip and it is been in development</span>
    </div>
  )
}

export default Alert;