export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: "Sedan" | "Coupe" | "SUV" | "Truck" | "Convertible" | "Hatchback";
  fuelType: "Gasoline" | "Electric" | "Hybrid" | "Diesel";
  transmission: "Automatic" | "Manual" | "Automatic (PDK)";
  color: string;
  interiorColor: string;
  engine: string;
  efficiency: string;
  image: string;
  description: string;
  features: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicleId?: string;
  preferredContact: "email" | "phone";
}

export interface TestDriveFormInput {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  vehicleId: string;
  licenseNumber: string;
}

export interface FinanceFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  ssnMasked: string;
  annualIncome: number;
  employmentStatus: string;
  downPayment: number;
  loanTermMonths: number;
  vehicleId?: string;
}

export interface InventoryFilters {
  search: string;
  make: string;
  model: string;
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  mileageMax: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
}

export type PageType = "home" | "inventory" | "vehicle-details" | "financing" | "about" | "contact";
