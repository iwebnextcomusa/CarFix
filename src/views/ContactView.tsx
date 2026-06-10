import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Check, AlertCircle, BookmarkCheck, PhoneCall } from "lucide-react";

export default function ContactView() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "email",
    department: "Sales",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!inputs.name || !inputs.email || !inputs.phone || !inputs.message) {
      setErrorMsg("Please complete Name, Email, Phone, and your Message details.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setInputs({
        name: "",
        email: "",
        phone: "",
        preferredContact: "email",
        department: "Sales",
        message: ""
      });
    }, 4500);
  };

  return (
    <div id="contact-us-page-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-100 min-h-[90vh] space-y-16">
      
      {/* 1. Header Hero section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-2xs text-[#F39C12] uppercase tracking-widest block font-semibold">Immediate Team Support</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white leading-none">
          SECURE <span className="text-gradient">COMMUNICATION RADARS</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Request details about specialized vehicle availability, coordinate trade-in evaluations, or confirm custom orders with our showroom managers.
        </p>
      </div>

      {/* 2. Main section grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Coordinates & schedule details */}
        <section className="lg:col-span-5 space-y-8">
          
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-6">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-accent" /> SHOWROOM COORDINATES
            </h3>

            <ul className="space-y-4 text-xs font-mono text-slate-300">
              <li className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold leading-normal mb-1 font-display uppercase text-2xs">Showroom Address</h4>
                  <p className="text-slate-400">1000 Luxury Motors Way, Houston, TX 77002</p>
                  <span className="inline-block bg-accent/10 text-accent text-3xs px-2 py-0.5 rounded-full mt-1.5 font-bold">Downtown Houston Core</span>
                </div>
              </li>

              <li className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <h4 className="text-white font-bold leading-none mb-1 font-display uppercase text-2xs">Telephone Contact</h4>
                  <a href="tel:8005553492" className="text-slate-400 hover:text-white transition-colors">(800) 555-FIX-CAR</a>
                </div>
              </li>

              <li className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <h4 className="text-white font-bold leading-none mb-1 font-display uppercase text-2xs">Support Email</h4>
                  <a href="mailto:sales@carfixdealership.com" className="text-slate-400 hover:text-white transition-colors">sales@carfixdealership.com</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Schedule block */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4 shadow-lg">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#38bdf8]" /> Showroom Operational Hours
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-400">
                <span>Monday - Friday</span>
                <span className="text-white font-mono">9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-400">
                <span>Saturday</span>
                <span className="text-white font-mono">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-slate-500">
                <span>Sunday</span>
                <span className="font-mono text-red-500/80">Closed Showroom</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Right Column: Lead Contact Form */}
        <section className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-slate-900 pb-3">
            LEAD GENERATION DIRECT SUPPORT
          </h3>

          {success ? (
            <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-950 p-6 rounded-2xl text-center space-y-3">
              <Check className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold font-display uppercase">Message Transmitted!</h4>
              <p className="text-slate-355 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-white">{inputs.name}</span>. Your support ticket for the <span className="text-accent font-bold font-mono">{inputs.department}</span> department is successfully registered.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-950/20 text-red-400 border border-red-900/30 rounded-xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    value={inputs.name}
                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                    placeholder="Liam Rodriguez"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Phone Coordinates</label>
                  <input
                    type="tel"
                    value={inputs.phone}
                    onChange={(e) => setInputs({...inputs, phone: e.target.value})}
                    placeholder="(800) 555-0193"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Email Coordinates</label>
                  <input
                    type="email"
                    value={inputs.email}
                    onChange={(e) => setInputs({...inputs, email: e.target.value})}
                    placeholder="liam@email.com"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Target Department</label>
                  <select
                    value={inputs.department}
                    onChange={(e) => setInputs({...inputs, department: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl focus:outline-none font-semibold text-2xs"
                  >
                    <option value="Sales">Sales & Purchasing Curation</option>
                    <option value="Financing">Auto Loan Department</option>
                    <option value="Servicing">Inspection & Trade valuation</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-semibold">Preferred Callback Choice</label>
                <div className="flex gap-4 p-1">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-300">
                    <input
                      type="radio"
                      name="callback"
                      checked={inputs.preferredContact === "email"}
                      onChange={() => setInputs({...inputs, preferredContact: "email"})}
                      className="accent-accent"
                    />
                    <span>Email Message</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-300">
                    <input
                      type="radio"
                      name="callback"
                      checked={inputs.preferredContact === "phone"}
                      onChange={() => setInputs({...inputs, preferredContact: "phone"})}
                      className="accent-accent"
                    />
                    <span>Phone Call</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-semibold">Your Detailed Message</label>
                <textarea
                  rows={4}
                  value={inputs.message}
                  onChange={(e) => setInputs({...inputs, message: e.target.value})}
                  placeholder="Inquire about a specific VIN, coordinate custom trade estimates..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none text-ellipsis"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-slate-950 font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs border border-amber-500/10 hover:scale-[1.01] transition-all cursor-pointer"
              >
                Send Secure Inquiry
              </button>
            </form>
          )}
        </section>

      </div>

    </div>
  );
}
