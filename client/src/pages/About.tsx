import { Shield, Users, Award, Heart } from "lucide-react";

const values = [
  { icon: Shield, title: "Reliability", desc: "Every vehicle is thoroughly inspected and maintained to the highest standards." },
  { icon: Users, title: "Customer First", desc: "We put our customers at the center of everything we do." },
  { icon: Award, title: "Quality", desc: "Only the best vehicles make it into our fleet." },
  { icon: Heart, title: "Local Pride", desc: "Proudly serving Istog and all of Kosovo with passion." },
];

export default function About() {
  return (
    <>
      <section className="hero-gradient py-16">
        <div className="container text-center text-primary-foreground">
          <h1 className="font-display text-4xl font-bold">About Sahitaj Rent</h1>
          <p className="text-primary-foreground/70 mt-2">Your trusted car rental partner in Kosovo</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sahitaj Rent was founded in Istog, Kosovo with a simple mission: to provide reliable, affordable, and premium car rental services to both locals and visitors. We understand that exploring Kosovo's beautiful landscapes, historic sites, and vibrant cities requires a dependable vehicle.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our carefully curated fleet ranges from economical city cars to luxury sedans and spacious family vehicles, ensuring we have the perfect car for every journey. Whether you're here for business, tourism, or a family adventure, Sahitaj Rent has you covered.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Based in Istog with flexible pickup and drop-off options across Kosovo including Pristina Airport, Peja, and Prizren, we make renting a car as convenient as possible.
          </p>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-lg p-6 text-center border">
                <v.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
