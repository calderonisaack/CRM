import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'INICIO', path: '/' },
    { id: 'booking', label: 'RESERVAR', path: '/reservar' },
    { id: 'products', label: 'PRODUCTOS', path: '/productos' },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        {/* LOGO CON ICONO AÑADIDO */}
        <Link to="/" style={styles.logo} onClick={closeMenu}>
          BARBER <span style={{ color: '#D4AF37' }}>ELEGANT</span>
          <span style={styles.logoIcon}>✂️</span>
        </Link>

        <div className="mobile-toggle" style={styles.mobileBtn} onClick={() => setIsOpen(!isOpen)}>
          <div style={{...styles.line, transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'}}></div>
          <div style={{...styles.line, opacity: isOpen ? 0 : 1}}></div>
          <div style={{...styles.line, transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'}}></div>
        </div>

        <div className="nav-menu-desktop" style={styles.menuDesktop}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              style={{
                ...styles.navLink,
                color: location.pathname === item.path ? '#D4AF37' : '#fff',
              }}
            >
              {item.label}
              {item.id === 'products' && cartCount > 0 && (
                <span style={styles.badge}>{cartCount}</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div style={{
        ...styles.mobileMenu,
        maxHeight: isOpen ? '400px' : '0px',
        opacity: isOpen ? 1 : 0,
      }}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={closeMenu}
            style={{
              ...styles.mobileNavLink,
              color: location.pathname === item.path ? '#D4AF37' : '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              {item.label}
              {item.id === 'products' && cartCount > 0 && (
                <span style={styles.badgeMobile}>{cartCount}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-menu-desktop { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-menu-desktop { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

const styles = {
  nav: { backgroundColor: '#000', borderBottom: '1px solid #222', width: '100%', position: 'sticky', top: 0, zIndex: 1100 },
  navContainer: { maxWidth: '1200px', height: '90px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px' },
  
  // ESTILO DEL LOGO ACTUALIZADO
  logo: { 
    fontSize: '1.3rem', 
    fontWeight: '900', 
    letterSpacing: '3px', 
    cursor: 'pointer', 
    color: '#fff', 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px' 
  },
  logoIcon: {
    fontSize: '1.4rem',
    color: '#D4AF37',
    filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))'
  },

  menuDesktop: { display: 'flex', gap: '30px', alignItems: 'center' },
  navLink: { 
    textDecoration: 'none', 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: '0.85rem', 
    letterSpacing: '1px', 
    padding: '10px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px' 
  },
  badge: { backgroundColor: '#D4AF37', color: '#000', borderRadius: '50%', padding: '2px 7px', fontSize: '0.65rem', fontWeight: '900' },
  badgeMobile: { backgroundColor: '#D4AF37', color: '#000', borderRadius: '50%', padding: '5px 12px', fontSize: '0.8rem', fontWeight: '900' },
  mobileBtn: { padding: '15px', display: 'none', flexDirection: 'column', gap: '6px', cursor: 'pointer' },
  line: { width: '28px', height: '2px', backgroundColor: '#D4AF37', transition: '0.3s' },
  mobileMenu: { display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a0a', overflow: 'hidden', transition: 'all 0.4s ease-in-out', width: '100%' },
  mobileNavLink: { textDecoration: 'none', padding: '25px 30px', textAlign: 'left', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', width: '100%', borderBottom: '1px solid #111', display: 'block', boxSizing: 'border-box' }
};

export default Navbar;