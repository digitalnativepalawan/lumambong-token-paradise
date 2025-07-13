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
import SandboxSECPhilippines from "@/components/business-plan/SandboxSECPhilippines";
import { Button } from "@/components/ui/button";
import { ChevronRight, Share2, Menu, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessPlan = () => {
  const [activeSection, setActiveSection] = useState("executive-summary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const sections = [
    { id: "executive-summary", title: "Executive Summary", component: ExecutiveSummary },
    { id: "market-analysis", title: "Market Analysis", component: MarketAnalysis },
    { id: "business-model", title: "Business Model", component: BusinessModel },
    { id: "revenue-streams", title: "Revenue Streams", component: RevenueStreams },
    { id: "management", title: "Management Structure", component: ManagementStructure },
    { id: "risk-assessment", title: "Risk Assessment", component: RiskAssessment },
    { id: "financial-projections", title: "Financial Projections", component: FinancialProjections },
    { id: "technical", title: "Technical Implementation", component: TechnicalImplementation },
    { id: "sandbox-sec", title: "Sandbox SEC Philippines", component: SandboxSECPhilippines },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAngelInvestorClick = () => {
    window.open('https://drive.google.com/file/d/1TZRI0g0Wpkh-y07WKSHbdBacxpIzbeCx/view?usp=sharing', '_blank');
  };

  const handleModulePriceClick = () => {
    window.open('https://drive.google.com/file/d/12ipQxG1LQONp8Fcb9DsPjh7nyuuZqEiB/view?usp=sharing', '_blank');
  };

  const handleModuleSpecsClick = () => {
    window.open('https://drive.google.com/file/d/1nSow1wwZnDee7CQur0rmU3rxFhEc4Y46/view?usp=sharing', '_blank');
  };


  const handleSharePlan = async () => {
    const currentUrl = window.location.href;
    
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link Copied!",
        description: "Business plan link has been copied to your clipboard.",
      });
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      toast({
        title: "Share Link",
        description: "Copy this link to share: " + currentUrl,
      });
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 pt-20 md:pt-24 pb-6 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-3 md:mb-6">
              Business Plan
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-8 px-2">
              Comprehensive overview of Binga Beach digital securities real estate investment opportunity
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center px-2 max-w-4xl mx-auto">
              <Button 
                onClick={handleAngelInvestorClick}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base w-full sm:w-auto"
              >
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">Angel Investor</span>
              </Button>
              <Button 
                onClick={handleModulePriceClick}
                className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base w-full sm:w-auto"
              >
                <span className="truncate">Module Price</span>
              </Button>
              <Button 
                onClick={handleModuleSpecsClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base w-full sm:w-auto"
              >
                <span className="truncate">Module Specs</span>
              </Button>
              <Button 
                onClick={handleSharePlan}
                variant="outline" 
                className="px-3 md:px-6 py-2 md:py-3 rounded-xl border-gray-300 text-sm md:text-base w-full sm:w-auto"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">Share Plan</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8">
        <div className="flex relative">
          {/* Mobile Sidebar Toggle */}
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-28 left-2 z-50 modern-button p-2 rounded-lg shadow-lg"
          >
            <Menu className="w-4 h-4" />
          </Button>

          {/* Sidebar Navigation */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-40 w-72 lg:w-auto
            transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
            transition-transform duration-300 ease-in-out
            bg-white lg:bg-transparent border-r lg:border-r-0 border-gray-200
            lg:flex-shrink-0 lg:block overflow-y-auto
          `}>
            <div className="h-full pt-16 lg:pt-0 px-3 lg:px-0">
              <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                <h3 className="text-base md:text-lg font-semibold text-black mb-4 md:mb-6">Sections</h3>
                <nav className="space-y-1 md:space-y-2 pb-6">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 md:py-3 rounded-lg transition-colors flex items-center justify-between group text-sm md:text-base ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      <span className="font-medium truncate pr-2">{section.title}</span>
                      <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 transition-transform flex-shrink-0 ${
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
          <div className="flex-1 lg:ml-6 xl:ml-12 min-w-0">
            <div className="space-y-8 md:space-y-12">
              {sections.map((section) => {
                const Component = section.component;
                return (
                  <section key={section.id} id={section.id} className="scroll-mt-20 md:scroll-mt-24">
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
