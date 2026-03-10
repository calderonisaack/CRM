import React from 'react';
import s from './Dashboard.module.css';
import { StatCard } from './StatCard';

export default function Dashboard() {
  return (
    <div className={s.container}>
      {/* Sidebar */}
      <aside className={s.sidebar}>
        <h2 className={s.sidebarTitle}>BarberOS</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ color: '#4a5568', padding: '10px 0' }}>Registro Cliente</li>
            <li style={{ color: '#4a5568', padding: '10px 0' }}>Dashboard</li>
            <li style={{ color: '#4a5568', padding: '10px 0' }}>Agenda</li>
            <li style={{ color: '#4a5568', padding: '10px 0' }}>Clientes</li>
            <li style={{ color: '#4a5568', padding: '10px 0' }}>Servicios</li>
            <li style={{ color: '#4a5568', padding: '10px 0' }}>Productos</li>
          </ul>
        </nav>
      </aside>

      
      <main className={s.mainContent}>
        <header className={s.header}>
          <div>
            <h1 style={{ margin: 0 }}>Buen día, <span style={{ color: '#6ee7b7' }}>David</span></h1>
            <p style={{ color: '#475569', fontSize: '14px' }}>Martes, 3 de marzo 2026</p>
          </div>
          <button className={s.newAppointmentBtn}>+ Nueva Cita</button>
        </header>
        

        <section>

          <div style={{ color: '#475569', border: '1px dashed #1e1e26', padding: '40px', textAlign: 'center', borderRadius: '12px' }}>
           <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <StatCard 
                label="Ingresos Hoy" 
                value="$25" 
                sub="+12% vs ayer" 
                icon="💰" 
                accent="#6EE7B7" 
            />
            <StatCard 
                label="Citas Cerradas Hoy" 
                value="6" 
                sub="Hoy" 
                icon="✂" 
                accent="#93C5FD" 
            />
            <StatCard
            label="Clientes de hoy"
            value="3"
            sub="Esta semana"
            icon="👤"
            accent="#FBBF24"
            />
        </section>
          </div>
          
        </section>
      </main>
    </div>
  );
}