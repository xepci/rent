import { Link } from "react-router-dom";
import { Users, Fuel, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Car } from "@/types/car";

export function CarCard({ car }: { car: Car }) {
  return (
    <div className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.imageUrl || "https://via.placeholder.com/600x450?text=No+Image"}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {!car.available && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Currently Unavailable
            </Badge>
          </div>
        )}

        <Badge className="absolute top-3 left-3 bg-card text-card-foreground">
          {car.category}
        </Badge>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">{car.name}</h3>

        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {car.seats}
          </span>

          <span className="flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5" />
            {car.transmission}
          </span>

          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            {car.fuel}
          </span>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-primary">€{car.pricePerDay}</span>
            <span className="text-sm text-muted-foreground"> /day</span>
          </div>

          <Button asChild size="sm" disabled={!car.available}>
            <Link to={`/fleet/${car.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}