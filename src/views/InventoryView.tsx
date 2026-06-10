import { useState, useEffect } from "react";
import { Vehicle, InventoryFilters, PageType } from "../types";
import { VEHICLES } from "../data";
import VehicleCard from "../components/VehicleCard";
import { Grid, List, SlidersHorizontal, ArrowUpDown, RefreshCw, Eye, Landmark, Compass, Trash2 } from "lucide-react";

interface InventoryViewProps {
  onSelectVehicle: (id: string) => void;
  onNavigate: (page: PageType) => void;
  preFilter?: { category: string; value: string } | null;
}

const INITIAL_FILTERS: InventoryFilters = {
  search: "",
  make: "",
  model: "",
  yearMin: 2020,
  yearMax: 2024,
  priceMin: 30000,
  priceMax: 150000,
  mileageMax: 30000,
  bodyType: "",
  fuelType: "",
  transmission: ""
};

export default function InventoryView({ onSelectVehicle, onNavigate, preFilter }: InventoryViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<InventoryFilters>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(VEHICLES);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Track and apply preFilter from home or navbar links
  useEffect(() => {
    if (preFilter) {
      const { category, value } = preFilter;
      // Reset to default then apply preFilter
      setFilters((prev) => {
        const next = { ...INITIAL_FILTERS };
        if (category === "search") {
          next.search = value;
        } else {
          (next as any)[category] = value;
        }
        return next;
      });
      setCurrentPage(1);
    }
  }, [preFilter]);

  // Handle actual filter logic
  useEffect(() => {
    let result = [...VEHICLES];

    // Text search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        v => 
          v.make.toLowerCase().includes(q) || 
          v.model.toLowerCase().includes(q) || 
          v.description.toLowerCase().includes(q)
      );
    }

    // Dropdowns
    if (filters.make) {
      result = result.filter(v => v.make === filters.make);
    }
    if (filters.bodyType) {
      result = result.filter(v => v.bodyType === filters.bodyType);
    }
    if (filters.fuelType) {
      result = result.filter(v => v.fuelType === filters.fuelType);
    }
    if (filters.transmission) {
      result = result.filter(v => v.transmission.toLowerCase().includes(filters.transmission.toLowerCase()));
    }

    // Range fields
    result = result.filter(
      v => 
        v.price >= filters.priceMin && 
        v.price <= filters.priceMax &&
        v.year >= filters.yearMin && 
        v.year <= filters.yearMax &&
        v.mileage <= filters.mileageMax
    );

    // Sorting block
    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "mileage-asc") return a.mileage - b.mileage;
      if (sortBy === "year-desc") return b.year - a.year;
      return 0;
    });

    setFilteredVehicles(result);
    setCurrentPage(1); // Reset to page 1 on active filter changes
  }, [filters, sortBy]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const updateRangeFilter = (field: keyof InventoryFilters, val: number) => {
    setFilters(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleSelectField = (field: keyof InventoryFilters, val: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: val
    }));
  };

  // Pagination calculation
  const totalItems = filteredVehicles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Available makes & attributes for dynamic filters dropdowns
  const availableMakes = Array.from(new Set(VEHICLES.map(v => v.make)));
  const availableBodyTypes = Array.from(new Set(VEHICLES.map(v => v.bodyType)));
  const availableFuels = Array.from(new Set(VEHICLES.map(v => v.fuelType)));
  const availableTransmissions = ["Automatic", "Manual"];

  return (
    <div id="showroom-inventory-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-slate-100 min-h-[85vh]">
      
      {/* Header and Summary stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-900 pb-6 mb-8 gap-4">
        <div>
          <span className="font-mono text-2xs text-[#F39C12] uppercase tracking-widest block mb-2">Curated Showroom</span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            VEHICLE <span className="text-gradient">INVENTORY</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Grid vs List Toggles */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-accent text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
              title="Show as Grid Cards"
              aria-label="Grid view layout"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-accent text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
              title="Show as List Items"
              aria-label="List view layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filtering trigger */}
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
              isFilterPanelOpen ? "bg-primary/20 text-accent border-blue-800/80" : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sorting drop down */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="price-asc">Sticker: Lowest First</option>
              <option value="price-desc">Sticker: Highest First</option>
              <option value="mileage-asc">Mileage: Lowest First</option>
              <option value="year-desc">Year: Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid content with Filtering side rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Advanced Filters Panel */}
        {isFilterPanelOpen && (
          <aside className="lg:col-span-3 bg-slate-950/80 border border-slate-900 rounded-2xl p-6 space-y-6 shrink-0 z-10 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">Advanced Search</h3>
              <button
                onClick={handleResetFilters}
                className="text-slate-500 hover:text-accent font-mono text-[10px] uppercase flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset filters"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Search text input */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium uppercase tracking-wider text-2xs">Text Keyword</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleSelectField("search", e.target.value)}
                  placeholder="e.g. Model S, Plaid..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-600"
                />
              </div>

              {/* Dynamic Make Selector */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium uppercase tracking-wider text-2xs">Manufacturer / Brand</label>
                <select
                  value={filters.make}
                  onChange={(e) => handleSelectField("make", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl text-xs focus:outline-none"
                >
                  <option value="">All Manufacturers</option>
                  {availableMakes.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Body Style Selector */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium uppercase tracking-wider text-2xs">Body Style</label>
                <select
                  value={filters.bodyType}
                  onChange={(e) => handleSelectField("bodyType", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl text-xs focus:outline-none"
                >
                  <option value="">All Styles</option>
                  {availableBodyTypes.map(bt => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Selector */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium uppercase tracking-wider text-2xs">Fuel / Propulsion</label>
                <select
                  value={filters.fuelType}
                  onChange={(e) => handleSelectField("fuelType", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl text-xs focus:outline-none"
                >
                  <option value="">Any Propulsion</option>
                  {availableFuels.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Transmission Selector */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium uppercase tracking-wider text-2xs">Shift System</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => handleSelectField("transmission", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl text-xs focus:outline-none"
                >
                  <option value="">Any System</option>
                  {availableTransmissions.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Sliders range: Price limits */}
              <div className="pt-2 border-t border-slate-900">
                <div className="flex justify-between text-slate-400 mb-1.5 font-medium uppercase tracking-wider text-2xs">
                  <span>Price Cap</span>
                  <span className="text-white font-mono font-bold">${filters.priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="150000"
                  step="5000"
                  value={filters.priceMax}
                  onChange={(e) => updateRangeFilter("priceMax", Number(e.target.value))}
                  className="w-full bg-slate-900 accent-accent cursor-pointer h-1 rounded-lg"
                />
              </div>

              {/* Sliders range: Mileage cap */}
              <div className="pt-2">
                <div className="flex justify-between text-slate-400 mb-1.5 font-medium uppercase tracking-wider text-2xs">
                  <span>Maximum Mileage</span>
                  <span className="text-white font-mono font-bold">{filters.mileageMax.toLocaleString()} mi</span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="30000"
                  step="1000"
                  value={filters.mileageMax}
                  onChange={(e) => updateRangeFilter("mileageMax", Number(e.target.value))}
                  className="w-full bg-slate-900 accent-accent cursor-pointer h-1 rounded-lg"
                />
              </div>

            </div>
          </aside>
        )}

        {/* Right Side: Grid listings */}
        <section className={`${isFilterPanelOpen ? "lg:col-span-9" : "lg:col-span-12"} space-y-8`}>
          
          <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
            <span>SHOWING {filteredVehicles.length} CURATED VEHICLES MATCHING SEARCH</span>
          </div>

          {filteredVehicles.length === 0 ? (
            
            /* Empty state wrapper */
            <div className="text-center py-20 bg-slate-900/40 border border-slate-900 rounded-2xl p-8 space-y-4">
              <RefreshCw className="w-10 h-10 text-accent mx-auto animate-spin-slow mb-2" />
              <h3 className="font-display font-bold text-lg text-white uppercase">No vehicles matching filters</h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto">
                We couldn't locate specs matching your search bounds. Try resetting your price cap or choosing a different style.
              </p>
              <div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="bg-accent hover:bg-accent-hover text-slate-950 px-5 py-2.5 rounded-xl uppercase tracking-wider text-2xs font-extrabold cursor-pointer"
                >
                  Reset Current Filters
                </button>
              </div>
            </div>

          ) : (

            /* Listings layout view switch */
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onSelect={onSelectVehicle}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedVehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id}
                    className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden hover:border-[#0c2b42] transition-colors p-4 flex flex-col sm:flex-row gap-5 items-center shadow-lg"
                  >
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.model}
                      loading="lazy"
                      className="w-full sm:w-48 h-32 object-cover rounded-xl bg-slate-900 self-stretch sm:self-auto"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="flex-1 space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>{vehicle.year} &bull; {vehicle.bodyType} &bull; {vehicle.fuelType}</span>
                        <span className="text-emerald-400 font-bold uppercase tracking-wider">Certified specs</span>
                      </div>
                      
                      <h3 className="font-display font-extrabold text-white text-base leading-none">
                        {vehicle.make} <span className="text-slate-400 font-medium">{vehicle.model}</span>
                      </h3>
                      
                      <p className="text-slate-400 text-2xs line-clamp-1 leading-relaxed">
                        {vehicle.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 text-2xs font-mono text-slate-400 pt-1">
                        <span className="bg-slate-900 px-2 py-1 rounded-md">{vehicle.engine}</span>
                        <span className="bg-slate-900 px-2 py-1 rounded-md">{vehicle.transmission}</span>
                        <span className="bg-slate-900 px-2 py-1 rounded-md">{vehicle.mileage.toLocaleString()} mi</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 border-slate-900 pt-4 sm:pt-0 w-full sm:w-auto">
                      <div className="flex flex-col text-left sm:text-right">
                        <span className="text-3xs font-mono text-slate-500 uppercase tracking-wider">Sticker Price</span>
                        <span className="text-xl font-display font-black text-white">${vehicle.price.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => onSelectVehicle(vehicle.id)}
                        className="bg-accent hover:bg-accent-hover text-slate-950 font-extrabold px-4.5 py-2.5 rounded-xl uppercase tracking-wider text-2xs border border-amber-500/10 cursor-pointer"
                      >
                        Details
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )

          )}

          {/* Simple and elegant pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-8 font-mono text-xs text-slate-400">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 border border-slate-900 hover:border-slate-800 rounded-lg hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Previous page"
              >
                Prev
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-accent border-amber-500 text-slate-950"
                      : "border-slate-900 hover:border-slate-800 bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-2 border border-slate-900 hover:border-slate-800 rounded-lg hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Next page"
              >
                Next
              </button>
            </div>
          )}

        </section>

      </div>

    </div>
  );
}
