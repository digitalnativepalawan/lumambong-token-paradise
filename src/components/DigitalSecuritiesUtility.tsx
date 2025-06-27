
import DigitalSecuritiesHeader from "./digital-securities/DigitalSecuritiesHeader";
import UtilityGrid from "./digital-securities/UtilityGrid";
import SecuritiesDistribution from "./digital-securities/SecuritiesDistribution";
import DevelopmentRoadmap from "./digital-securities/DevelopmentRoadmap";
import UtilityCTA from "./digital-securities/UtilityCTA";

const DigitalSecuritiesUtility = () => {
  return (
    <section id="utility" className="section-container">
      <div className="max-w-7xl mx-auto px-6">
        <DigitalSecuritiesHeader />
        <UtilityGrid />
        
        {/* Securities distribution and roadmap section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <SecuritiesDistribution />
          <DevelopmentRoadmap />
        </div>

        <UtilityCTA />
      </div>
    </section>
  );
};

export default DigitalSecuritiesUtility;
