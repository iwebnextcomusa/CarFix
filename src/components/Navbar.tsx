import { useState, useRef, useEffect } from "react";
import { Car, ChevronDown, Menu, X, Landmark, Compass, Sparkles, Zap, ShieldCheck, PhoneCall } from "lucide-react";
import { PageType } from "../types";

interface NavbarProps {
  activePage: PageType;
  onChangePage: (page: PageType, autoSelectFilter?: { category: string; value: string }) => void;
}

export default function Navbar({ activePage, onChangePage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMegaMenuLinkClick = (category: string, value: string) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onChangePage("inventory", { category, value });
  };

  const navItems = [
    { label: "Home", page: "home" as PageType },
    { label: "Showroom", page: "inventory" as PageType, hasSub: true },
    { label: "Financing Plans", page: "financing" as PageType },
    { label: "Our Story", page: "about" as PageType },
    { label: "Get In Touch", page: "contact" as PageType }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-primary border-b border-primary-dark/35 shadow-lg font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand Identity */}
          <div 
            onClick={() => { onChangePage("home"); setIsMobileMenuOpen(false); }} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-primary to-blue-900 p-2.5 rounded-xl border border-blue-800 group-hover:border-accent transition-all duration-300">
              <Car className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <span className="font-display text-2xl font-black text-white tracking-tight flex items-center leading-none">
                CAR<span className="text-accent">FIX</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#F39C12] block uppercase mt-0.5">Showroom & Care</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.hasSub) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        activePage === "inventory"
                          ? "bg-primary-light text-white border border-primary-light"
                          : "text-slate-100 hover:bg-primary-light/50 hover:text-white"
                      }`}
                    >
                      Inventory Showroom
                      <ChevronDown className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? "rotate-180 text-accent" : "text-slate-400"}`} />
                    </button>
                    
                    {/* Mega Menu Overlay */}
                    {isMegaMenuOpen && (
                      <div 
                        ref={megaMenuRef}
                        className="absolute left-1/2 -translate-x-[45%] mt-3 w-[720px] bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-6 grid grid-cols-3 gap-6 animate-fade-in"
                      >
                        {/* Column 1: By Body Type */}
                        <div>
                          <h4 className="font-display font-extrabold text-xs tracking-widest text-[#F39C12] uppercase mb-3 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" />
                            By Vehicle Style
                          </h4>
                          <ul className="space-y-1 text-slate-300 text-xs">
                            {["Sedan", "Coupe", "SUV"].map((style) => (
                              <li key={style}>
                                <button
                                  onClick={() => handleMegaMenuLinkClick("bodyType", style)}
                                  className="w-full text-left py-1.5 px-2.5 rounded-md hover:bg-slate-900 hover:text-white transition-colors cursor-pointer font-medium"
                                >
                                  Luxury {style}s
                                </button>
                              </li>
                            ))}
                            <li>
                              <button
                                onClick={() => { setIsMegaMenuOpen(false); onChangePage("inventory"); }}
                                className="w-full text-left py-1.5 px-2.5 rounded-md hover:bg-slate-900 text-accent transition-colors font-semibold"
                              >
                                View Entire Showroom →
                              </button>
                            </li>
                          </ul>
                        </div>

                        {/* Column 2: By Power Source */}
                        <div>
                          <h4 className="font-display font-extrabold text-xs tracking-widest text-[#F39C12] uppercase mb-3 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            By Power Source
                          </h4>
                          <ul className="space-y-1 text-slate-300 text-xs">
                            {["Electric", "Gasoline", "Hybrid"].map((fuel) => (
                              <li key={fuel}>
                                <button
                                  onClick={() => handleMegaMenuLinkClick("fuelType", fuel)}
                                  className="w-full text-left py-1.5 px-2.5 rounded-md hover:bg-slate-900 hover:text-white transition-colors cursor-pointer font-medium"
                                >
                                  {fuel} Propulsion
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 3: Custom Features Block */}
                        <div className="bg-primary/20 border border-blue-900/40 p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="inline-flex items-center gap-1 text-[10px] bg-accent/10 border border-accent/25 text-accent font-mono px-2 py-0.5 rounded-full mb-3 uppercase font-semibold">
                              <Sparkles className="w-3" /> Certified CarFix
                            </span>
                            <h5 className="text-white font-semibold text-xs leading-snug mb-1">150-Point Certified Check</h5>
                            <p className="text-slate-400 text-[10px] leading-relaxed">Every vehicle features a meticulous pre-purchase health check with 3-day return guarantees.</p>
                          </div>
                          <div>
                            <button
                              onClick={() => { setIsMegaMenuOpen(false); onChangePage("financing"); }}
                              className="text-white hover:text-accent font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 mt-3 cursor-pointer"
                            >
                              Get Fast Financing Approval →
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => { onChangePage(item.page); setIsMegaMenuOpen(false); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activePage === item.page
                      ? "bg-primary-light text-white border border-primary-light"
                      : "text-slate-100 hover:bg-primary-light/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Phone CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:8005553492" 
              className="flex items-center gap-2 text-slate-100 hover:text-accent transition-colors font-mono text-sm"
            >
              <PhoneCall className="w-4 h-4 text-accent" />
              <span>(800) 555-FIX-CAR</span>
            </a>
            <button
              onClick={() => onChangePage("financing")}
              className="bg-accent hover:bg-accent-hover text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider border border-amber-500/10 shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Apply Online
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <a 
              href="tel:8005553492" 
              className="p-2 text-slate-100 hover:text-accent transition-colors"
              aria-label="Call Dealership"
            >
              <PhoneCall className="w-5 h-5 text-accent" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-100 hover:text-white p-2 rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
              aria-label="Toggle Navigation Panel"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Slideout */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-dark/50 px-4 pt-2 pb-6 space-y-2 animate-fade-in absolute w-full left-0 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onChangePage(item.page);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                activePage === item.page
                  ? "bg-primary-dark/50 text-[#F39C12] border border-primary-dark"
                  : "text-slate-100 hover:bg-primary-light"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 border-t border-primary-dark/40 space-y-3 px-4">
            <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Certified Dealer Integrity
            </div>
            <div className="flex flex-col gap-2">
              <a 
                href="tel:8005553492" 
                className="flex items-center gap-2 py-2 text-slate-100 hover:text-accent font-mono text-sm"
              >
                <PhoneCall className="w-4 h-4 text-accent" />
                <span>Call Center: 1-800-555-FIX-CAR</span>
              </a>
              <button
                onClick={() => {
                  onChangePage("financing");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-accent hover:bg-accent-hover text-slate-950 font-bold py-3.5 rounded-xl text-sm uppercase tracking-wide text-center"
              >
                Pre-Apply For Loans
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
