
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectOverview from "@/components/ProjectOverview";
import TokenUtility from "@/components/TokenUtility";
import BingaUnitsGrid from "@/components/BingaUnitsGrid";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProjectOverview />
      <TokenUtility />
      <BingaUnitsGrid />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
