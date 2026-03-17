import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Clock,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/CarCard";
import { getCars } from "@/api/carApi";
import type { Car } from "@/types/car";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Shield,
    title: "Fully Insured",
    desc: "All vehicles come with comprehensive insurance coverage.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock customer support for your peace of mind.",
  },
  {
    icon: MapPin,
    title: "Flexible Pickup",
    desc: "Multiple pickup and drop-off locations across Kosovo.",
  },
  {
    icon: Star,
    title: "Premium Fleet",
    desc: "Well-maintained, modern vehicles for every need.",
  },
];

export default function Index() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoadingCars(true);
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Failed to load cars:", error);
      } finally {
        setLoadingCars(false);
      }
    };

    loadCars();
  }, []);

  const featured = useMemo(() => {
    return cars.filter((c) => c.available).slice(0, 6);
  }, [cars]);

  useEffect(() => {
    if (featured.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featured.length]);

  useEffect(() => {
    if (currentIndex > featured.length - 1) {
      setCurrentIndex(0);
    }
  }, [featured.length, currentIndex]);

  const goPrev = () => {
    if (featured.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const goNext = () => {
    if (featured.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      goNext();
    } else if (distance < -50) {
      goPrev();
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="relative z-10 container text-center text-primary-foreground py-20">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Premium Car Rental
            <br />
            in Kosovo
          </h1>
          <p
            className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Explore Kosovo with confidence. Quality vehicles, competitive prices,
            and exceptional service from Istog.
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-secondary-foreground font-semibold"
            >
              <Link to="/fleet">Book Your Car</Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-transparent border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card rounded-lg p-6 text-center border"
              >
                <f.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-display font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Carousel */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground mt-2">
              Choose from our latest vehicles added through the admin panel
            </p>
          </div>

          {loadingCars ? (
            <div className="text-center py-10 text-muted-foreground">
              Loading vehicles...
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No vehicles available yet.
            </div>
          ) : (
            <div className="relative max-w-4xl mx-auto">
              <div
                className="overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {featured.map((car) => (
                    <div key={car.id} className="w-full shrink-0 px-4">
                      <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                        <CarCard car={car} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {featured.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 rounded-full border bg-background/90 p-2 shadow hover:bg-background z-10"
                    aria-label="Previous vehicle"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={goNext}
                    className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 rounded-full border bg-background/90 p-2 shadow hover:bg-background z-10"
                    aria-label="Next vehicle"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {featured.length > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  {featured.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentIndex === index
                          ? "w-8 bg-primary"
                          : "w-2.5 bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/fleet">View All Vehicles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16">
        <div className="container text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">
            Book your vehicle today and explore everything Kosovo has to offer
            with Xepci Rent.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-secondary-foreground font-semibold"
          >
            <Link to="/fleet">Browse Our Fleet</Link>
          </Button>
        </div>
      </section>
    </>
  );
}