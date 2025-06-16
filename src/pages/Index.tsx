
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PropertyShowcase from "@/components/PropertyShowcase";
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
