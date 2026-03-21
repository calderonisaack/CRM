import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 

// --- CONFIGURACIÓN PRISMA ---
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
// ------------------------------------

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// --- RUTA DE RESERVAS ---
app.post('/api/reservas', async (req, res) => {
  const { clientName, clientPhone, dateTime, barberId, serviceId } = req.body;
  
  try {
    const nuevaCita = await prisma.appointment.create({
      data: {
        clientName: clientName || "Cliente Web",
        clientPhone: String(clientPhone), // <--- ¡Ahora sí guardará el WhatsApp!
        date: new Date(dateTime), 
        barberId: parseInt(barberId),
        serviceId: parseInt(serviceId) || 1,
        status: "SCHEDULED"
      },
    });
    console.log("✅ Cita guardada correctamente en Neon");
    res.status(201).json({ mensaje: "¡Reserva exitosa!", cita: nuevaCita });
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ error: "No se pudo guardar la cita." });
  }
});

// Ruta para cargar barberos en el select del frontend
app.get('/barberos', async (req, res) => { 
  try {
    const barberos = await prisma.barber.findMany(); 
    res.json(barberos);
  } catch (error) {
    res.status(500).json({ error: "Error conectando a la base de datos" });
  }
});

app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`🚀 SERVIDOR LISTO EN EL PUERTO ${PORT}`);
  console.log(`✅ Base de datos conectada con clientPhone`);
  console.log(`-----------------------------------------`);
});