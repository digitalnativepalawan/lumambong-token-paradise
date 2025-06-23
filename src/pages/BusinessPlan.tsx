
import { useState } from "react";
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
import { ChevronRight, Download, Share2 } from "lucide-react";

const BusinessPlan = () => {
  const [activeSection, setActiveSection] = useState("executive-summary");

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Business Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive overview of Binga Beach tokenized real estate investment opportunity
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="modern-button px-6 py-3 rounded-xl">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="px-6 py-3 rounded-xl border-gray-300">
                <Share2 className="w-5 h-5 mr-2" />
                Share Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h3 className="text-lg font-semibold text-black mb-6">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between group ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <span className="font-medium">{section.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      activeSection === section.id ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`} />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-16">
              {sections.map((section) => {
                const Component = section.component;
                return (
                  <section key={section.id} id={section.id}>
                    <Component />
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
