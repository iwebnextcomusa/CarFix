import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header and API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU", // Fallback to provided developer key if not in secrets
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Mock inventory data for backend API as well, should be synchronized
const VEHICLES_DATA = [
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

// AI Chatbot secure proxy endpoint
app.post("/api/chatbot", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
      return;
    }

    // Format context for CarFix AI Representative
    const inventoryListText = VEHICLES_DATA.map(v => 
      `- ${v.year} ${v.make} ${v.model} (${v.bodyType}, $${v.price.toLocaleString()}, ${v.mileage.toLocaleString()} miles, ${v.fuelType}, Engine: ${v.engine})`
    ).join("\n");

    const systemInstruction = `You are the 'CarFix Virtual AI Specialist' for CarFix, a premier high-tech automotive dealership. 
Your task is to help customers brows vehicles, explain vehicle specs, describe financing advantages, or help schedule a test drive. 
Always stay within character, be helpful, professional, polite, and enthusiastic.

Here is the current real-time inventory of vehicles available at CarFix:
${inventoryListText}

Company Info:
- Name: CarFix
- Location: 1000 Luxury Motors Way, Houston, TX 77002
- Business Hours: Mon-Sat 9:00 AM - 7:00 PM, Closed Sunday
- Contact Phone: (800) 555-FIX-CAR (800-555-3492)
- Contact Email: sales@carfixdealership.com
- Main selling arguments: Sleek modern visual customization, real financing with competitive rates, 150-point inspection on all cars, 3-day money-back guarantee, dynamic and honest pricing, and professional virtual showroom.

Rules:
1. Speak about the vehicles naturally. Refer to the model list content above to recommend cars that match the user's requirements (budget, body type, speed, electric/gas, etc.).
2. Do not offer models that are not in this inventory unless explaining that we can order them custom.
3. Keep responses clean, descriptive, and moderately concise (at most 2-4 sentences or short paragraphs unless explaining specifications). Use bullet points for car specs.
4. If they ask about financing, outline how they can use our online Finance Application which guarantees fast processing.
5. If they want to test drive, summarize that they can easily fill out the scheduled test drive form on our detail sheets.`;

    // Map frontend message history to GoogleGenAI format
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Call Gemini API securely
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I'm having trouble processing your query. How can I help you check our premium inventory?";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Error in secure Gemini API proxy:", error);
    res.status(500).json({ 
      error: "Failed to connect to AI service.", 
      details: error.message || "Unknown error" 
    });
  }
});

// App API to fetch inventory
app.get("/api/inventory", (req, res) => {
  res.json(VEHICLES_DATA);
});

// Boot the Vite Dev Server or serve production static assets
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode. Serving static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    // Fallback standard single asterisk for other routers (Express 4 fallback)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CarFix Server is successfully running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start CarFix Server:", err);
});
