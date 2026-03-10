import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

app.use(express.json());

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

//RUTA PÚBLICA 
app.get('/', (req, res) => {
  res.send('¡Bienvenido a BarberOS API! Esta ruta es pública.');
});

//RUTA PROTEGIDA 
app.get('/barberos', protegerRuta, async (req, res) => {
  try {
    const barberos = await prisma.barber.findMany(); 
    res.json(barberos);
  } catch (error) {
    res.status(500).json({ error: "Error de DB" });
  }
});

app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Llave cargada: ${process.env.CLERK_SECRET_KEY ? "SÍ " : "NO "}`);
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});