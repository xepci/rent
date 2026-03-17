export interface Booking {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  totalPrice: number;
  notes: string;
  createdAt: string;
}

export const bookings: Booking[] = [
  {
    id: "BK-001",
    carId: "vw-golf",
    carName: "VW Golf",
    customerName: "Arben Krasniqi",
    customerEmail: "arben@email.com",
    customerPhone: "+383 44 111 222",
    pickupDate: "2026-03-15",
    dropoffDate: "2026-03-18",
    pickupLocation: "Istog Office",
    dropoffLocation: "Istog Office",
    status: "confirmed",
    totalPrice: 105,
    notes: "Early morning pickup requested",
    createdAt: "2026-03-10",
  },
  {
    id: "BK-002",
    carId: "bmw-3-series",
    carName: "BMW 3 Series",
    customerName: "Liridona Berisha",
    customerEmail: "liridona@email.com",
    customerPhone: "+383 44 333 444",
    pickupDate: "2026-03-14",
    dropoffDate: "2026-03-20",
    pickupLocation: "Pristina Airport",
    dropoffLocation: "Istog Office",
    status: "active",
    totalPrice: 450,
    notes: "VIP client - airport transfer included",
    createdAt: "2026-03-08",
  },
  {
    id: "BK-003",
    carId: "skoda-octavia",
    carName: "Skoda Octavia",
    customerName: "Marco Rossi",
    customerEmail: "marco.r@email.com",
    customerPhone: "+39 333 555 666",
    pickupDate: "2026-03-20",
    dropoffDate: "2026-03-25",
    pickupLocation: "Istog Office",
    dropoffLocation: "Pristina Airport",
    status: "pending",
    totalPrice: 225,
    notes: "Tourist from Italy, needs GPS",
    createdAt: "2026-03-12",
  },
  {
    id: "BK-004",
    carId: "audi-q5",
    carName: "Audi Q5",
    customerName: "Fatmir Hoxha",
    customerEmail: "fatmir.h@email.com",
    customerPhone: "+383 45 777 888",
    pickupDate: "2026-03-10",
    dropoffDate: "2026-03-13",
    pickupLocation: "Istog Office",
    dropoffLocation: "Istog Office",
    status: "completed",
    totalPrice: 255,
    notes: "",
    createdAt: "2026-03-05",
  },
  {
    id: "BK-005",
    carId: "vw-touran",
    carName: "VW Touran",
    customerName: "Elena Gashi",
    customerEmail: "elena.g@email.com",
    customerPhone: "+383 44 999 000",
    pickupDate: "2026-03-22",
    dropoffDate: "2026-03-28",
    pickupLocation: "Peja",
    dropoffLocation: "Istog Office",
    status: "confirmed",
    totalPrice: 330,
    notes: "Family trip, needs child seat",
    createdAt: "2026-03-11",
  },
  {
    id: "BK-006",
    carId: "mercedes-v-class",
    carName: "Mercedes V-Class",
    customerName: "Thomas Mueller",
    customerEmail: "thomas@email.de",
    customerPhone: "+49 170 123 456",
    pickupDate: "2026-03-25",
    dropoffDate: "2026-03-30",
    pickupLocation: "Pristina Airport",
    dropoffLocation: "Pristina Airport",
    status: "pending",
    totalPrice: 600,
    notes: "Group of 7, sightseeing tour",
    createdAt: "2026-03-13",
  },
];
