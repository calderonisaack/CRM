export const SERVICES = [
  { id: 1, name: "Corte de Cabello", price: 8 },
  { id: 2, name: "Barba", price: 3 },
  { id: 3, name: "Corte + Barba", price: 10 }
];

export const BARBERS = [
  { id: 101, name: "David" },
  { id: 102, name: "Adonis" }
];


export const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00"];
export const PRODUCTS = [
  { id: 1, name: "Cera Mate Premium", price: 18, category: "Peinado", description: "Fijación fuerte, sin brillo." },
  { id: 2, name: "Aceite de Eucalipto", price: 25, category: "Barba", description: "Hidratación profunda y brillo." },
  { id: 3, name: "Bálsamo de Crecimiento", price: 30, category: "Barba", description: "Estimula el folículo piloso." },
  { id: 4, name: "After Shave Gold", price: 20, category: "Afeitado", description: "Efecto refrescante con aroma a sándalo." },
  { id: 5, name: "Shampoo Anticaída", price: 22, category: "Cabello", description: "Fortalece desde la raíz." },
  { id: 6, name: "Peine de Madera", price: 12, category: "Accesorios", description: "Hecho a mano, antiestático." },
  { id: 7, name: "Pomada Brillo Intenso", price: 18, category: "Peinado", description: "Look clásico y elegante." },
  { id: 8, name: "Kit de Limpieza Facial", price: 45, category: "Cuidado", description: "Exfoliante y tónico hidratante." },
];
export const APPOINTMENTS_DB = [
  { id: 1, client: "Juan Pérez", phone: "0987654321", service: "Corte de Autor", barber: "Erik", time: "09:00", status: "Confirmado" },
  { id: 2, client: "Andrés G.", phone: "0991234567", service: "Barba", barber: "Alex", time: "10:30", status: "Pendiente" },
  { id: 3, client: "Roberto M.", phone: "0955544332", service: "Combo Imperial", barber: "Erik", time: "11:30", status: "Confirmado" },
  { id: 4, client: "Carlos L.", phone: "0988877665", service: "Corte de Autor", barber: "Alex", time: "14:00", status: "Confirmado" },
];