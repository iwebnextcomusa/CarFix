import React, { useState, useEffect } from "react";
import { Vehicle, PageType } from "../types";
import { TESTIMONIALS, VEHICLES } from "../data";
import VehicleCard from "../components/VehicleCard";
import Model3D from "../components/Model3D";
import { Search, ShieldAlert, Sparkles, Star, ChevronLeft, ChevronRight, Landmark, Compass, Clock, MapPin, BadgeCheck, HelpCircle } from "lucide-react";

interface HomeViewProps {
  onNavigate: (page: PageType, autoSelectFilter?: { category: string; value: string }) => void;
  onSelectVehicle: (id: string) => void;
}

export default function HomeView({ onNavigate, onSelectVehicle }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [featuredOffset, setFeaturedOffset] = useState(0);
  const [calcPrice, setCalcPrice] = useState(89990);
  const [calcDown, setCalcDown] = useState(15000);
  const [calcTerm, setCalcTerm] = useState(60);
  const [calcRate, setCalcRate] = useState(4.99);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Filter vehicles for quick search suggestions
  const featuredVehicles = VEHICLES.slice(0, 3);

  // Financial Calculator Formula
  useEffect(() => {
    const loanAmount = Math.max(0, calcPrice - calcDown);
    const monthlyRate = (calcRate / 100) / 12;
    if (monthlyRate === 0) {
      setMonthlyPayment(loanAmount / calcTerm);
    } else {
      const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, calcTerm)) / (Math.pow(1 + monthlyRate, calcTerm) - 1);
      setMonthlyPayment(isNaN(payment) ? 0 : Math.round(payment));
    }
  }, [calcPrice, calcDown, calcTerm, calcRate]);

  // Handler for custom search bar trigger
  const handleFeaturedSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("inventory", { category: "search", value: searchQuery });
  };

  const bodyTypes = [
    { name: "Sedan", desc: "Sleek Road Tours" },
    { name: "Coupe", desc: "Sensation Speed" },
    { name: "SUV", desc: "Rugged Capability" }
  ];

  return (
    <div id="homepage-container" className="space-y-24 pb-20 font-sans text-slate-100 bg-slate-950">
      
      {/* 1. HERO SECTION WITH LUXURY IMAGERY */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-primary">
        {/* Futuristic dark visual background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1500')] bg-cover bg-center opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/80 to-primary/40 pointer-events-none" />
        
        {/* Geometric light lines */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/10 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 bg-primary-dark/40 backdrop-blur-md px-4 py-2 rounded-full border border-primary-light/35 shadow-lg">
            <Sparkles className="w-4.5 h-4.5 text-accent animate-spin-slow" />
            <span className="font-mono text-2xs uppercase tracking-widest text-[#F39C12] font-semibold">Houston's Premier Automotive Destination</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white max-w-5xl mx-auto uppercase">
            REDEFINING THE <span className="text-accent">SHOWROOM EXPERIENCE</span>
          </h1>

          <p className="text-blue-100 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Browse our meticulously curated, 150-point certified performance and electric fleet. Enjoy transparent non-negotiable prices, digital loan terms, and a 3-day money-back guarantee.
          </p>

          {/* PROMINENT VEHICLE SEARCH BAR & PORTALS */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleFeaturedSearchSubmit} className="bg-white/95 border border-slate-100 p-3 rounded-2xl flex flex-col md:flex-row gap-3 shadow-2xl backdrop-blur-md">
              <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Make, Model or keywords (e.g. Electric)..."
                  className="bg-transparent text-slate-800 placeholder-slate-405 text-sm w-full focus:outline-none placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-slate-950 font-extrabold px-8 py-3.5 rounded-xl uppercase tracking-wider text-xs border border-amber-500/10 shadow-lg transition-all hover:scale-[1.02] cursor-pointer shrink-0"
              >
                Search Inventory
              </button>
            </form>

            {/* Quick Filter style buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-blue-150 font-mono text-2xs uppercase tracking-wider">Quick Select:</span>
              {bodyTypes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => onNavigate("inventory", { category: "bodyType", value: t.name })}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. THREE.JS INTERACTIVE 3D SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-blue-950/40 text-accent px-3 py-1 rounded-full border border-blue-900 font-mono text-2xs uppercase">
              <Compass className="w-3.5 h-3.5" /> Virtual Custom Stage
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
              Interactive <span className="text-gradient">3D Wireframe showroom</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Interact directly with our precision sports chassis. Scroll down to accelerate rotation, hover to stimulate color shifts, and view real-time vector coordinate tracks. We integrate WebGL models to provide an honest, tech-focused perspective of car aesthetics.
            </p>
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent"></span>
                <span>Rotate and zoom via trackpad or mouse gestures</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent"></span>
                <span>Active physics calculations map to chassis proportions</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => onNavigate("inventory")}
                className="bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 font-bold px-5 py-3 rounded-xl border border-slate-800 text-xs uppercase uppercase tracking-wider transition-colors cursor-pointer"
              >
                Browse Spec Inventory
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            {/* Embedded Three.js custom visual state */}
            <Model3D />
          </div>
        </div>
      </section>

      {/* 3. FEATURED VEHICLES CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-2xs text-accent uppercase tracking-widest font-semibold block mb-2">Curated Premium Selection</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              FEATURED <span className="text-gradient">MACHINES</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate("inventory")}
            className="text-accent hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Explore Entire Catalog ({VEHICLES.length} units) →
          </button>
        </div>

        {/* Vehicle Grid (featured subset) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE CARFIX SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-3xl p-8 sm:p-12 space-y-12">
          
          {/* Centered Title */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="font-mono text-2xs text-[#F39C12] uppercase tracking-widest block font-semibold">Honest Operations</span>
            <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">
              REDISCOVER AUTOMOTIVE TRUST
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We skip typical high-pressure sales protocols to provide transparent, tech-guided, and verified performance.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            
            <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-3 hover:border-blue-900/50 transition-colors">
              <div className="bg-accent/10 p-2.5 rounded-lg border border-accent/20 w-fit">
                <BadgeCheck className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-white text-base font-bold font-display uppercase tracking-wide">150-Point Certified Diagnostic Check</h3>
              <p className="text-slate-400 leading-relaxed">
                Every vehicle suffers a complete road, electrical, structural, and mechanic diagnostic test before listing. Reports are shared instantly.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-3 hover:border-blue-900/50 transition-colors">
              <div className="bg-blue-950/40 p-2.5 rounded-lg border border-blue-900 w-fit">
                <Clock className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <h3 className="text-white text-base font-bold font-display uppercase tracking-wide">3-Day Return Satisfaction</h3>
              <p className="text-slate-400 leading-relaxed">
                If the chassis, sound proofing, or comfort parameters do not perfectly blend with your lifestyle, exchange or return it with zero friction.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-3 hover:border-blue-900/50 transition-colors">
              <div className="bg-amber-900/20 p-2.5 rounded-lg border border-amber-800/40 w-fit">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-white text-base font-bold font-display uppercase tracking-wide">Sleek Pricing Clarity</h3>
              <p className="text-slate-400 leading-relaxed">
                No dealership prep fees, no hidden doc charges, and absolute price matching. What you view on-screen is exactly your checkout item.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FINANCING HIGHLIGHTS WITH ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="font-mono text-2xs text-accent uppercase tracking-widest font-semibold block">Pre-Approvals In Minutes</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              FLEXIBLE LOANS <span className="text-gradient">TAILORED FOR SPEED</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We sync with multiple luxury finance networks to source optimal interest rates depending on credit file. Secure electric green loans, select flexible monthly durations, and pre-qualify instantly without hard credit pulls.
            </p>
            
            <div className="space-y-4 text-xs font-medium text-slate-300">
              <div className="flex gap-3">
                <Landmark className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold">Flexible Loan Terms</h4>
                  <p className="text-slate-400 text-2xs">Opt for lengths between 24 to 84 months based on cash flow.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold">Zero Documentation Fees</h4>
                  <p className="text-slate-400 text-2xs">Full electronic signatures streamline processing in less than 5 minutes.</p>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate("financing")}
                className="bg-accent hover:bg-accent-hover text-slate-950 font-extrabold px-6 py-3.5 rounded-xl uppercase tracking-wider text-xs border border-amber-500/10 shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                Start Loan Application
              </button>
            </div>
          </div>

          {/* Interactive Calculator widget */}
          <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
            <h4 className="font-display font-bold text-base text-white uppercase tracking-wide border-b border-slate-800 pb-3">
              Showroom Loan Calculator Estimator
            </h4>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1.5 font-medium">
                  <span>Showroom Vehicle Sticker Price</span>
                  <span className="text-white font-mono font-bold">${calcPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="150000"
                  step="5000"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                  className="w-full accent-accent bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1.5 font-medium">
                  <span>Down Payment Allocation</span>
                  <span className="text-white font-mono font-bold">${calcDown.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="40000"
                  step="1000"
                  value={calcDown}
                  onChange={(e) => setCalcDown(Number(e.target.value))}
                  className="w-full accent-accent bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium">Interest Percentage (APR)</label>
                  <select
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white font-mono p-2 rounded-xl border border-slate-800 focus:outline-none"
                  >
                    <option value="3.49">3.49% (Excellent)</option>
                    <option value="4.99">4.99% (Good)</option>
                    <option value="6.49">6.49% (Fair)</option>
                    <option value="8.99">8.99% (Subprime)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium">Duration (Months)</label>
                  <select
                    value={calcTerm}
                    onChange={(e) => setCalcTerm(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white font-mono p-2 rounded-xl border border-slate-800 focus:outline-none"
                  >
                    <option value="36">36 Months</option>
                    <option value="48">48 Months</option>
                    <option value="60">60 Months (Default)</option>
                    <option value="72">72 Months</option>
                    <option value="84">84 Months</option>
                  </select>
                </div>
              </div>

              {/* Total output panel */}
              <div className="bg-slate-950/90 border border-slate-850 p-4 rounded-xl text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Guaranteed Estimated Monthly Payment</span>
                <div className="text-3xl font-display font-black text-accent">${monthlyPayment} <span className="text-xs text-slate-400 font-normal">/mo</span></div>
                <p className="text-[10px] text-slate-500 font-mono">Calculated on ${Math.max(0, calcPrice - calcDown).toLocaleString()} loan amount at {calcRate}% APR</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="font-mono text-2xs text-[#F39C12] uppercase tracking-widest font-semibold block">Client Endorsements</span>
          <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">OUR CLIENT REPUTATION</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div key={index} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-800 transition-colors">
              <div className="space-y-3">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">"{t.text}"</p>
              </div>
              
              <div className="flex items-center gap-3 border-t border-slate-900 pt-3.5">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-slate-800"
                />
                <div>
                  <h4 className="text-white font-medium text-xs leading-none">{t.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT INFO & VIRTUAL LOCATION MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-850 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Details Column */}
          <div className="p-8 sm:p-12 space-y-6">
            <span className="font-mono text-2xs text-accent uppercase tracking-widest font-semibold block">Visit Our HQ</span>
            <h2 className="font-display font-black text-3xl text-white uppercase leading-tight">
              AESTHETIC <span className="text-gradient">SHOWROOM SPACE</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              CarFix is located near Houston's luxury shopping corridor on Motors Way. Our location features full security parameters, comfortable beverage lounges, and charging grids. Stop by to take any high-specification vehicle on a high-speed route.
            </p>
            
            <div className="space-y-4 py-2 border-t border-b border-slate-800">
              <div className="flex gap-3 text-xs.">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold leading-none mb-1">Houston Showroom Address</h4>
                  <p className="text-slate-400 text-xs">1000 Luxury Motors Way, Houston, TX 77002</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold leading-none mb-1">Hours of Service</h4>
                  <p className="text-slate-400 text-xs">Mon - Sat: 9:00 AM - 7:00 PM (Showroom closed Sunday)</p>
                </div>
              </div>
            </div>

            <div>
              <button 
                onClick={() => onNavigate("contact")}
                className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-5 py-3 rounded-xl border border-slate-800 text-xs uppercase uppercase tracking-wider transition-colors cursor-pointer"
              >
                Inquire & Find Coordinates
              </button>
            </div>
          </div>

          {/* Virtual Map Visualization Column */}
          <div className="relative h-72 lg:h-auto min-h-[300px] bg-slate-950 flex items-center justify-center border-l border-slate-800 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#0c2b42_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
            
            {/* Elegant vector map layout illustration */}
            <div className="relative text-center p-6 space-y-4">
              <div className="inline-flex relative">
                <span className="absolute inline-flex h-8 w-8 rounded-full bg-accent/30 animate-ping -left-1.5 -top-1.5"></span>
                <div className="bg-accent p-3 rounded-full border border-amber-600 shadow-xl relative z-10 text-slate-950">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>
              <div>
                <h4 className="text-white font-display font-black text-sm tracking-wide uppercase">CARFIX HQ COORDINATES</h4>
                <p className="text-slate-400 font-mono text-3xs mt-1">LAT: 29.7604° N, LONG: 95.3698° W</p>
                <span className="inline-block bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent font-mono text-[9px] font-bold mt-3 uppercase tracking-wide">
                  Downtown Houston Core
                </span>
              </div>
            </div>
            
            {/* Grid coordinate bars */}
            <div className="absolute bottom-4 right-4 font-mono text-[9px] text-slate-600">
              SCALE: 1:5,000 VERIFIED
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
