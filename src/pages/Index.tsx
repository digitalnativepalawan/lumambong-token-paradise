import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PropertyShowcase from "@/components/PropertyShowcase";
import InvestmentBreakdown from "@/components/InvestmentBreakdown";
import SolarPowerSection from "@/components/SolarPowerSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <PropertyShowcase />
      <InvestmentBreakdown />
      <SolarPowerSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
