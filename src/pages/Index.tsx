
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PropertyShowcase from "@/components/PropertyShowcase";
import LocationSection from "@/components/LocationSection";
import UnitsGrid from "@/components/UnitsGrid";
import InvestmentBreakdown from "@/components/InvestmentBreakdown";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="property">
        <PropertyShowcase />
      </div>
      <div id="location">
        <LocationSection />
      </div>
      <div id="units">
        <UnitsGrid />
      </div>
      <div id="investment">
        <InvestmentBreakdown />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
