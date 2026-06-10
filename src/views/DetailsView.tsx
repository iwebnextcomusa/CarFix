import React, { useState, useEffect } from "react";
import { Vehicle, PageType, InquiryFormInput, TestDriveFormInput } from "../types";
import { VEHICLES } from "../data";
import VehicleCard from "../components/VehicleCard";
import { Gauge, Milestone, Landmark, Check, Clock, Calendar, Mail, Phone, ChevronLeft, CalendarDays, Sparkles } from "lucide-react";

interface DetailsViewProps {
  vehicleId: string;
  onSelectVehicle: (id: string) => void;
  onNavigate: (page: PageType) => void;
}

export default function DetailsView({ vehicleId, onSelectVehicle, onNavigate }: DetailsViewProps) {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];

  // Forms state variables
  const [inquiryInputs, setInquiryInputs] = useState<InquiryFormInput>({
    name: "",
    email: "",
    phone: "",
    message: `Hello, I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} priced at $${vehicle.price.toLocaleString()}. Please provide availability.`,
    preferredContact: "email"
  });

  const [testDriveInputs, setTestDriveInputs] = useState<TestDriveFormInput>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "10:00",
    vehicleId: vehicle.id,
    licenseNumber: ""
  });

  // Calculate customized financial details for this specific car
  const [financeDown, setFinanceDown] = useState(15000);
  const [financeTerm, setFinanceTerm] = useState(72);
  const [financeRate, setFinanceRate] = useState(4.99);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Form notifications
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [testDriveSuccess, setTestDriveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string>("");

  // Similar vehicles based on body style/fuel or price category
  const similarVehicles = VEHICLES.filter((v) => v.id !== vehicle.id).slice(0, 2);

  // Run Monthly calculations
  useEffect(() => {
    const principal = Math.max(0, vehicle.price - financeDown);
    const monthlyRate = (financeRate / 100) / 12;
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / financeTerm);
    } else {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, financeTerm)) / (Math.pow(1 + monthlyRate, financeTerm) - 1);
      setMonthlyPayment(isNaN(payment) ? 0 : Math.round(payment));
    }
  }, [vehicle.price, financeDown, financeTerm, financeRate]);

  // Handle Inquiry Submit
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors("");

    // client validations
    if (!inquiryInputs.name || !inquiryInputs.email || !inquiryInputs.phone) {
      setValidationErrors("Please complete Name, Email, and Phone fields.");
      return;
    }

    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryInputs({
        name: "",
        email: "",
        phone: "",
        message: `Hello, I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} priced at $${vehicle.price.toLocaleString()}. Please provide availability.`,
        preferredContact: "email"
      });
    }, 4500);
  };

  // Handle Test Drive Submit
  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors("");

    if (!testDriveInputs.name || !testDriveInputs.email || !testDriveInputs.phone || !testDriveInputs.date || !testDriveInputs.licenseNumber) {
      setValidationErrors("Please provide details for driver licensing and appointment schedule.");
      return;
    }

    setTestDriveSuccess(true);
    setTimeout(() => {
      setTestDriveSuccess(false);
      setTestDriveInputs({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "10:00",
        vehicleId: vehicle.id,
        licenseNumber: ""
      });
    }, 4500);
  };

  return (
    <div id="details-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-slate-100 min-h-[90vh]">
      
      {/* Back button to Showroom */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate("inventory")}
          className="flex items-center gap-1.5 text-slate-400 hover:text-accent font-mono text-xs uppercase transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Showroom Inventory</span>
        </button>
      </div>

      {/* Main Column Specs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Visual sheet & Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main big vehicle image */}
          <div className="relative h-[250px] sm:h-[450px] bg-slate-900 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={vehicle.image} 
              alt={`${vehicle.make} ${vehicle.model}`} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-800 text-[#F39C12] font-mono text-2xs font-extrabold uppercase">
              Houston CarFix Certified Spec
            </div>
            <div className="absolute bottom-4 right-4 bg-slate-950/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-right">
              <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest block mb-0.5 animate-pulse">Guaranteed Sale Price</span>
              <span className="text-2xl font-display font-black text-white">${vehicle.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-2xs font-mono text-slate-400">
              <span className="bg-slate-900 px-3 py-1 rounded-full">{vehicle.year} MODEL</span>
              <span className="bg-slate-900 px-3 py-1 rounded-full uppercase">{vehicle.bodyType}</span>
              <span className="bg-slate-900 px-3 py-1 rounded-full uppercase">{vehicle.fuelType}</span>
              <span className="bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/10 px-3 py-1 rounded-full">{vehicle.mileage.toLocaleString()} CERTIFIED MILES</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white leading-none">
              {vehicle.make} <span className="text-gradient font-medium">{vehicle.model}</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed border-l-2 border-accent pl-4 font-normal py-1">
              {vehicle.description}
            </p>
          </div>

          {/* Spec Specifications grid profiles */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              TECHNICAL PROFILES & PERFORMANCE METRICS
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-mono text-slate-450">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Combustion/Electric Motor</span>
                <span className="text-white font-bold block truncate">{vehicle.engine}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Drive Transmission</span>
                <span className="text-white font-bold block truncate">{vehicle.transmission}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Efficiency Profile</span>
                <span className="text-white font-bold block truncate">{vehicle.efficiency}</span>
              </div>
              <div className="space-y-1 pt-2">
                <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Exterior Paint</span>
                <span className="text-white font-bold block truncate">{vehicle.color}</span>
              </div>
              <div className="space-y-1 pt-2">
                <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Interior Material</span>
                <span className="text-white font-bold block truncate">{vehicle.interiorColor}</span>
              </div>
              <div className="space-y-1 pt-2">
                <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Inspection Rating</span>
                <span className="text-emerald-400 font-extrabold block truncate">150-Point OK</span>
              </div>
            </div>
          </div>

          {/* Premium Equipment & Options list */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
              PREMIUM STANDARD EQUIPMENT & INSTALLED UPGRADES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              {vehicle.features.map((feat) => (
                <div key={feat} className="flex items-center gap-3 bg-slate-900/30 border border-slate-900 p-3 rounded-xl hover:border-slate-800 transition-colors">
                  <div className="bg-accent/10 p-1.5 rounded-lg border border-accent/20">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                  </div>
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic customized financing estimator block */}
          <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <h4 className="font-display font-extrabold text-base text-white uppercase tracking-wider flex items-center gap-2">
              <Landmark className="w-5 h-5 text-accent" />
              Custom Finance Estimator Profile
            </h4>
            
            <p className="text-slate-400 text-xs">
              Preview customizable monthly payments calculated explicitly for this ${vehicle.price.toLocaleString()} vehicle. Pre-applying online grants locked interest coordinates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-2">
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium">Down Allocation Adjustment</label>
                <input
                  type="number"
                  value={financeDown}
                  onChange={(e) => setFinanceDown(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-mono p-2.5 rounded-xl text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-medium">APR Interest Percent (%)</label>
                <select
                  value={financeRate}
                  onChange={(e) => setFinanceRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-mono p-2.5 rounded-xl text-xs focus:outline-none"
                >
                  <option value="3.49">3.49% (Premium APR)</option>
                  <option value="4.99">4.99% (Excellent Rate)</option>
                  <option value="6.49">6.49% (Standard Market)</option>
                  <option value="8.99">8.99% (Basic Rate)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-medium">Length Duration (Months)</label>
                <select
                  value={financeTerm}
                  onChange={(e) => setFinanceTerm(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-mono p-2.5 rounded-xl text-xs focus:outline-none"
                >
                  <option value="36">36 Months (Short)</option>
                  <option value="60">60 Months (Recommended)</option>
                  <option value="72">72 Months (Extended)</option>
                  <option value="84">84 Months (Max Term)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-950/90 border border-slate-850 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#F39C12] uppercase tracking-widest font-semibold block mb-0.5">Estimated Loan Monthly Rate</span>
                <span className="text-2xl font-display font-black text-white">${monthlyPayment} <span className="text-xs text-slate-400 font-normal">/ mo</span></span>
              </div>
              <button
                onClick={() => onNavigate("financing")}
                className="bg-accent hover:bg-accent-hover text-slate-950 font-extrabold px-6 py-3 rounded-xl uppercase tracking-wider text-2xs border border-amber-500/10 cursor-pointer"
              >
                Apply for Pre-Approval Now
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Inquiry Forms */}
        <div className="lg:col-span-4 space-y-8 lg:sticky top-28">

          {/* Inquiry form card */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-5">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-slate-900 pb-3">
              VEHICLE INQUIRY DOSSIER
            </h3>

            {inquirySuccess ? (
              <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 p-4 rounded-xl text-center text-xs space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold">Inquiry Transmitted Successfully</h4>
                <p className="text-[11px] text-slate-400">Our senior automotive advisors will reach your specified email or phone coordinates shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                {validationErrors && <p className="text-red-400 text-2xs">{validationErrors}</p>}

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    value={inquiryInputs.name}
                    onChange={(e) => setInquiryInputs({...inquiryInputs, name: e.target.value})}
                    placeholder="e.g. Liam Vance"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Email Coordinates</label>
                    <input
                      type="email"
                      value={inquiryInputs.email}
                      onChange={(e) => setInquiryInputs({...inquiryInputs, email: e.target.value})}
                      placeholder="name@email.com"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Phone Coordinates</label>
                    <input
                      type="tel"
                      value={inquiryInputs.phone}
                      onChange={(e) => setInquiryInputs({...inquiryInputs, phone: e.target.value})}
                      placeholder="(800) 555-..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Required Query Dossier</label>
                  <textarea
                    rows={3}
                    value={inquiryInputs.message}
                    onChange={(e) => setInquiryInputs({...inquiryInputs, message: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-3 rounded-xl text-xs uppercase tracking-wider border border-slate-800 cursor-pointer"
                >
                  Send Inquiry Dossier
                </button>
              </form>
            )}
          </div>

          {/* Test drive scheduler */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-900 rounded-2xl p-6 space-y-5">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-slate-900/50 pb-3 flex items-center gap-1.5">
              <CalendarDays className="w-4.5 h-4.5 text-accent" />
              SCHEDULE VIP DRIVE ROUTE
            </h3>

            {testDriveSuccess ? (
              <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 p-4 rounded-xl text-center text-xs space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold">Test Drive VIP Slot Secured</h4>
                <p className="text-[11px] text-slate-400">Your VIP driving slot is secured. Bring your driver's license coordinates to 1000 Luxury Motors Way.</p>
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="space-y-4 text-xs">
                
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Full Legal Name</label>
                  <input
                    type="text"
                    value={testDriveInputs.name}
                    onChange={(e) => setTestDriveInputs({...testDriveInputs, name: e.target.value})}
                    placeholder="Liam Vance"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">License ID Coordinates</label>
                    <input
                      type="text"
                      value={testDriveInputs.licenseNumber}
                      onChange={(e) => setTestDriveInputs({...testDriveInputs, licenseNumber: e.target.value})}
                      placeholder="TX-8032..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white p-2.5 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Preferred Time</label>
                    <select
                      value={testDriveInputs.time}
                      onChange={(e) => setTestDriveInputs({...testDriveInputs, time: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl focus:outline-none text-2xs"
                    >
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Preferred Calendar Date</label>
                    <input
                      type="date"
                      value={testDriveInputs.date}
                      onChange={(e) => setTestDriveInputs({...testDriveInputs, date: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl focus:outline-none text-2xs uppercase"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-slate-950 font-extrabold p-3 rounded-xl text-xs uppercase tracking-wider border border-amber-500/10 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  Book VIP Driving Route
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Similar vehicles recommendations */}
      <div className="border-t border-slate-900 mt-20 pt-12 space-y-6">
        <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
          RECOMMENDED SIMILAR MACHINES FOR YOU
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {similarVehicles.map((simVeh) => (
            <VehicleCard
              key={simVeh.id}
              vehicle={simVeh}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
