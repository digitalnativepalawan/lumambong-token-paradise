
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, TrendingUp, Shield } from "lucide-react";

const ExecutiveSummary = () => {
  const highlights = [
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Lumambong Beach, San Vicente, Palawan - UNESCO Biosphere Reserve"
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Tokenized ownership with governance rights and timeshare benefits"
    },
    {
      icon: TrendingUp,
      title: "Strong ROI Potential",
      description: "Multiple revenue streams including rental income and token appreciation"
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Full SEC registration and environmental compliance in the Philippines"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Executive Summary</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className="bg-green-100 text-green-700 border-green-200">Live Project</Badge>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">Tokenized Real Estate</Badge>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">Eco-Tourism</Badge>
        </div>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Binga Beach represents a pioneering approach to real estate investment through blockchain tokenization. 
            Located on the pristine shores of Lumambong Beach in Palawan, Philippines, this project combines 
            sustainable eco-tourism development with innovative financial technology to create accessible 
            investment opportunities in premium beachfront property.
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            Through the BBT (Binga Beach Token) ecosystem, investors can own fractional shares of modular 
            beachfront homes, participate in governance decisions, enjoy timeshare rights, and benefit from 
            multiple revenue streams including rental income and token value appreciation.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Key Investment Highlights</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold text-blue-600">$25</div>
                <div className="text-sm text-blue-700">Token Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">$2.5M</div>
                <div className="text-sm text-blue-700">Funding Goal</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">10</div>
                <div className="text-sm text-blue-700">Modular Units</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">60/40</div>
                <div className="text-sm text-blue-700">Filipino/Foreign Split</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {highlights.map((highlight, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <highlight.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">{highlight.title}</h4>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveSummary;
