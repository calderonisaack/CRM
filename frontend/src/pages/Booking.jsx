import React, { useState } from 'react';
import { SERVICES, BARBERS, TIME_SLOTS } from '../data/services';
import './Booking.css';

const Booking = () => {
  const [appointment, setAppointment] = useState({ serviceId: '', barberId: '', date: '', time: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setAppointment(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleTimeSelect = (slot) => setAppointment(prev => ({ ...prev, time: slot }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de envío
    setTimeout(() => { 
      setIsLoading(false); 
      setIsSubmitted(true); 
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="booking-page">
        <div className="booking-card" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>¡CITA CONFIRMADA!</h2>
          <p style={{ marginBottom: '30px', color: '#ccc' }}>
            Hemos registrado tu cita. Te contactaremos al {appointment.phone} para confirmar.
          </p>
          <button onClick={() => setIsSubmitted(false)} className="time-slot selected" style={{ width: '100%', padding: '15px' }}>
            NUEVA RESERVA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        <header style={{ marginBottom: '30px' }}>
          <h1 className="booking-title">RESERVAR</h1>
          <div style={{ backgroundColor: '#D4AF37', height: '2px', width: '40px', margin: '10px auto' }}></div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field-group">
              <label className="label-style">SERVICIO</label>
              <select name="serviceId" onChange={handleChange} required className="input-field">
                <option value="">Seleccionar...</option>
                {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name.toUpperCase()}</option>)}
              </select>
            </div>
            
            <div className="field-group">
              <label className="label-style">BARBERO</label>
              <select name="barberId" onChange={handleChange} required className="input-field">
                <option value="">Cualquier profesional</option>
                {BARBERS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label className="label-style">FECHA</label>
              <input type="date" name="date" onChange={handleChange} required className="input-field"/>
            </div>

            <div className="field-group">
              <label className="label-style">TELÉFONO (WHATSAPP)</label>
              <input type="tel" name="phone" placeholder="Ej: +507 6666-6666" onChange={handleChange} required className="input-field"/>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label className="label-style">SELECCIONA UNA HORA</label>
            <div className="time-grid">
              {TIME_SLOTS.map(slot => (
                <button 
                  key={slot} 
                  type="button" 
                  onClick={() => handleTimeSelect(slot)}
                  className={`time-slot ${appointment.time === slot ? 'selected' : ''}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!appointment.time || isLoading} 
            className="time-slot selected" 
            style={{ width: '100%', padding: '18px', fontSize: '1rem' }}
          >
            {isLoading ? "PROCESANDO..." : "CONFIRMAR CITA"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Pequeño estilo inline para etiquetas que no cambian
const labelStyle = {
  fontSize: '0.7rem',
  color: '#D4AF37',
  fontWeight: 'bold',
  letterSpacing: '1px',
  display: 'block',
  marginBottom: '8px'
};

export default Booking;