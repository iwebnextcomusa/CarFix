import { Vehicle } from "./types";

export const VEHICLES: Vehicle[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    price: 89990,
    mileage: 4200,
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    color: "Solid Black",
    interiorColor: "All Black Premium",
    engine: "Tri-Motor AWD (1,020 hp)",
    efficiency: "102 MPGe",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    description: "Experience the pinnacle of electric performance. This near-new Model S Plaid features the revolutionary tri-motor setup, delivering a breathtaking 0-60 mph in 1.99 seconds, complete with a minimalist black premium cabin, carbon fiber accents, and full self-driving capability.",
    features: ["Autopilot", "Panoramic Glass Roof", "17-inch Cinematic Display", "Heated/Ventilated Seats", "Carbon Fiber Spoiler", "21-inch Arachnid Wheels"]
  },
  {
    id: "2",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2022,
    price: 124500,
    mileage: 7800,
    bodyType: "Coupe",
    fuelType: "Gasoline",
    transmission: "Automatic (PDK)",
    color: "Guards Red",
    interiorColor: "Black Premium Leather",
    engine: "3.0L Twin-Turbo Flat-6",
    efficiency: "18 / 24 MPG",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    description: "An absolute icon of sports car engineering. Finished in timeless Guards Red, this Carrera S is equipped with the lightning-fast 8-speed PDK transmission, Sport Chrono Package, and Porsche Active Suspension Management (PASM) for a peerless driving experiences.",
    features: ["Sport Chrono Package", "Bose Premium Sound System", "PASM Sport Suspension", "LED Headlights in Black", "18-Way Sport Seats", "Sport Exhaust System"]
  },
  {
    id: "3",
    make: "BMW",
    model: "M4 Competition",
    year: 2023,
    price: 84900,
    mileage: 3100,
    bodyType: "Coupe",
    fuelType: "Gasoline",
    transmission: "Automatic",
    color: "Portimao Blue Metallic",
    interiorColor: "Kyalami Orange/Black Merino",
    engine: "3.0L BMW M TwinPower Turbo I6",
    efficiency: "16 / 23 MPG",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    description: "The definition of precision performance. Impeccably specified in metallic Portimao Blue, with a contrasting high-contrast Kyalami Orange leather interior. Boasts 503 horsepower, lightweight carbon fiber roof, and advanced M xDrive intelligent all-wheel-drive.",
    features: ["M xDrive AWD", "Carbon Roof", "Executive Package", "Harman Kardon Audio", "Heads-up Display", "M Carbon Bucket Seats"]
  },
  {
    id: "4",
    make: "Audi",
    model: "e-tron GT",
    year: 2023,
    price: 79900,
    mileage: 6200,
    bodyType: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    color: "Kemora Gray Metallic",
    interiorColor: "Arras Red Premium Leather",
    engine: "Dual Electric Motors (quattro)",
    efficiency: "85 MPGe",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
    description: "Stunning aesthetics meet zero-emission touring. The Audi e-tron GT offers standard-setting electric design, with dual-motor quattro drive, adaptive air suspension, and premium acoustical insulation for a silent but deeply powerful premium touring ride.",
    features: ["Quattro AWD", "Adaptive Air Suspension", "Matrix LED Headlights", "Bang & Olufsen 3D Sound", "Wireless Charging", "Panoramic Fixed Glass Roof"]
  },
  {
    id: "5",
    make: "Mercedes-Benz",
    model: "AMG GT 53",
    year: 2021,
    price: 94800,
    mileage: 18500,
    bodyType: "Coupe",
    fuelType: "Hybrid",
    transmission: "Automatic",
    color: "Graphite Grey Magno (Matte)",
    interiorColor: "Black Nappa Leather",
    engine: "3.0L Inline-6 Turbo with EQ Boost",
    efficiency: "19 / 24 MPG",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    description: "A masterclass in executive utility and racing DNA. Fitted with the AMG performance exhaust system and finished in stealthy factory Matte Gray. The mild hybrid inline-six engine provides linear, supercharged execution alongside dual-zone utility.",
    features: ["AMG Performance Exhaust", "Burmester Surround Sound", "Stealth Matte Finish", "EQ Boost Starter", "Active Parking Assist", "AMG Ride Control+"]
  },
  {
    id: "6",
    make: "Land Rover",
    model: "Defender 110 V8",
    year: 2023,
    price: 112000,
    mileage: 5400,
    bodyType: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    color: "Carpathian Grey Satin Edition",
    interiorColor: "Ebony Windsor Leather/Alcantara",
    engine: "5.0L Supercharged V8 (518 hp)",
    efficiency: "14 / 19 MPG",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800",
    description: "Unmatched rugged capability combined with supercar power. This Defender Caravan Grey V8 features the iconic 518 hp engine, quad tailpipes, 22-inch satin dark gray wheels, and a luxury-trimmed interior. Ready for off-road expeditions in utter comfort.",
    features: ["Supercharged V8", "22-inch Satin Wheels", "Terrain Response 2 with Dynamic Mode", "Windsor Leather Trim", "Cold Climate Pack", "3D Surround Camera"]
  }
];

