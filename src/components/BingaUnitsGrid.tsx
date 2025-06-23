
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Home, Users, DollarSign, Calendar } from "lucide-react";

const BingaUnitsGrid = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Mock data for the 10 Binga Beach lots
  const lots = [
    { id: 1, name: "Sunset Villa", tokensSold: 3500, totalTokens: 10000, price: 25 },
    { id: 2, name: "Ocean Breeze", tokensSold: 2800, totalTokens: 10000, price: 25 },
    { id: 3, name: "Palm Paradise", tokensSold: 4200, totalTokens: 10000, price: 25 },
    { id: 4, name: "Coral Cove", tokensSold: 1900, totalTokens: 10000, price: 25 },
    { id: 5, name: "Seashell Sanctuary", tokensSold: 3100, totalTokens: 10000, price: 25 },
    { id: 6, name: "Tropical Retreat", tokensSold: 2400, totalTokens: 10000, price: 25 },
    { id: 7, name: "Azure Escape", tokensSold: 3800, totalTokens: 10000, price: 25 },
    { id: 8, name: "Bamboo Bliss", tokensSold: 2200, totalTokens: 10000, price: 25 },
    { id: 9, name: "Coconut Grove", tokensSold: 4500, totalTokens: 10000, price: 25 },
    { id: 10, name: "Starfish Shore", tokensSold: 1700, totalTokens: 10000, price: 25 }
  ];

  const handleInvestClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/dashboard');
    }
  };

  const getTotalProgress = () => {
    const totalSold = lots.reduce((sum, lot) => sum + lot.tokensSold, 0);
    const totalTokens = lots.reduce((sum, lot) => sum + lot.totalTokens, 0);
    return (totalSold / totalTokens) * 100;
  };

  const getTotalRaised = () => {
    const totalSold = lots.reduce((sum, lot) => sum + lot.tokensSold, 0);
    return totalSold * 25;
  };

  return (
    <section id="investment" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Investment Opportunities</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Choose Your Binga Beach Lot
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Own a fraction of paradise through our tokenized lots. Each lot offers the same 
            benefits: timeshare rights, governance voting, and revenue sharing.
          </p>

          {/* Project Progress */}
          <div className="bg-white rounded-xl p-8 shadow-sm border mb-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${getTotalRaised().toLocaleString()}
                </div>
                <div className="text-gray-600">Total Raised</div>
              </div>
              <div className="text-center">
                <Progress value={getTotalProgress()} className="mb-2" />
                <div className="text-sm text-gray-600">
                  {getTotalProgress().toFixed(1)}% of $2.5M Goal
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {Math.round((100000 - lots.reduce((sum, lot) => sum + lot.tokensSold, 0)) / 1000)}K
                </div>
                <div className="text-gray-600">BBT Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lots Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {lots.map((lot) => {
            const fundedPercentage = (lot.tokensSold / lot.totalTokens) * 100;
            const availableTokens = lot.totalTokens - lot.tokensSold;
            
            return (
              <div key={lot.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{lot.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    Lot {lot.id}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Home className="w-4 h-4" />
                    <span>Premium modular home + solar</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>${lot.price} per BBT token</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{lot.tokensSold.toLocaleString()} / {lot.totalTokens.toLocaleString()} sold</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Funded</span>
                      <span className="font-medium">{fundedPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={fundedPercentage} className="h-2" />
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {availableTokens.toLocaleString()}
                      </div>
                      <div className="text-xs text-blue-700">BBT Available</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleInvestClick}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Invest in {lot.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Every BBT Token Includes</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <Calendar className="w-8 h-8 mb-2" />
              <div className="font-medium">Timeshare Rights</div>
              <div className="text-sm opacity-90">~3.6 nights per 100 BBT</div>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="w-8 h-8 mb-2" />
              <div className="font-medium">Revenue Share</div>
              <div className="text-sm opacity-90">30% of rental income</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 mb-2" />
              <div className="font-medium">Governance</div>
              <div className="text-sm opacity-90">Vote on property decisions</div>
            </div>
            <div className="flex flex-col items-center">
              <Home className="w-8 h-8 mb-2" />
              <div className="font-medium">Amenities</div>
              <div className="text-sm opacity-90">Full resort access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BingaUnitsGrid;
