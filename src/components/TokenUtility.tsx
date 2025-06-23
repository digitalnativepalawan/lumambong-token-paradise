
import { Badge } from "@/components/ui/badge";
import { Calendar, Vote, DollarSign, Users, Trophy, RefreshCw } from "lucide-react";

const TokenUtility = () => {
  const utilities = [
    {
      icon: Calendar,
      title: "Timeshare Rights",
      description: "Proportional annual stay rights based on token ownership. Own 10% = ~36 nights per year.",
      highlight: "Flexible usage, trade nights, or monetize unused allocations"
    },
    {
      icon: Vote,
      title: "Governance Voting",
      description: "Vote on property decisions, budgets, and management. All votes recorded on-chain.",
      highlight: "Direct influence on your investment's future"
    },
    {
      icon: DollarSign,
      title: "Revenue Sharing",
      description: "Receive 30% of rental revenue as automatic dividends distributed to token holders.",
      highlight: "Passive income from resort operations"
    },
    {
      icon: Users,
      title: "Community Benefits",
      description: "Access to exclusive amenities, priority booking, and holder-only events.",
      highlight: "Premium lifestyle perks and networking"
    },
    {
      icon: Trophy,
      title: "Loyalty Rewards",
      description: "Long-term holders receive bonus nights, higher dividend rates, and service discounts.",
      highlight: "Rewards for commitment and community building"
    },
    {
      icon: RefreshCw,
      title: "Token Buybacks",
      description: "20% of profits used for token buybacks, reducing supply and potentially increasing value.",
      highlight: "Built-in value appreciation mechanism"
    }
  ];

  return (
    <section id="utility" className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">Token Utility</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Binga Beach Token (BBT) Benefits
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            BBT is more than ownership—it's your key to an exclusive beachfront lifestyle 
            with financial returns, personal use rights, and community governance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {utilities.map((utility, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <utility.icon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-900">{utility.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{utility.description}</p>
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800">{utility.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Value Proposition */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">The BBT Advantage</h3>
            <p className="text-lg text-gray-700">
              Traditional timeshares and real estate investments can't match our innovative model
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-red-800">Traditional Timeshare</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>❌ Fixed weeks, rigid scheduling</li>
                <li>❌ High annual fees</li>
                <li>❌ "Use it or lose it" policy</li>
                <li>❌ No ownership or governance</li>
                <li>❌ Difficult to exit or trade</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-yellow-800">Real Estate Crowdfunding</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>⚠️ Financial returns only</li>
                <li>⚠️ No personal use rights</li>
                <li>⚠️ Limited governance</li>
                <li>⚠️ Illiquid investments</li>
                <li>⚠️ High minimum investments</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-emerald-800">BBT Model</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ Flexible booking system</li>
                <li>✅ Monetize unused nights</li>
                <li>✅ True fractional ownership</li>
                <li>✅ Full governance rights</li>
                <li>✅ Liquid secondary market</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenUtility;
