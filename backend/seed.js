import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const barbero = await prisma.barber.upsert({
    where: { id: 101 },
    update: {},
    create: {
      id: 101,
      name: "David"
    }
  });

  const servicio = await prisma.service.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Corte de Cabello",
      price: 15.0,
      duration: 30
    }
  });

  console.log("✅ Datos de prueba listos:");
  console.log("- Barbero:", barbero.name);
  console.log("- Servicio:", servicio.name);
}

main()
  .catch((e) => console.error("❌ Error en seed:", e))
  .finally(async () => await prisma.$disconnect());