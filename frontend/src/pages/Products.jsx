import React from 'react';

const Products = ({ cart, addToCart, removeFromCart }) => {
  const productsData = [
    { 
      id: 1, 
      name: "POMADA MATE", 
      price: 15, 
      image: "https://i.pinimg.com/originals/1d/17/10/1d17103b844203f99b9b8dc9833c2130.jpg" 
    },
    { 
      id: 2, 
      name: "ACEITE DE BARBA", 
      price: 12, 
      image: "https://i.pinimg.com/originals/59/6a/81/596a81cc678b9745e11ec32eff78a669.jpg" 
    },
    { 
      id: 3, 
      name: "SHAMPOO PREMIUM", 
      price: 18, 
      image: "https://i.pinimg.com/originals/37/a7/27/37a727a46e6611784eacbfef4c367979.jpg" 
    },
    { 
      id: 4, 
      name: "PEINE DE MADERA", 
      price: 8, 
      image: "https://i.pinimg.com/originals/51/97/25/5197251b2da50960218397f8b3543d1d.jpg" 
    },
    { 
      id: 5, 
      name: "CERA BRILLANTE", 
      price: 14, 
      image: "https://i.pinimg.com/originals/e3/49/8e/e3498eae47583a25370aefeb2762c6c2.jpg" 
    },
    { 
      id: 6, 
      name: "AFTER SHAVE", 
      price: 16, 
      image: "https://i.pinimg.com/originals/2d/9d/69/2d9d696cf3671b6f24d5634262f498c3.jpg" 
    },
    { 
      id: 7, 
      name: "CEPILLO BARBA", 
      price: 10, 
      image: "https://i.pinimg.com/originals/f8/9d/32/f89d32775f00d8da6e3407435537f452.jpg" 
    },
    { 
      id: 8, 
      name: "KIT LIMPIEZA", 
      price: 45, 
      image: "https://i.pinimg.com/originals/ab/b4/a9/abb4a994368da7b3cc0b00c3b06438d2.jpg" 
    },
  ];

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = () => {
    if (cart.length === 0) return;
    const message = `¡Hola! Me gustaría comprar:\n${cart.map(i => `- ${i.name} ($${i.price})`).join('\n')}\n\nTotal: $${total.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/5071234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>EXCLUSIVE <span style={{ color: '#D4AF37' }}>PRODUCTS</span></h1>
        <div style={styles.goldDivider}></div>
      </header>

      {cart.length > 0 && (
        <div style={styles.topCheckoutBar}>
          <div style={styles.tagsContainer}>
            {cart.map((item) => (
              <div key={item.cartId} style={styles.productTag}>
                {item.name} 
                <span onClick={() => removeFromCart(item.cartId)} style={styles.removeX}>✕</span>
              </div>
            ))}
          </div>
          <div style={styles.checkoutFooter}>
            <p style={styles.totalLabel}>TOTAL: <span style={{color: '#D4AF37'}}>${total.toFixed(2)}</span></p>
            <button onClick={handlePayment} style={styles.payButton}>PAGAR</button>
          </div>
        </div>
      )}

      <div style={styles.productsGrid}>
        {productsData.map(product => (
          <div key={product.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={product.image} alt={product.name} style={styles.productImg} />
            </div>
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} style={styles.addBtn}>
              AÑADIR AL CARRITO
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// TUS ESTILOS ORIGINALES (Intocables)
const styles = {
  pageWrapper: { backgroundColor: '#0C0C0F', minHeight: '100vh', color: '#fff', padding: '20px 15px 80px 15px', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' },
  header: { textAlign: 'center', paddingBottom: '20px', width: '100%' },
  title: { fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', fontWeight: '900', letterSpacing: '4px', margin: 0 },
  goldDivider: { backgroundColor: '#D4AF37', height: '3px', width: '40px', margin: '12px auto' },
  topCheckoutBar: { position: 'sticky', top: '10px', backgroundColor: '#16161a', border: '1px solid #D4AF37', padding: '15px', zIndex: 1000, margin: '0 auto 30px auto', width: '100%', maxWidth: '1160px', boxSizing: 'border-box' },
  tagsContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px', maxHeight: '100px', overflowY: 'auto' },
  productTag: { backgroundColor: '#252525', color: '#fff', padding: '6px 12px', fontSize: '0.65rem', border: '1px solid #333', display: 'flex', alignItems: 'center', gap: '10px' },
  removeX: { color: '#D4AF37', cursor: 'pointer', fontWeight: 'bold' },
  checkoutFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' },
  totalLabel: { fontSize: '1rem', margin: 0, fontWeight: '900' },
  payButton: { backgroundColor: '#D4AF37', color: '#000', padding: '10px 20px', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '0.8rem' },
  productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' },
  card: { backgroundColor: '#111114', border: '1px solid #222', padding: '20px', textAlign: 'center', boxSizing: 'border-box' },
  imageContainer: { width: '100%', height: '200px', marginBottom: '15px', overflow: 'hidden' },
  productImg: { width: '100%', height: '100%', objectFit: 'contain', borderBottom: '1px solid #1a1a1d' }, 
  productName: { fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' },
  productPrice: { color: '#D4AF37', fontWeight: '800', marginBottom: '20px' },
  addBtn: { backgroundColor: 'transparent', color: '#fff', border: '1px solid #444', padding: '12px', cursor: 'pointer', width: '100%' }
};

export default Products;