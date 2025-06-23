
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Vote, Users, Clock, CheckCircle } from "lucide-react";

const Governance = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const proposals = [
    {
      id: 1,
      title: "Annual Maintenance Budget Approval",
      description: "Approve $45,000 annual budget for property maintenance, landscaping, and facility improvements across all 10 lots.",
      status: "active",
      yesVotes: 75420,
      noVotes: 12380,
      totalVotingPower: 100000,
      endDate: "2024-03-30",
      category: "Budget"
    },
    {
      id: 2,
      title: "Install Electric Vehicle Charging Stations",
      description: "Install 4 Tesla-compatible EV charging stations in the resort parking area. Estimated cost: $12,000.",
      status: "active",
      yesVotes: 68920,
      noVotes: 8100,
      totalVotingPower: 100000,
      endDate: "2024-04-05",
      category: "Infrastructure"
    },
    {
      id: 3,
      title: "Property Manager Selection",
      description: "Select new on-site property management company from the three vetted candidates presented.",
      status: "pending",
      yesVotes: 0,
      noVotes: 0,
      totalVotingPower: 100000,
      endDate: "2024-04-15",
      category: "Management"
    },
    {
      id: 4,
      title: "Solar Panel Upgrade Program",
      description: "Upgrade all solar systems from 10kVA to 15kVA with battery backup. Total cost: $85,000 funded from reserves.",
      status: "passed",
      yesVotes: 81240,
      noVotes: 18760,
      totalVotingPower: 100000,
      endDate: "2024-02-28",
      category: "Infrastructure"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "passed": return "bg-emerald-100 text-emerald-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVotePercentage = (yesVotes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return (yesVotes / totalVotes) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Governance</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Community Governance
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Shape the future of Binga Beach through democratic voting. Every BBT token 
              represents one vote in key property decisions.
            </p>
          </div>

          {/* Governance Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">847</div>
              <div className="text-sm text-gray-600">Active Voters</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Vote className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Total Proposals</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Active Votes</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">78%</div>
              <div className="text-sm text-gray-600">Participation Rate</div>
            </div>
          </div>

          {/* How Governance Works */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">How Governance Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-bold mb-2">Proposal Submission</h4>
                <p className="text-sm text-gray-600">
                  Community members or management submit proposals for property decisions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-emerald-600">2</span>
                </div>
                <h4 className="font-bold mb-2">Community Voting</h4>
                <p className="text-sm text-gray-600">
                  BBT holders vote with 1 token = 1 vote. All votes recorded on-chain
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-bold mb-2">Implementation</h4>
                <p className="text-sm text-gray-600">
                  Approved proposals are implemented transparently with community oversight
                </p>
              </div>
            </div>
          </div>

          {/* Proposals */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">All Proposals</h3>
            
            {proposals.map((proposal) => {
              const totalVotes = proposal.yesVotes + proposal.noVotes;
              const yesPercentage = getVotePercentage(proposal.yesVotes, totalVotes);
              const participation = (totalVotes / proposal.totalVotingPower) * 100;
              
              return (
                <div key={proposal.id} className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">{proposal.title}</h4>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        <Badge variant="outline">{proposal.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{proposal.description}</p>
                    </div>
                  </div>
                  
                  {proposal.status !== "pending" && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Voting Results</span>
                        <span className="text-sm text-gray-600">
                          {totalVotes.toLocaleString()} votes ({participation.toFixed(1)}% participation)
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-600">Yes ({proposal.yesVotes.toLocaleString()})</span>
                          <span className="text-emerald-600">{yesPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={yesPercentage} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-red-600">No ({proposal.noVotes.toLocaleString()})</span>
                          <span className="text-red-600">{(100 - yesPercentage).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      Voting ends: {new Date(proposal.endDate).toLocaleDateString()}
                    </div>
                    
                    {proposal.status === "active" && (
                      <div className="flex gap-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          Vote Yes
                        </Button>
                        <Button variant="outline">
                          Vote No
                        </Button>
                      </div>
                    )}
                    
                    {proposal.status === "pending" && (
                      <Badge variant="secondary">Voting starts soon</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Have a Proposal?</h3>
            <p className="mb-6 text-purple-100">
              BBT holders can submit proposals for community consideration. 
              All proposals require a minimum of 1,000 BBT tokens to submit.
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Submit Proposal
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Governance;
