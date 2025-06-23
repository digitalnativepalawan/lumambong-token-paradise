
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExecutiveSummary from "@/components/business-plan/ExecutiveSummary";
import MarketAnalysis from "@/components/business-plan/MarketAnalysis";
import BusinessModel from "@/components/business-plan/BusinessModel";
import RevenueStreams from "@/components/business-plan/RevenueStreams";
import ManagementStructure from "@/components/business-plan/ManagementStructure";
import RiskAssessment from "@/components/business-plan/RiskAssessment";
import FinancialProjections from "@/components/business-plan/FinancialProjections";
import TechnicalImplementation from "@/components/business-plan/TechnicalImplementation";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Share2, Menu } from "lucide-react";

const BusinessPlan = () => {
  const [activeSection, setActiveSection] = useState("executive-summary");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: "executive-summary", title: "Executive Summary", component: ExecutiveSummary },
    { id: "market-analysis", title: "Market Analysis", component: MarketAnalysis },
    { id: "business-model", title: "Business Model", component: BusinessModel },
    { id: "revenue-streams", title: "Revenue Streams", component: RevenueStreams },
    { id: "management", title: "Management Structure", component: ManagementStructure },
    { id: "risk-assessment", title: "Risk Assessment", component: RiskAssessment },
    { id: "financial-projections", title: "Financial Projections", component: FinancialProjections },
    { id: "technical", title: "Technical Implementation", component: TechnicalImplementation },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 pt-20 md:pt-24 pb-8 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6">
              Business Plan
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Comprehensive overview of Binga Beach tokenized real estate investment opportunity
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button className="modern-button px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base">
                <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="px-4 md:px-6 py-2 md:py-3 rounded-xl border-gray-300 text-sm md:text-base">
                <Share2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Share Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="flex">
          {/* Mobile Sidebar Toggle */}
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-32 left-4 z-50 modern-button p-2 rounded-lg shadow-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Sidebar Navigation */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-auto
            transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
            transition-transform duration-300 ease-in-out
            bg-white lg:bg-transparent border-r lg:border-r-0 border-gray-200
            lg:flex-shrink-0 lg:block
          `}>
            <div className="h-full overflow-y-auto pt-20 lg:pt-0 px-4 lg:px-0">
              <div className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                <h3 className="text-lg font-semibold text-black mb-6">Sections</h3>
                <nav className="space-y-2 pb-6">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors flex items-center justify-between group text-sm md:text-base ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      <span className="font-medium">{section.title}</span>
                      <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${
                        activeSection === section.id ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 lg:ml-6 xl:ml-12">
            <div className="space-y-12 md:space-y-16">
              {sections.map((section) => {
                const Component = section.component;
                return (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="max-w-none">
                      <Component />
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessPlan;
