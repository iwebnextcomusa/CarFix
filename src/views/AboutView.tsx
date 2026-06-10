import { TEAM_MEMBERS, VALUES } from "../data";
import { Landmark, Compass, ShieldCheck, Sparkles, Award, UserCheck } from "lucide-react";

export default function AboutView() {
  return (
    <div id="about-us-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-100 min-h-[90vh] space-y-20">
      
      {/* 1. Page Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-2xs text-[#F39C12] uppercase tracking-widest block font-semibold">About CarFix Dealership</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white leading-none">
          CRAFTING THE <span className="text-gradient">FUTURE OF CAR CARING</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          At CarFix, specifications and technical truth guide our curating decisions. We design transparent showrooms devoid of typical pushy dealership noise.
        </p>
      </section>

      {/* 2. Brand Story / Heritage Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-900/40 border border-slate-900 rounded-3xl p-8 sm:p-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-950/40 text-accent px-3 py-1 rounded-full border border-blue-900 font-mono text-2xs uppercase font-semibold">
            <Award className="w-3.5 h-3.5" /> Established 2021
          </div>
          <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">THE HONEST HERITAGE</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Founded in Houston, Texas, our venture started with simple frustration: the average sports car buyer faced massive markups, pushy sales tactics, and complete lack of transparent structural inspection histories.
          </p>
          <p className="text-slate-400 text-xs leading-relaxed">
            By establishing CarFix Group, we integrated computer-aided diagnostic records, virtual online finance applications, immersive 3D showrooms, and neural support chatbots under a single sleek platform. We buy only high-specification, meticulously maintained models, putting each passenger vehicle through our certified 150-point checklist.
          </p>
        </div>
        
        {/* Visual Showcase Box */}
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="relative z-10 text-center space-y-2 px-6">
            <span className="text-3xs font-mono text-[#F39C12] uppercase tracking-[0.2em] block">Houston Showroom</span>
            <h4 className="text-white font-display font-black text-lg uppercase">CURATED PRECISION</h4>
            <span className="inline-block bg-primary/40 border border-blue-900 px-3 py-1 rounded-full text-slate-300 font-mono text-[9px] uppercase tracking-wide">
              Certified Luxury & EV Care
            </span>
          </div>
        </div>
      </section>

      {/* 3. Mission / Values section */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="font-mono text-2xs text-[#F39C12] uppercase tracking-widest font-semibold block">Core Standards</span>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">CORPORATE PILOTS & MISSION CODES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans">
          {VALUES.map((val, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-900 hover:border-slate-850 p-6 rounded-2xl space-y-3 transition-colors">
              <div className="bg-accent/15 p-2 rounded-lg border border-accent/20 w-fit">
                <ShieldCheck className="w-4.5 h-4.5 text-accent" />
              </div>
              <h3 className="text-white text-sm font-bold font-display uppercase tracking-wider">{val.title}</h3>
              <p className="text-slate-400 leading-relaxed text-3xs">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="font-mono text-2xs text-accent uppercase tracking-widest font-semibold block">Meet Our Senior Curation Team</span>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">AUTO PROFESSIONAL TEAM</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden hover:border-[#0c2b42] transition-all flex flex-col items-center p-6 space-y-4 shadow-lg text-center">
              <img 
                src={member.image} 
                alt={member.name} 
                loading="lazy"
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-800 bg-slate-900 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h4 className="text-white font-display font-bold text-sm uppercase">{member.name}</h4>
                <span className="text-[10px] text-accent font-mono uppercase tracking-wider">{member.role}</span>
              </div>
              <p className="text-slate-450 text-[11px] leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
