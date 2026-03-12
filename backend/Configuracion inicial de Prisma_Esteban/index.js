import 'dotenv/config';
import express from 'express';

// --- NUEVA CONFIGURACIÓN PRISMA 7 ---
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// Armamos el adaptador y se lo entregamos a Prisma
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
// ------------------------------------

import { createClerkClient } from '@clerk/clerk-sdk-node';

const app = express();
const PORT = 3000;

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

app.use(express.json());

// --- MIDDLEWARE DE SEGURIDAD (Dueño de la barbería) ---
const protegerRuta = async (req, res, next) => {
  try {
    const requestState = await clerk.authenticateRequest(req);
    
    if (!requestState.isSignedIn) {
      console.log("Bloqueado: Usuario sin sesión intentó entrar.");
      return res.status(401).json({ error: "No tienes permiso para ver esto." });
    }
    
    req.auth = requestState;
    next();
  } catch (error) {
    console.error("Error en Clerk:", error);
    res.status(401).json({ error: "Sesión inválida" });
  }
};

// --- RUTAS PÚBLICAS (Clientes) ---

app.get('/', (req, res) => {
  res.send('¡Bienvenido a BarberOS API! Esta ruta es pública.');
});

// TU FASE 2: MOTOR DE RESERVAS (Ruta pública para que los clientes agenden)
app.post('/api/reservas', async (req, res) => {
  const { clientName, clientPhone, date, barberId, serviceId } = req.body;

  try {
    // 1. Lógica de bloqueo: Verificar si el barbero ya está ocupado
    const citaExistente = await prisma.appointment.findFirst({
      where: {
        barberId: parseInt(barberId),
        date: new Date(date),
        status: "SCHEDULED",
      },
    });

    if (citaExistente) {
      return res.status(400).json({
        error: "Horario no disponible. Este barbero ya tiene una reserva a esa hora."
      });
    }

    // 2. Crear la reserva si está libre
    const nuevaCita = await prisma.appointment.create({
      data: {
        clientName: clientName,
        clientPhone: clientPhone,
        date: new Date(date),
        barberId: parseInt(barberId),
        serviceId: parseInt(serviceId),
      },
    });

    res.status(201).json({ mensaje: "¡Reserva creada con éxito!", cita: nuevaCita });

  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({ error: "Hubo un error interno al procesar la reserva." });
  }
});

// TU FASE 2: CANCELAR UNA CITA
// Usamos /:id en la URL para saber exactamente qué cita quiere cancelar el dueño
app.patch('/api/reservas/:id/cancelar', async (req, res) => {
  const { id } = req.params; // Extraemos el número de la cita de la URL

  try {
    // Le decimos a Prisma que busque la cita por su ID y actualice su estado
    const citaCancelada = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: { status: "CANCELLED" },
    });

    res.json({ 
      mensaje: "Cita cancelada exitosamente. El horario vuelve a estar disponible.", 
      cita: citaCancelada 
    });

  } catch (error) {
    console.error("Error al cancelar la cita:", error);
    res.status(500).json({ error: "No se pudo cancelar. Verifica que el ID de la cita exista." });
  }
});

// TU FASE 2: CONSULTAR HORARIOS OCUPADOS (Para el Frontend)
app.get('/api/reservas/ocupadas', async (req, res) => {
  // 1. Extraemos los datos de la URL (Query Params)
  const { barberId, fecha } = req.query; 

  if (!barberId || !fecha) {
    return res.status(400).json({ error: "Faltan datos: envía barberId y fecha (YYYY-MM-DD)." });
  }

  try {
    // 2. Definimos el inicio y fin de ese día para buscar en la base de datos
    const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
    const finDia = new Date(`${fecha}T23:59:59.999Z`);

    // 3. Prisma busca todas las citas programadas de ese barbero en ese día
    const citas = await prisma.appointment.findMany({
      where: {
        barberId: parseInt(barberId),
        status: "SCHEDULED", // Solo nos importan las que están activas
        date: {
          gte: inicioDia, // gte = Greater than or equal (Desde el inicio del día)
          lte: finDia,    // lte = Less than or equal (Hasta el final del día)
        }
      },
      select: {
        date: true // Solo pedimos la fecha/hora, no necesitamos el nombre ni el teléfono aquí
      }
    });

    // 4. Limpiamos los datos para enviarle al frontend un arreglo simple de horas
    const horasOcupadas = citas.map(cita => cita.date);

    res.json({ ocupadas: horasOcupadas });

  } catch (error) {
    console.error("Error al buscar disponibilidad:", error);
    res.status(500).json({ error: "Hubo un error al consultar los horarios." });
  }
});

// --- RUTAS PROTEGIDAS (Solo el dueño) ---

app.get('/barberos', protegerRuta, async (req, res) => {
  try {
    const barberos = await prisma.barber.findMany(); 
    res.json(barberos);
  } catch (error) {
    res.status(500).json({ error: "Error de DB" });
  }
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Llave cargada: ${process.env.CLERK_SECRET_KEY ? "SÍ " : "NO "}`);
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});
