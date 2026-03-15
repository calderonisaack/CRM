import React, { useState } from 'react';
import { APPOINTMENTS_DB } from '../data/services';

const Admin = ({ onLogout }) => {
  const [appointments, setAppointments] = useState(APPOINTMENTS_DB);

  const cancelAppointment = (id) => {
    if(window.confirm("¿Seguro que deseas cancelar esta cita?")) {
      setAppointments(appointments.filter(app => app.id !== id));
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* HEADER CON BOTÓN DE LOGOUT */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>PANEL DE <span style={{ color: '#D4AF37' }}>CONTROL</span></h1>
            <p style={styles.subtitle}>Gestión de citas y agenda diaria</p>
          </div>
          <button onClick={onLogout} style={styles.logoutButton}>
            CERRAR SESIÓN
          </button>
        </header>

        {/* STATS RÁPIDAS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>CITAS HOY</span>
            <span style={styles.statNumber}>{appointments.length}</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>INGRESOS ESTIMADOS</span>
            <span style={styles.statNumber}>$145.00</span>
          </div>
          <div style={{...styles.statCard, borderRight: 'none'}}>
            <span style={styles.statLabel}>BARBEROS ACTIVOS</span>
            <span style={styles.statNumber}>2</span>
          </div>
        </div>

        {/* TABLA DE CITAS */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>HORA</th>
                <th style={styles.th}>CLIENTE</th>
                <th style={styles.th}>SERVICIO</th>
                <th style={styles.th}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app.id} style={styles.tableRow}>
                  <td style={{...styles.td, color: '#D4AF37', fontWeight: 'bold'}}>{app.time}</td>
                  <td style={styles.td}>{app.client.toUpperCase()}</td>
                  <td style={styles.td}>{app.service}</td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => cancelAppointment(app.id)}
                      style={styles.cancelButton}
                    >
                      ELIMINAR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { backgroundColor: '#121212', minHeight: '100vh', padding: '40px 20px', color: '#fff' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: { fontSize: '2rem', letterSpacing: '3px', fontWeight: '800', margin: 0 },
  subtitle: { color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' },
  
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#D4AF37',
    border: '1px solid #D4AF37',
    padding: '10px 20px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    backgroundColor: '#1e1e1e',
    border: '1px solid #333',
    marginBottom: '30px',
  },
  statCard: {
    padding: '25px',
    textAlign: 'center',
    borderRight: '1px solid #333',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  statLabel: { fontSize: '0.7rem', color: '#D4AF37', fontWeight: 'bold', letterSpacing: '1px' },
  statNumber: { fontSize: '1.8rem', fontWeight: '800' },

  tableContainer: { backgroundColor: '#1e1e1e', border: '1px solid #333', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' },
  tableHeaderRow: { backgroundColor: '#252525', borderBottom: '2px solid #D4AF37' },
  th: { padding: '15px 20px', fontSize: '0.8rem', color: '#D4AF37', textTransform: 'uppercase' },
  tableRow: { borderBottom: '1px solid #333' },
  td: { padding: '15px 20px', fontSize: '0.9rem', color: '#ccc' },
  cancelButton: {
    backgroundColor: 'transparent',
    color: '#ff4444',
    border: '1px solid #ff4444',
    padding: '5px 10px',
    fontSize: '0.6rem',
    cursor: 'pointer'
  }
};

export default Admin;