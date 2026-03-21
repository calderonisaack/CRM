import React, { useState } from 'react';
import { SERVICES, BARBERS, TIME_SLOTS } from '../data/services';
import './Booking.css';

const Booking = () => {
  const [appointment, setAppointment] = useState({ serviceId: '', barberId: '', date: '', time: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setAppointment(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleTimeSelect = (slot) => setAppointment(prev => ({ ...prev, time: slot }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Formateamos la fecha correctamente para el servidor
      const isoDateTime = new Date(`${appointment.date}T${appointment.time}:00`).toISOString();

      const response = await fetch('http://localhost:3000/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barberId: appointment.barberId,
          dateTime: isoDateTime,
          clientName: "Cliente Web",
          clientPhone: appointment.phone,
          serviceId: appointment.serviceId
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Error al reservar.');
      }
    } catch (error) {
      setErrorMessage('Sin conexión con el servidor. ¿Olvidaste iniciar el backend?');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="booking-page">
        <div className="booking-card" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#D4AF37' }}>¡CITA CONFIRMADA!</h2>
          <p style={{ color: '#ccc', margin: '20px 0' }}>Te esperamos el {appointment.date} a las {appointment.time}</p>
          <button onClick={() => setIsSubmitted(false)} className="time-slot selected" style={{ width: '100%' }}>NUEVA RESERVA</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1 className="booking-title">RESERVAR</h1>
        {errorMessage && <p style={{ color: '#ff4444', textAlign: 'center' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field-group">
              <label>SERVICIO</label>
              <select name="serviceId" onChange={handleChange} required className="input-field">
                <option value="">Seleccionar...</option>
                {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label>BARBERO</label>
              <select name="barberId" onChange={handleChange} required className="input-field">
                <option value="">Seleccionar...</option>
                {BARBERS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label>FECHA</label>
              <input type="date" name="date" onChange={handleChange} required className="input-field"/>
            </div>
            <div className="field-group">
              <label>WHATSAPP</label>
              <input type="tel" name="phone" placeholder="Ej: 6666-6666" onChange={handleChange} required className="input-field"/>
            </div>
          </div>
          <div className="time-grid">
            {TIME_SLOTS.map(slot => (
              <button key={slot} type="button" onClick={() => handleTimeSelect(slot)} 
                className={`time-slot ${appointment.time === slot ? 'selected' : ''}`}>{slot}</button>
            ))}
          </div>
          <button type="submit" disabled={!appointment.time || isLoading} className="time-slot selected" style={{ width: '100%', marginTop: '20px' }}>
            {isLoading ? "PROCESANDO..." : "CONFIRMAR CITA"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;