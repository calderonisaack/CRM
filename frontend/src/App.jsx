import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Products from './pages/Products';

// 1. IMPORTAMOS TU NUEVA PÁGINA DE ADMIN
import Admin from './pages/Admin'; 

// --- NUEVAS IMPORTACIONES DE CLERK ---
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const uniqueItem = { ...product, cartId: Date.now() + Math.random() };
    setCart([...cart, uniqueItem]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0C0C0F', color: 'white' }}>
        
        {/* Contenedor del botón de perfil/login */}
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end', background: '#1a1a1e' }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button style={{ background: '#D4AF37', color: 'black', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                ACCESO DUEÑO
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {/* UserButton muestra tu foto y permite cerrar sesión */}
            <UserButton showName />
          </SignedIn>
        </div>

        <Navbar cartCount={cart.length} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservar" element={<Booking />} />
            <Route 
              path="/productos" 
              element={<Products cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} 
            />
            
            {/* 2. AGREGAMOS LA RUTA DEL PANEL DE CONTROL */}
            <Route path="/admin" element={<Admin />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;