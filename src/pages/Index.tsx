
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectOverview from "@/components/ProjectOverview";
import DigitalSecuritiesUtility from "@/components/DigitalSecuritiesUtility";
import BingaUnitsGrid from "@/components/BingaUnitsGrid";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProjectOverview />
      <DigitalSecuritiesUtility />
      <BingaUnitsGrid />
      <LocationSection />
      <ContactSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
