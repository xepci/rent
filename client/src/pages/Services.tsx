import { Car, Plane, Users, Clock, MapPin, Shield } from "lucide-react";

const services = [
  { icon: Car, title: "Short-Term Rental", desc: "Daily and weekly rentals with competitive pricing. Perfect for quick trips and city exploration." },
  { icon: Clock, title: "Long-Term Rental", desc: "Monthly rental plans with special discounted rates. Ideal for extended stays in Kosovo." },
  { icon: Plane, title: "Airport Transfers", desc: "Pickup and drop-off at Pristina International Airport. Start your trip hassle-free." },
  { icon: Users, title: "Group Transport", desc: "Spacious vehicles for groups up to 8 passengers. Perfect for tours and family trips." },
  { icon: MapPin, title: "One-Way Rental", desc: "Pick up in one location and drop off at another. Flexible routing across Kosovo." },
  { icon: Shield, title: "Full Insurance", desc: "Comprehensive insurance included with every rental. Drive with complete peace of mind." },
];

export default function Services() {
  return (
    <>
      <section className="hero-gradient py-16">
        <div className="container text-center text-primary-foreground">
          <h1 className="font-display text-4xl font-bold">Our Services</h1>
          <p className="text-primary-foreground/70 mt-2">Everything you need for a perfect rental experience</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <s.icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
