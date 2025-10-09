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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Share2, Menu, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PageContent {
  id: string;
  page_type: string;
  section_id: string;
  title: string;
  content: string;
  order_index: number;
  is_active: boolean;
}

const BusinessPlan = () => {
  const [activeSection, setActiveSection] = useState("executive-summary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dynamicContent, setDynamicContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [configButtons, setConfigButtons] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchDynamicContent();
    fetchConfigurableButtons();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_type', 'business_plan')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setDynamicContent(data || []);
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfigurableButtons = async () => {
    try {
      const { data, error } = await supabase
        .from('business_plan_buttons')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setConfigButtons(data || []);
    } catch (error) {
      console.error('Error fetching configurable buttons:', error);
    }
  };

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
    window.open('https://docs.google.com/presentation/d/1j9k6SWRkJr1dX6MHmdKWJzHnmqtgvmWd/edit?usp=sharing&ouid=101773356807952039060&rtpof=true&sd=true', '_blank');
  };

  const handleModulePriceClick = () => {
    window.open('https://drive.google.com/file/d/12ipQxG1LQONp8Fcb9DsPjh7nyuuZqEiB/view?usp=sharing', '_blank');
  };

  const handleModuleSpecsClick = () => {
    window.open('https://drive.google.com/file/d/1nSow1wwZnDee7CQur0rmU3rxFhEc4Y46/view?usp=sharing', '_blank');
  };


  const handleUpgradedModuleClick = () => {
    window.open('https://drive.google.com/file/d/1lEUW4tBWYpKNLYSxH_oXedd2EJZ6Rpxk/view?usp=sharing', '_blank');
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
              Comprehensive overview of Palawan Collective digital securities real estate investment opportunity
            </p>
            
            {/* Action buttons */}
            <div className="space-y-4 max-w-5xl mx-auto">
              {/* Original buttons - now with sleek modern styling */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
                <button 
                  onClick={handleAngelInvestorClick}
                  className="web3-button gap-1"
                >
                  <Users className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Angel Investor</span>
                </button>
                <button 
                  onClick={handleModulePriceClick}
                  className="web3-button"
                >
                  <span className="truncate">Module Price</span>
                </button>
                <button 
                  onClick={handleModuleSpecsClick}
                  className="web3-button"
                >
                  <span className="truncate">Module Specs</span>
                </button>
                <button 
                  onClick={handleUpgradedModuleClick}
                  className="web3-button"
                >
                  <span className="truncate">Upgraded Module</span>
                </button>
              </div>

              {/* Configurable buttons */}
              {configButtons.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
                  {configButtons.map((button) => (
                    <button 
                      key={button.id}
                      onClick={() => window.open(button.url, '_blank')}
                      className="web3-button"
                    >
                      <span className="truncate">{button.name}</span>
                    </button>
                  ))}
                </div>
              )}
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
              {/* Dynamic Content */}
              {loading ? (
                <div className="text-center">Loading content...</div>
              ) : (
                dynamicContent.map((section) => (
                  <Card key={section.id} id={section.section_id} className="scroll-mt-20 md:scroll-mt-24">
                    <CardHeader>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap text-gray-700">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

              {/* Static Sections */}
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
