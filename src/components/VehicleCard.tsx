import { Vehicle } from "../types";
import { Gauge, Milestone, ShieldCheck, Zap } from "lucide-react";

interface VehicleCardProps {
  key?: string | number;
  vehicle: Vehicle;
  onSelect: (id: string) => void;
}

export default function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  // Fuel type color badges mapping
  const getFuelBadgeStyles = (fuelType: string) => {
    switch (fuelType) {
      case "Electric":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Hybrid":
        return "bg-blue-50 text-blue-700 border-blue-150";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div 
      id={`vehicle-card-${vehicle.id}`}
      className="group bg-white border border-slate-150 rounded-2xl overflow-hidden hover:border-primary-light/40 transition-all duration-300 flex flex-col shadow-md hover:shadow-2xl hover:-translate-y-1"
    >
      
      {/* High Resolution Image Container */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img 
          src={vehicle.image} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Absolute Badge tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md text-slate-800 font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border border-slate-200 tracking-wider">
            {vehicle.year}
          </span>
          <span className={`backdrop-blur-md font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border tracking-wider ${getFuelBadgeStyles(vehicle.fuelType)}`}>
            {vehicle.fuelType === "Electric" && <Zap className="w-2.5 h-2.5 inline mr-1 text-emerald-600" />}
            {vehicle.fuelType}
          </span>
        </div>

        {/* Absolute Mileage Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-600 font-semibold">
          {vehicle.mileage.toLocaleString()} mi
        </div>
      </div>

      {/* Main card body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title specs */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-450 mb-1">
            <span className="font-semibold uppercase tracking-wider">{vehicle.bodyType}</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Certified
            </span>
          </div>
          <h3 className="font-display font-bold text-lg text-primary group-hover:text-accent transition-colors leading-none">
            {vehicle.make} <span className="text-slate-500 font-medium">{vehicle.model}</span>
          </h3>
          <p className="text-slate-500 text-3xs mt-2 line-clamp-2 leading-relaxed">
            {vehicle.description}
          </p>
        </div>

        {/* Icon specs row */}
        <div className="grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-3 text-3xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="truncate">{vehicle.engine}</span>
          </div>
          <div className="flex items-center gap-2">
            <Milestone className="w-3.5 h-3.5 text-primary-light shrink-0" />
            <span className="truncate">{vehicle.transmission}</span>
          </div>
        </div>

        {/* Pricing Action CTA block */}
        <div className="pt-2 flex items-center justify-between font-sans">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">Guaranteed</span>
            <span className="text-xl font-display font-black text-primary leading-none">
              ${vehicle.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => onSelect(vehicle.id)}
            className="bg-primary hover:bg-accent text-white hover:text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider border-none transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            Details
          </button>
        </div>

      </div>

    </div>
  );
}