export const TESTIMONIALS = [
  {
    name: "Benjamin Vance",
    role: "Porsche 911 Owner",
    rating: 5,
    text: "CarFix completely changed my car buying standard. Their virtual interactive customization, 3D showroom layout, and quick financing flow made purchasing my Guards Red 911 Carrerea S incredibly straightforward. Absolute professionals.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Sophia Rodriguez",
    role: "Tesla Model S Plaid Owner",
    rating: 5,
    text: "The tech integration here is phenomenal! I started with their online AI chatbot assistant that gave me direct spec details, completed the finance application with competitive pre-approvals, and picked up my Tesla within a single day.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Marcus Sterling",
    role: "Audi e-tron GT Enthusiast",
    rating: 5,
    text: "Exceptional pricing clarity, no hidden costs or high-pressure dealership tactics. The 3D view scroll animation is incredibly immersive, perfectly matching the forward-thinking tech nature of the luxury cars they showcase.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Christopher Cole",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    bio: "Automotive visionary with over 15 years leading premium curated luxury car groups."
  },
  {
    name: "Aria Sterling",
    role: "Chief of Purchasing & Curation",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    bio: "Exquisite taste specialist selecting high-specification performance cars with detailed histories."
  },
  {
    name: "Damian Pierce",
    role: "Senior Finance Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    bio: "Designing competitive auto loans and flexible lease options with top global lenders."
  }
];

export const VALUES = [
  {
    title: "Absolute Integrity",
    desc: "Every vehicle undergoes a strict, certified 150-point diagnostic check, and we share complete structural records instantly."
  },
  {
    title: "Technological Purity",
    desc: "From virtual customizer setups, neural-powered chat guides, to fast online loan generation, we simplify buying."
  },
  {
    title: "Client Centered Care",
    desc: "A non-negotiable 3-day money-back satisfaction guarantee and dynamic support from specialists."
  }
];

export const FINANCE_FAQS = [
  {
    q: "How does the CarFix digital pre-approval work?",
    a: "Our encrypted loan form syncs directly with multiple luxury lending partners in real-time. By filling out your basic financial details, you can secure competitive auto loan rates in minutes with zero impact on your primary credit score inquiry."
  },
  {
    q: "Can I trade-in my current vehicle towards a purchase?",
    a: "Absolutely! We accept premium trades. You can use our secure chat, contact, or detailed vehicle sheet to request a professional valuation. We will offer a market-leading trade value applied directly to your down payment."
  },
  {
    q: "What types of loan terms are available?",
    a: "We construct terms ranging from 24 to 84 months depending on the model, vehicle price, and credit file. Most drivers prefer 60 or 72-month terms for optimal balance between monthly budget and interest value."
  },
  {
    q: "Do you offer pre-approvals for primary electric and hybrid models?",
    a: "Yes! CarFix is a forward-thinking destination. We offer specialized 'Green Loan' financing with lower premium rates specifically for zero-emission models like the Tesla Model S and Audi e-tron GT."
  }
];

export const SEO_METADATA = {
  home: {
    title: "CarFix | Premium Digital Automotive Showroom",
    desc: "Experience Houston's premier performance dealership. Browse top-curated Tesla, Porsche, BMW models, calculate financing, and consult our virtual assistant."
  },
  inventory: {
    title: "Curated Sport & Luxury Vehicle Inventory | CarFix",
    desc: "Discover your next precision machine. Search and instantly sort high-spec electric vehicles, performance SUVs, and sports coupes with full detail sheets."
  },
  financing: {
    title: "Competitive Luxury Car Loans & Financing | CarFix",
    desc: "Pre-approve your automotive loan online. Transparent rates, flexible duration terms, and specialized green-car incentives."
  },
  about: {
    title: "Our Heritage & Curatorial Philosophy | CarFix",
    desc: "CarFix is redefining vehicle buying with technological honesty, certified 150-point diagnostics, and absolute client transparency."
  },
  contact: {
    title: "Visit Our Cutting-Edge Showroom | CarFix Houston",
    desc: "Stop by for a beverage and schedule a high-performance test drive. View directions, operating hours, and live phone contacts."
  }
};
