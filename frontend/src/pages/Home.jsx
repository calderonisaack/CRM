import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { icon: '✂️', title: 'CORTE DE CABELLO', desc: 'Clásico, moderno o tendencia. Incluye lavado y asesoría.' },
    { icon: '🪒', title: 'AFEITADO CLÁSICO', desc: 'Toalla caliente, navaja libre y bálsamos premium.' },
    { icon: '💆', title: 'TRATAMIENTO', desc: 'Cuidado capilar y facial para el hombre moderno.' }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div style={{ maxWidth: '800px' }}>
          <h1 className="hero-title">
            EL <span style={{ color: '#D4AF37' }}>ESTILO</span> <br />
            NO SE DISCUTE
          </h1>
          <div className="gold-divider"></div>
          <p style={{ color: '#ccc', marginBottom: '30px', fontSize: '1rem' }}>
            BARBERÍA DE AUTOR PARA EL HOMBRE MODERNO
          </p>
          <button onClick={() => navigate('/reservar')} className="cta-button">
            RESERVAR MI CITA
          </button>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', letterSpacing: '3px' }}>NUESTROS SERVICIOS</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{s.icon}</div>
              <h3 style={{ color: '#D4AF37', marginBottom: '15px' }}>{s.title}</h3>
              <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 20px', backgroundColor: '#0a0a0a' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px', 
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto 50px auto'
        }} className="info-grid">
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '0.8rem', letterSpacing: '2px' }}>UBICACIÓN</h4>
            <p>Carapungo </p>
          </div>
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '0.8rem', letterSpacing: '2px' }}>HORARIOS</h4>
            <p>Lunes a Sábado: 9AM-8PM | Domingo: 10AM-4PM</p>
          </div>
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '0.8rem', letterSpacing: '2px' }}>CONTACTO</h4>
            <p>+593 0987765444</p>
          </div>
        </div>
        
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d-79.5!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDc5wrAzMCcwMC4wIlc!5e0!3m2!1ses!2spa!4v1620000000000!5m2!1ses!2spa" 
            style={{ width: '100%', height: '100%', border: 'none' }} 
            allowFullScreen="" 
            loading="lazy"
            title="Mapa de la Barbería"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Home;