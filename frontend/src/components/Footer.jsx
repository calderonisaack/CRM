// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '40px 20px',
      backgroundColor: '#000',
      textAlign: 'center',
      borderTop: '1px solid #222',
      marginTop: 'auto'
    }}>
      <div style={{
        backgroundColor: '#D4AF37',
        height: '2px',
        width: '40px',
        margin: '0 auto 20px auto'
      }}></div>
      <p style={{
        color: '#fff',
        fontSize: '0.8rem',
        letterSpacing: '3px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: 0
      }}>© 2026 BARBER SHOP PREMIUM</p>
      <p style={{ color: '#444', fontSize: '0.6rem', marginTop: '5px', letterSpacing: '1px' }}>
        EL ESTILO ES LEY
      </p>
    </footer>
  );
};

export default Footer;