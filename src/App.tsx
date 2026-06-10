import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";

// Sub views directories
import HomeView from "./views/HomeView";
import InventoryView from "./views/InventoryView";
import DetailsView from "./views/DetailsView";
import FinancingView from "./views/FinancingView";
import AboutView from "./views/AboutView";
import ContactView from "./views/ContactView";

import { PageType } from "./types";
import { SEO_METADATA } from "./data";

export default function App() {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [preFilter, setPreFilter] = useState<{ category: string; value: string } | null>(null);

  // Hook to handle SEO metadata updates dynamically on state changes
  useEffect(() => {
    // Scroll smoothly to top on any view navigation
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Handle deep page SEO headers
    let meta = SEO_METADATA.home;
    if (activePage === "inventory") meta = SEO_METADATA.inventory;
    else if (activePage === "financing") meta = SEO_METADATA.financing;
    else if (activePage === "about") meta = SEO_METADATA.about;
    else if (activePage === "contact") meta = SEO_METADATA.contact;

    document.title = meta.title;
    
    // Attempt to locate and update description meta tags if they exist
    const docMetaDesc = document.querySelector("meta[name='description']");
    if (docMetaDesc) {
      docMetaDesc.setAttribute("content", meta.desc);
    }
  }, [activePage]);

  // Handler for direct Page changes
  const handleChangePage = (page: PageType, autoSelectFilter?: { category: string; value: string }) => {
    setPreFilter(autoSelectFilter || null);
    setSelectedVehicleId(null);
    setActivePage(page);
  };

  // Handler for clicking "Details" on an individual car
  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
    setActivePage("vehicle-details");
  };

  // View switch router renderer
  const renderViewContent = () => {
    switch (activePage) {
      case "inventory":
        return (
          <InventoryView 
            onSelectVehicle={handleSelectVehicle} 
            onNavigate={handleChangePage}
            preFilter={preFilter}
          />
        );
      case "vehicle-details":
        return (
          <DetailsView 
            vehicleId={selectedVehicleId || "1"} 
            onSelectVehicle={handleSelectVehicle}
            onNavigate={handleChangePage}
          />
        );
      case "financing":
        return <FinancingView />;
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "home":
      default:
        return (
          <HomeView 
            onNavigate={handleChangePage} 
            onSelectVehicle={handleSelectVehicle} 
          />
        );
    }
  };

  return (
    <div id="carfix-applet-root" className="min-h-screen bg-slate-950 flex flex-col justify-between selection:bg-accent selection:text-slate-950 text-slate-100 overflow-x-hidden antialiased font-sans">
      
      {/* 1. Sticky Navigation Bar with Mega Menu */}
      <Navbar activePage={activePage} onChangePage={handleChangePage} />

      {/* 2. Main Page Content View Port with smooth fade animations */}
      <main className="flex-1 w-full animate-fade-in">
        {renderViewContent()}
      </main>

      {/* 3. Center-Aligned Footers containing standard Developer coordinates */}
      <Footer onChangePage={handleChangePage} />

      {/* 4. Secure AI Floating Advisor Chat Widget */}
      <Chatbot />

      {/* 5. Fluid Scroll-to-Top trigger */}
      <ScrollToTop />

    </div>
  );
}
