
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Home,
  Clock,
  User
} from "lucide-react";

const Marketplace = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const tokenListings = [
    {
      id: 1,
      seller: "beachfan123",
      lotName: "Sunset Villa",
      tokens: 500,
      pricePerToken: 26.50,
      totalValue: 13250,
      listed: "2 hours ago"
    },
    {
      id: 2,
      seller: "cryptoinvestor",
      lotName: "Ocean Breeze",
      tokens: 1200,
      pricePerToken: 25.75,
      totalValue: 30900,
      listed: "5 hours ago"
    },
    {
      id: 3,
      seller: "palawanlover",
      lotName: "Palm Paradise",
      tokens: 750,
      pricePerToken: 27.00,
      totalValue: 20250,
      listed: "1 day ago"
    }
  ];

  const nightListings = [
    {
      id: 1,
      seller: "vacationrenter",
      lotName: "Coral Cove",
      dates: "Apr 15-18, 2024",
      nights: 3,
      pricePerNight: 180,
      totalPrice: 540,
      listed: "3 hours ago"
    },
    {
      id: 2,
      seller: "busyexec",
      lotName: "Seashell Sanctuary",
      dates: "May 1-5, 2024",
      nights: 4,
      pricePerNight: 200,
      totalPrice: 800,
      listed: "6 hours ago"
    },
    {
      id: 3,
      seller: "familytime",
      lotName: "Tropical Retreat",
      dates: "Jun 10-14, 2024",
      nights: 4,
      pricePerNight: 195,
      totalPrice: 780,
      listed: "1 day ago"
    }
  ];

  const marketStats = {
    avgTokenPrice: 26.15,
    priceChange: 4.2,
    volume24h: 89750,
    avgNightPrice: 185,
    nightsTraded: 47
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Marketplace</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              BBT Secondary Market
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Trade BBT tokens and timeshare nights with other community members. 
              All transactions are secure and transparent.
            </p>
          </div>

          {/* Market Stats */}
          <div className="grid md:grid-cols-5 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">${marketStats.avgTokenPrice}</div>
              <div className="text-sm text-gray-600">Avg Token Price</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-emerald-600">+{marketStats.priceChange}%</div>
              <div className="text-sm text-gray-600">24h Change</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Home className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">${marketStats.volume24h.toLocaleString()}</div>
              <div className="text-sm text-gray-600">24h Volume</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">${marketStats.avgNightPrice}</div>
              <div className="text-sm text-gray-600">Avg Night Price</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Clock className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{marketStats.nightsTraded}</div>
              <div className="text-sm text-gray-600">Nights Traded</div>
            </div>
          </div>

          {/* Marketplace Tabs */}
          <Tabs defaultValue="tokens" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tokens">BBT Tokens</TabsTrigger>
              <TabsTrigger value="nights">Timeshare Nights</TabsTrigger>
            </TabsList>

            <TabsContent value="tokens" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Token Listings</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sell My Tokens
                </Button>
              </div>

              <div className="grid gap-6">
                {tokenListings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{listing.lotName}</h4>
                          <Badge variant="outline">{listing.tokens} BBT</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{listing.seller}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{listing.listed}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          ${listing.pricePerToken} per token
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          ${listing.totalValue.toLocaleString()}
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          Buy Tokens
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* How Token Trading Works */}
              <div className="bg-blue-50 rounded-xl p-6 mt-8">
                <h4 className="font-bold mb-4">How Token Trading Works</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">1. Browse Listings</div>
                    <div className="text-gray-600">Find tokens from the lots you want to invest in</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">2. Secure Purchase</div>
                    <div className="text-gray-600">All transactions are handled through smart contracts</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">3. Instant Transfer</div>
                    <div className="text-gray-600">Tokens and ownership rights transfer immediately</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nights" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Timeshare Night Listings</h3>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  List My Nights
                </Button>
              </div>

              <div className="grid gap-6">
                {nightListings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{listing.lotName}</h4>
                          <Badge variant="outline">{listing.nights} nights</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{listing.seller}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{listing.listed}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {listing.dates} • ${listing.pricePerNight}/night
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          ${listing.totalPrice}
                        </div>
                        <Button className="bg-orange-600 hover:bg-orange-700">
                          Book Nights
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* How Night Trading Works */}
              <div className="bg-purple-50 rounded-xl p-6 mt-8">
                <h4 className="font-bold mb-4">How Timeshare Trading Works</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">1. List Your Nights</div>
                    <div className="text-gray-600">Can't use your allocation? List it for other holders</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">2. Set Your Price</div>
                    <div className="text-gray-600">Price your nights competitively for quick booking</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">3. Earn Revenue</div>
                    <div className="text-gray-600">Receive payment when someone books your nights</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Trading Benefits */}
          <div className="mt-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Why Trade on Our Marketplace?</h3>
              <p className="text-blue-100">
                The only official secondary market for BBT tokens and timeshare nights
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="font-bold mb-1">Low Fees</div>
                <div className="text-sm text-blue-100">Only 2% trading fee</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="w-6 h-6" />
                </div>
                <div className="font-bold mb-1">Secure</div>
                <div className="text-sm text-blue-100">Smart contract protected</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="font-bold mb-1">Liquid</div>
                <div className="text-sm text-blue-100">Active trading community</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="font-bold mb-1">Flexible</div>
                <div className="text-sm text-blue-100">Trade tokens or nights</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
