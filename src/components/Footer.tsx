import { PageType } from "../types";
import { Car, Mail, Phone, MapPin, ShieldCheck, CreditCard } from "lucide-react";

interface FooterProps {
  onChangePage: (page: PageType) => void;
}

export default function Footer({ onChangePage }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-blue-950/40 text-slate-400 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        
         {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onChangePage("home")}>
            <div className="bg-primary/40 p-2 rounded-xl border border-blue-800">
              <Car className="w-5 h-5 text-accent" />
            </div>
            <span className="font-display text-xl font-black text-white tracking-tight flex items-center leading-none">
              CAR<span className="text-accent">FIX</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Houston's premier destination for high-performance and luxury electric vehicles. Engineered to elevate your virtual shopping experience through authentic 3D customizers, online financing, and secure AI consultation.
          </p>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Certified Dealer
            </span>
            <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-300">
              <CreditCard className="w-3.5 h-3.5 text-[#38bdf8]" /> Instant Rates
            </span>
          </div>
        </div>

        {/* Operating Showroom Hours */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 font-display text-gradient">Showroom Hours</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex justify-between border-b border-blue-950/20 pb-1.5">
              <span>Monday - Friday</span>
              <span className="text-white font-mono">9:00 AM - 7:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-blue-950/20 pb-1.5">
              <span>Saturday</span>
              <span className="text-white font-mono">9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between text-slate-500">
              <span>Sunday</span>
              <span className="font-mono text-red-500/80">Closed Showroom</span>
            </li>
          </ul>
        </div>

        {/* Quick Pages Directories */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 font-display text-gradient">Quick Portals</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button 
                onClick={() => onChangePage("inventory")} 
                className="hover:text-accent hover:underline transition-colors cursor-pointer text-left"
              >
                Showroom Inventory
              </button>
            </li>
            <li>
              <button 
                onClick={() => onChangePage("financing")} 
                className="hover:text-accent hover:underline transition-colors cursor-pointer text-left"
              >
                Instant Finance Application
              </button>
            </li>
            <li>
              <button 
                onClick={() => onChangePage("about")} 
                className="hover:text-accent hover:underline transition-colors cursor-pointer text-left"
              >
                About CarFix
              </button>
            </li>
            <li>
              <button 
                onClick={() => onChangePage("contact")} 
                className="hover:text-accent hover:underline transition-colors cursor-pointer text-left"
              >
                Contact & Scheduling Directions
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 font-display text-gradient">Secure Headquarters</h4>
          <ul className="space-y-3.5 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>
                1000 Luxury Motors Way,<br />
                Houston, TX 77002
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <a href="tel:8005553492" className="hover:text-white transition-colors font-mono">(800) 555-FIX-CAR</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <a href="mailto:sales@carfixdealership.com" className="hover:text-white transition-colors">sales@carfixdealership.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-2xs space-y-4 md:space-y-0 text-slate-500 font-mono">
        <p>&copy; {year} CarFix Group Inc. All luxury vehicle specifications are validated.</p>
        
        {/* Mandatory developer footer signature */}
        <p className="text-slate-550">
          Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline hover:text-amber-400 transition-colors font-semibold">iWebNext</a>
        </p>
      </div>
    </footer>
  );
}
