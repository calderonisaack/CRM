import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // 1. IMPORTANTE: El guardia para que React conecte

// --- CONFIGURACIÓN PRISMA 7 ---
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
// ------------------------------------

import { createClerkClient } from '@clerk/clerk-sdk-node';

const app = express();
const PORT = 3000;

// 2. ACTIVAMOS EL PERMISO PARA TU FRONTEND (Elimina el error de "blocked by CORS")
app.use(cors({
  origin: 'http://localhost:5173', // Solo permite peticiones de tu React
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// --- MIDDLEWARE DE SEGURIDAD (Solo para Kenneth / Dueño) ---
const protegerRuta = async (req, res, next) => {
  try {
    const requestState = await clerk.authenticateRequest(req);
    
    if (!requestState.isSignedIn) {
      console.log("Acceso bloqueado: Usuario sin sesión activa.");
      return res.status(401).json({ error: "No tienes permiso para ver esto." });
    }
    
    req.auth = requestState;
    next();
  } catch (error) {
    console.error("Error en Clerk:", error);
    res.status(401).json({ error: "Sesión inválida" });
  }
};

// --- RUTAS PÚBLICAS (Para Clientes) ---

app.get('/', (req, res) => {
  res.send('¡API de Barber Elegant en línea! 💈');
});

// CREAR RESERVA (Desde Booking.jsx)
app.post('/api/reservas', async (req, res) => {
  const { clientName, clientPhone, dateTime, barberId, serviceId } = req.body;

  try {
    // Verificar si el horario ya está ocupado
    const citaExistente = await prisma.appointment.findFirst({
      where: {
        barberId: parseInt(barberId),
        date: new Date(dateTime),
        status: "SCHEDULED",
      },
    });

    if (citaExistente) {
      return res.status(400).json({ error: "Horario no disponible." });
    }

    const nuevaCita = await prisma.appointment.create({
      data: {
        clientName: clientName || "Cliente Web",
        clientPhone: clientPhone,
        date: new Date(dateTime),
        barberId: parseInt(barberId),
        serviceId: parseInt(serviceId) || 1,
      },
    });

    res.status(201).json({ mensaje: "¡Reserva exitosa!", cita: nuevaCita });
  } catch (error) {
    console.error("Error al crear cita:", error);
    res.status(500).json({ error: "Error interno al procesar reserva." });
  }
});

// CONSULTAR DISPONIBILIDAD (Para que el calendario sepa qué horas bloquear)
app.get('/api/reservas/ocupadas', async (req, res) => {
  const { barberId, fecha } = req.query; 

  if (!barberId || !fecha) return res.status(400).json({ error: "Faltan datos" });

  try {
    const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
    const finDia = new Date(`${fecha}T23:59:59.999Z`);

    const citas = await prisma.appointment.findMany({
      where: {
        barberId: parseInt(barberId),
        status: "SCHEDULED",
        date: { gte: inicioDia, lte: finDia }
      },
      select: { date: true }
    });

    res.json({ ocupadas: citas.map(c => c.date) });
  } catch (error) {
    res.status(500).json({ error: "Error en DB" });
  }
});

// --- RUTAS SEMI-PROTEGIDAS (Barberos para el select) ---
app.get('/barberos', async (req, res) => {
  try {
    const barberos = await prisma.barber.findMany(); 
    res.json(barberos);
  } catch (error) {
    res.status(500).json({ error: "Error de DB" });
  }
});

// --- RUTAS PROTEGIDAS (Solo Kenneth / Dueño) ---

app.get('/api/inventario', protegerRuta, async (req, res) => {
  try {
    const productos = await prisma.product.findMany();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar inventario" });
  }
});

app.post('/api/ventas', protegerRuta, async (req, res) => {
  const { productId, price } = req.body;
  try {
    const producto = await prisma.product.findUnique({ where: { id: parseInt(productId) } });
    if (!producto || producto.stock <= 0) return res.status(400).json({ error: "Sin stock." });

    const nuevaVenta = await prisma.sale.create({
      data: {
        productId: parseInt(productId),
        quantity: 1,
        totalPrice: parseFloat(price),
      }
    });

    const productoActualizado = await prisma.product.update({
      where: { id: parseInt(productId) },
      data: { stock: { decrement: 1 } }
    });

    res.status(201).json({ mensaje: "Venta registrada", stockRestante: productoActualizado.stock });
  } catch (error) {
    res.status(500).json({ error: "Error en la venta" });
  }
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`✅ Servidor: http://localhost:${PORT}`);
  console.log(`✅ CORS: ACTIVADO (React puede conectar)`);
  console.log(`-----------------------------------------`);
});