import React, { useState } from "react";
import { FINANCE_FAQS, VEHICLES } from "../data";
import { Landmark, Check, AlertCircle, ShieldAlert, Sparkles, HelpCircle, ChevronDown } from "lucide-react";

export default function FinancingView() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    annualIncome: 85000,
    employmentStatus: "Full-Time",
    downPayment: 10000,
    loanTermMonths: 60,
    selectedVehicleId: "",
    agreedToTerms: false
  });

  const [ssnInput, setSsnInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Basic Validations
    if (!inputs.firstName || !inputs.lastName || !inputs.email || !inputs.phone || !inputs.dob || !ssnInput) {
      setErrorMsg("Please complete all personal and contact details.");
      return;
    }
    if (!inputs.agreedToTerms) {
      setErrorMsg("You must accept our standard credit consent before submitting.");
      return;
    }

    setSuccess(true);
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div id="financing-page-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-100 min-h-[90vh] space-y-20">
      
      {/* 1. Header Hero section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-2xs text-[#F39C12] uppercase tracking-widest font-semibold block">Flexible Auto Loans</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white leading-none">
          INSTANT <span className="text-gradient">LOAN PRE-APPROVAL</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Unlock Houston's most competitive rates on sports coupes and electric vehicles in minutes. Our digital loan check process has 0% primary score impact.
        </p>
      </div>

      {/* 2. Main layout grid: Form vs. Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form application */}
        <section className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-900 pb-4 flex items-center justify-between">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">SECURE LOAN APPLICATION</h3>
            <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span> SECURE 256-BIT SSL SHA
            </span>
          </div>

          {success ? (
            <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 p-8 rounded-2xl text-center space-y-4">
              <Check className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-display font-black uppercase">Application Pre-Approved!</h3>
              <p className="text-slate-300 text-xs leading-relaxed max-w-md mx-auto">
                Congratulations! Based on your annual income of <span className="font-mono font-bold text-white">${inputs.annualIncome.toLocaleString()}</span> and employment profile, you have cleared our initial pre-eligibility stage at <span className="text-accent font-bold">4.49% APR</span>. 
              </p>
              <p className="text-slate-400 text-[11px] max-w-sm mx-auto">
                Our finance directors will ring your specified coordinates ({inputs.phone}) within 10-15 minutes to finalize vehicle logistics.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-5 text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-950/20 text-red-400 border border-red-900/30 rounded-xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">First legal Name</label>
                  <input
                    type="text"
                    value={inputs.firstName}
                    onChange={(e) => setInputs({...inputs, firstName: e.target.value})}
                    placeholder="e.g. Benjamin"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Last legal Name</label>
                  <input
                    type="text"
                    value={inputs.lastName}
                    onChange={(e) => setInputs({...inputs, lastName: e.target.value})}
                    placeholder="e.g. Sterling"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Contacts info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Email Coordinates</label>
                  <input
                    type="email"
                    value={inputs.email}
                    onChange={(e) => setInputs({...inputs, email: e.target.value})}
                    placeholder="ben@sterling.com"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Phone Coordinates</label>
                  <input
                    type="tel"
                    value={inputs.phone}
                    onChange={(e) => setInputs({...inputs, phone: e.target.value})}
                    placeholder="(800) 555-0192"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Birthdate & masked SSN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Date of Birth (DOB)</label>
                  <input
                    type="date"
                    value={inputs.dob}
                    onChange={(e) => setInputs({...inputs, dob: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none uppercase text-2xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Social Security (Last 4 Coordinates)</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={ssnInput}
                    onChange={(e) => setSsnInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none font-mono tracking-widest text-center text-sm"
                  />
                </div>
              </div>

              {/* Employment & Income parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Employment Status</label>
                  <select
                    value={inputs.employmentStatus}
                    onChange={(e) => setInputs({...inputs, employmentStatus: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl focus:outline-none font-semibold text-2xs"
                  >
                    <option value="Full-Time">Full-Time Salary</option>
                    <option value="Self-Employed">Self-Employed / Business owner</option>
                    <option value="Part-Time">Part-Time Wages</option>
                    <option value="Retired">Retired / Investment Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Total Gross Annual Income ($)</label>
                  <input
                    type="number"
                    value={inputs.annualIncome}
                    onChange={(e) => setInputs({...inputs, annualIncome: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              {/* Finance specs & car choice */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-slate-400 mb-1.5 font-semibold">Select Showroom Vehicle</label>
                  <select
                    value={inputs.selectedVehicleId}
                    onChange={(e) => setInputs({...inputs, selectedVehicleId: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl focus:outline-none font-semibold text-2xs"
                  >
                    <option value="">Any Vehicle (General Pre-Approval)</option>
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.year} {v.make} {v.model} (${v.price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Planned Down ($)</label>
                  <input
                    type="number"
                    value={inputs.downPayment}
                    onChange={(e) => setInputs({...inputs, downPayment: Math.max(0, Number(e.target.value))})}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              {/* Secure authorization TCs */}
              <div className="pt-3 border-t border-slate-900">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.agreedToTerms}
                    onChange={(e) => setInputs({...inputs, agreedToTerms: e.target.checked})}
                    className="mt-1 accent-accent"
                  />
                  <span className="text-[11px] leading-relaxed text-slate-400">
                    I legally consent to CarFix checking secure database pre-approvals via lender networks. This action performs an soft authorization, leaving standard credit checks unaffected.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-slate-950 font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs border border-amber-500/10 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                Transmit secure pre-approval
              </button>
            </form>
          )}
        </section>

        {/* Right Column: Benefits Overview */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-slate-900/50 border border-slate-850 p-6 rounded-2xl space-y-6">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-accent" />
              FINANCING ADVANTAGES
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 text-xs">
                <div className="bg-accent/15 p-1 px-2.5 h-fit rounded text-accent font-bold">1</div>
                <div>
                  <h4 className="text-white font-bold leading-none mb-1 uppercase text-2xs tracking-wider">Electric Green Incentives</h4>
                  <p className="text-slate-400 text-3xs leading-relaxed">Save up to 0.75% off standard dynamic loan rates if selecting an zero-emission electric vehicle inside our catalog.</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs">
                <div className="bg-accent/15 p-1 px-2.5 h-fit rounded text-accent font-bold">2</div>
                <div>
                  <h4 className="text-white font-bold leading-none mb-1 uppercase text-2xs tracking-wider">Flexible Term Duration</h4>
                  <p className="text-slate-400 text-3xs leading-relaxed">Opt for lengths ranging from 24 months for quick payoff up to 84 months for budget preservation.</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs">
                <div className="bg-accent/15 p-1 px-2.5 h-fit rounded text-accent font-bold">3</div>
                <div>
                  <h4 className="text-white font-bold leading-none mb-1 uppercase text-2xs tracking-wider">Multi-Lender Network</h4>
                  <p className="text-slate-400 text-3xs leading-relaxed">We sync with over 15 digital global lenders, returning terms matching any localized credit history profile.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-900/30 border border-slate-900 rounded-2xl text-slate-400 text-[11px] leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Your sensitive SSN parameters are encrypted instantly before client-server transmission. We strictly preserve user parameters and do not share details with third party advertising campaigns.
            </p>
          </div>

        </div>

      </div>

      {/* 3. Frequently Asked Questions (FAQ) Section */}
      <section className="space-y-6 pt-12 border-t border-slate-900">
        <div className="flex items-center gap-2.5 mb-2">
          <HelpCircle className="w-5 h-5 text-accent" />
          <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">
            FINANCIAL FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          {FINANCE_FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-5 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left flex justify-between items-center text-slate-100 font-bold font-display text-sm leading-snug cursor-pointer focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-accent shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <p className="text-slate-400 text-xs mt-3 leading-relaxed border-t border-slate-900 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
