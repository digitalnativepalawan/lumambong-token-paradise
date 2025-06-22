
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, Zap, FileText } from "lucide-react";

const InvestmentBreakdown = () => {
  const investmentItems = [
    {
      icon: Home,
      title: "Land & Construction",
      amount: "$180,000",
      description: "Prime beachfront land acquisition and luxury villa construction"
    },
    {
      icon: Zap,
      title: "Solar Power System",
      amount: "$25,000",
      description: "Complete off-grid solar setup with battery storage"
    },
    {
      icon: FileText,
      title: "Legal & Documentation",
      amount: "$15,000",
      description: "Full legal compliance, permits, and ownership documentation"
    },
    {
      icon: DollarSign,
      title: "Development Contingency",
      amount: "$10,000",
      description: "Buffer for unexpected costs and final touches"
    }
  ];

  return (
    <section id="investment" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Investment Breakdown</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Transparent Investment Structure
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every dollar accounted for in your path to Palawan paradise ownership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {investmentItems.map((item, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-600 mb-2">{item.amount}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-6 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-gray-700 mb-2">Total Investment Per Unit</p>
            <p className="text-4xl font-bold text-emerald-600">$230,000 USD</p>
            <p className="text-sm text-gray-600 mt-2">Complete turnkey ownership package</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentBreakdown;
