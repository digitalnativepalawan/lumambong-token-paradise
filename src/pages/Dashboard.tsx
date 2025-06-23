
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Vote,
  Trophy,
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  const { user, userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  // Mock user data
  const userStats = {
    totalTokens: 2500,
    totalValue: 62500,
    monthlyDividends: 485,
    availableNights: 91,
    usedNights: 12,
    loyaltyStatus: "Gold"
  };

  const holdings = [
    { lotName: "Sunset Villa", tokens: 1000, value: 25000, dividends: 195 },
    { lotName: "Ocean Breeze", tokens: 800, value: 20000, dividends: 156 },
    { lotName: "Palm Paradise", tokens: 700, value: 17500, dividends: 134 }
  ];

  const upcomingStays = [
    { date: "Mar 15-18, 2024", lot: "Sunset Villa", nights: 3, status: "confirmed" },
    { date: "Apr 22-25, 2024", lot: "Ocean Breeze", nights: 3, status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {userProfile?.full_name || user?.email}
                </h1>
                <p className="text-blue-100">
                  Your Binga Beach Paradise Dashboard
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <Badge className="bg-yellow-500 text-yellow-900">
                  {userStats.loyaltyStatus} Member
                </Badge>
                <Trophy className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-600">Total BBT</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {userStats.totalTokens.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                ${userStats.totalValue.toLocaleString()} value
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-emerald-600" />
                <span className="font-medium text-gray-600">Monthly Dividends</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${userStats.monthlyDividends}
              </div>
              <div className="text-sm text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% vs last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                <span className="font-medium text-gray-600">Available Nights</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {userStats.availableNights}
              </div>
              <div className="text-sm text-gray-500">
                {userStats.usedNights} nights used this year
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Vote className="w-6 h-6 text-orange-600" />
                <span className="font-medium text-gray-600">Governance</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-500">Active proposals</div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">My Paradise</TabsTrigger>
              <TabsTrigger value="stays">My Stays</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Holdings */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-6">My Holdings</h3>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{holding.lotName}</div>
                        <div className="text-sm text-gray-600">
                          {holding.tokens} BBT • ${holding.value.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-emerald-600">
                          ${holding.dividends}/month
                        </div>
                        <div className="text-sm text-gray-500">dividends</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Dividend payment received</span>
                    <span className="font-medium text-emerald-600">+$485</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Voted on maintenance proposal</span>
                    <span className="text-blue-600">Approved</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Booked stay at Sunset Villa</span>
                    <span className="text-gray-600">3 nights</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stays" className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">My Stays & Timeshare</h3>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Book New Stay
                  </Button>
                </div>

                {/* Upcoming Stays */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4">Upcoming Stays</h4>
                  <div className="space-y-3">
                    {upcomingStays.map((stay, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-medium">{stay.date}</div>
                          <div className="text-sm text-gray-600">{stay.lot} • {stay.nights} nights</div>
                        </div>
                        <Badge variant={stay.status === 'confirmed' ? 'default' : 'secondary'}>
                          {stay.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Nights */}
                <div>
                  <h4 className="font-medium mb-4">Your Timeshare Allocation</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {holdings.map((holding, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="font-medium mb-2">{holding.lotName}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          {Math.floor((holding.tokens / 10000) * 365)} nights/year allocated
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          Book Nights
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="governance" className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Active Proposals</h3>
                  <Button 
                    onClick={() => navigate('/governance')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Annual Maintenance Budget Approval</h4>
                      <Badge>Voting</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Approve $45,000 budget for property maintenance and improvements.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Vote Yes
                      </Button>
                      <Button size="sm" variant="outline">
                        Vote No
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="marketplace" className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Secondary Market</h3>
                  <Button 
                    onClick={() => navigate('/marketplace')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    View Marketplace <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Sell BBT Tokens</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      List your tokens for sale on the secondary market.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Create Listing
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Trade Timeshare Nights</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Exchange or sell your allocated nights to other holders.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      List Nights
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
