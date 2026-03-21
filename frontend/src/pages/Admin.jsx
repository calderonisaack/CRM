import React, { useState, useEffect } from 'react';
// 1. Importamos los hooks de seguridad de Clerk
import { useAuth, UserButton } from '@clerk/clerk-react';

const Admin = () => {
  // Estados para manejar los datos reales de la base de datos
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  // 2. Función para traer las citas reales del Backend
  const fetchAppointments = async () => {
    try {
      const token = await getToken();
      // Llamamos a la ruta de reservas de tu backend
      const response = await fetch('http://localhost:3000/api/reservas/ocupadas?barberId=1&fecha=2026-03-20', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      // Guardamos lo que venga de Neon
      setAppointments(data.ocupadas || []);
    } catch (error) {
      console.error("Error conectando con el servidor:", error);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta cuando el dueño inicia sesión
  useEffect(() => {
    if (isSignedIn) {
      fetchAppointments();
    }
  }, [isSignedIn]);

  // 3. Función para cancelar citas en la base de datos real
  const cancelAppointment = async (id) => {
    if(window.confirm("¿Seguro que deseas cancelar esta cita en la base de datos?")) {
      try {
        const token = await getToken();
        const response = await fetch(`http://localhost:3000/api/reservas/${id}/cancelar`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        });

        if(response.ok) {
          alert("Cita cancelada con éxito");
          fetchAppointments(); // Recargamos la lista automáticamente
        }
      } catch (error) {
        alert("No se pudo eliminar la cita.");
      }
    }
  };

  // Si Clerk aún está cargando o no hay sesión, protegemos la página
  if (!isLoaded || !isSignedIn) {
    return (
      <div style={styles.pageWrapper}>
        <h1 style={styles.title}>ACCESO <span style={{ color: '#D4AF37' }}>RESTRINGIDO</span></h1>
        <p style={{color: '#888'}}>Inicia sesión con tu cuenta de dueño para continuar.</p>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* HEADER CON CLERK USER BUTTON */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>PANEL DE <span style={{ color: '#D4AF37' }}>CONTROL</span></h1>
            <p style={styles.subtitle}>Gestión de citas reales desde Neon</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#888', fontSize: '0.7rem', fontWeight: 'bold' }}>DUEÑO ACTIVO</span>
            {/* El botón oficial de Clerk para cerrar sesión */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* STATS DINÁMICAS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>CITAS REGISTRADAS</span>
            <span style={styles.statNumber}>{appointments.length}</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>ESTADO DB</span>
            <span style={{...styles.statNumber, color: '#44ff44', fontSize: '1.2rem'}}>CONECTADO</span>
          </div>
          <div style={{...styles.statCard, borderRight: 'none'}}>
            <span style={styles.statLabel}>BARBEROS EN NEON</span>
            <span style={styles.statNumber}>1</span>
          </div>
        </div>

        {/* TABLA DE CITAS CONECTADA AL BACKEND */}
        <div style={styles.tableContainer}>
          {loading ? (
            <p style={{padding: '40px', textAlign: 'center', color: '#D4AF37'}}>Cargando agenda de Neon...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>HORA REGISTRADA</th>
                  <th style={styles.th}>CLIENTE</th>
                  <th style={styles.th}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? appointments.map((dateStr, index) => {
                  const dateObj = new Date(dateStr);
                  return (
                    <tr key={index} style={styles.tableRow}>
                      <td style={{...styles.td, color: '#D4AF37', fontWeight: 'bold'}}>
                        {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={styles.td}>CLIENTE EXTERNO</td>
                      <td style={styles.td}>
                        <button 
                          onClick={() => cancelAppointment(index)} 
                          style={styles.cancelButton}
                        >
                          ELIMINAR
                        </button>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="3" style={{...styles.td, textAlign: 'center', padding: '30px'}}>
                      No hay citas para esta fecha.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// --- TUS ESTILOS ORIGINALES (Mantenidos al 100%) ---
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