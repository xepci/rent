import economyImg from "@/assets/cars/economy-hatchback.jpg";
import midsizeImg from "@/assets/cars/midsize-sedan.jpg";
import premiumImg from "@/assets/cars/premium-sedan.jpg";
import suvImg from "@/assets/cars/suv-crossover.jpg";
import mpvImg from "@/assets/cars/family-mpv.jpg";
import luxuryVanImg from "@/assets/cars/luxury-van.jpg";

export interface Car {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel";
  year: number;
  features: string[];
  description: string;
  available: boolean;
}

export const cars: Car[] = [
  {
    id: "vw-golf",
    name: "VW Golf",
    category: "Economy Hatchback",
    image: economyImg,
    pricePerDay: 35,
    seats: 5,
    transmission: "Manual",
    fuel: "Diesel",
    year: 2023,
    features: ["Air Conditioning", "Bluetooth", "USB Charging", "Parking Sensors"],
    description: "The perfect compact car for city driving and short trips. Fuel-efficient and easy to park, the VW Golf is ideal for solo travelers or couples exploring Kosovo.",
    available: true,
  },
  {
    id: "skoda-octavia",
    name: "Skoda Octavia",
    category: "Mid-Size Sedan",
    image: midsizeImg,
    pricePerDay: 45,
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    year: 2023,
    features: ["Air Conditioning", "Navigation", "Cruise Control", "Leather Seats", "Bluetooth"],
    description: "A spacious and comfortable mid-size sedan perfect for business travel or longer road trips. The Skoda Octavia offers a smooth ride with generous boot space.",
    available: true,
  },
  {
    id: "bmw-3-series",
    name: "BMW 3 Series",
    category: "Premium Sedan",
    image: premiumImg,
    pricePerDay: 75,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    year: 2024,
    features: ["Leather Interior", "Navigation", "Heated Seats", "Parking Camera", "Premium Sound", "Cruise Control"],
    description: "Experience luxury and performance with the BMW 3 Series. Perfect for those who want to travel in style with premium comfort and cutting-edge technology.",
    available: true,
  },
  {
    id: "audi-q5",
    name: "Audi Q5",
    category: "SUV Crossover",
    image: suvImg,
    pricePerDay: 85,
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    year: 2024,
    features: ["Quattro AWD", "Leather Interior", "Panoramic Roof", "Navigation", "Heated Seats", "Parking Camera"],
    description: "The Audi Q5 combines luxury with versatility. All-wheel drive capability makes it perfect for exploring Kosovo's diverse terrain in premium comfort.",
    available: true,
  },
  {
    id: "vw-touran",
    name: "VW Touran",
    category: "Family MPV",
    image: mpvImg,
    pricePerDay: 55,
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    year: 2023,
    features: ["7 Seats", "Air Conditioning", "Navigation", "Parking Sensors", "ISOFIX", "Roof Rails"],
    description: "The ideal family vehicle with 7 seats and plenty of room for luggage. The VW Touran ensures comfortable travel for the whole family across Kosovo.",
    available: true,
  },
  {
    id: "mercedes-v-class",
    name: "Mercedes V-Class",
    category: "Luxury Van",
    image: luxuryVanImg,
    pricePerDay: 120,
    seats: 8,
    transmission: "Automatic",
    fuel: "Diesel",
    year: 2024,
    features: ["8 Seats", "Leather Interior", "Climate Control", "Navigation", "Premium Sound", "Electric Doors"],
    description: "The ultimate group travel vehicle. The Mercedes V-Class offers luxury van comfort for up to 8 passengers, perfect for airport transfers or group excursions.",
    available: false,
  },
];
