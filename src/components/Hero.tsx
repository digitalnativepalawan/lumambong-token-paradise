
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, ArrowRight, Play, TrendingUp, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleInvestClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate('/dashboard');
  };

  const stats = [
    { icon: TrendingUp, label: "Token Value", value: "$25", change: "+12.5%" },
    { icon: Users, label: "Investors", value: "1,247", change: "+8.2%" },
    { icon: MapPin, label: "Properties", value: "10", change: "100%" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="mb-8 animate-fade-in-up">
          <Badge className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-500/20 text-purple-200 border border-purple-400/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Investment Platform
          </Badge>
        </div>

        {/* Main heading with improved contrast */}
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="gradient-text">Own a Fraction</span>
            <br />
            <span className="text-high-contrast">of Paradise</span>
          </h1>
          <p className="text-xl md:text-2xl text-medium-contrast max-w-4xl mx-auto leading-relaxed">
            Tokenized beachfront real estate in Palawan, Philippines. 
            <span className="gradient-text font-semibold"> Invest. Stay. Govern.</span>
          </p>
        </div>

        {/* CTA buttons */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleInvestClick}
            className="gradient-button px-8 py-4 text-lg h-auto rounded-xl group font-semibold"
          >
            <span>Start Investing</span>
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="outline" 
            className="px-8 py-4 text-lg h-auto rounded-xl glass border-purple-400/40 text-high-contrast hover:bg-purple-500/20 group font-medium"
          >
            <Play className="mr-2 w-5 h-5" />
            <span>Watch Demo</span>
          </Button>
        </div>

        {/* Stats grid with improved readability */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="glow-card p-6 rounded-2xl group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm">
                  <stat.icon className="w-6 h-6 text-purple-300" />
                </div>
              </div>
              <div className="text-2xl font-bold text-high-contrast mb-1">{stat.value}</div>
              <div className="text-sm text-medium-contrast mb-2">{stat.label}</div>
              <div className="text-xs text-green-400 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 float">
        <Waves className="w-12 h-12 text-purple-400/40" />
      </div>
      <div className="absolute bottom-1/4 right-10 float" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg rotate-45 opacity-60"></div>
      </div>
    </section>
  );
};

export default Hero;
