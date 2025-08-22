
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, TrendingUp, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import NewsletterSignup from "./NewsletterSignup";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showVideo, setShowVideo] = useState(false);

  const handleInvestClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate('/dashboard');
  };

  const handleWatchDemo = () => {
    setShowVideo(!showVideo);
  };

  const stats = [
    { icon: TrendingUp, label: "Security Value", value: "$25", change: "+12.5%" },
    { icon: Users, label: "Investors", value: "1,247", change: "+8.2%" },
    { icon: MapPin, label: "Properties", value: "10", change: "100%" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-black pt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in-up">
          <img 
            src="/lovable-uploads/c5e976ca-58db-42cd-9f8b-b428bbf602fa.png" 
            alt="Binga Beach Logo" 
            className="w-64 h-auto mx-auto object-contain"
          />
        </div>

        {/* Status badge */}
        <div className="mb-8 animate-fade-in-up">
          <Badge className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse glow-purple"></div>
            Phase 2
          </Badge>
        </div>

        {/* Main heading */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white">
            Own a Fraction
            <br />
            of Paradise
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Digital securities backed beachfront real estate in Palawan, Philippines. 
            <span className="text-white font-medium"> Invest. Stay. Govern.</span>
          </p>
          
          {/* Ownership Structure Emphasis */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/5 border border-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold text-primary">60%</div>
              <div className="text-sm text-white/80 font-medium">🇵🇭 Filipino Ownership</div>
            </div>
            <div className="bg-white/5 border border-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold text-primary">40%</div>
              <div className="text-sm text-white/80 font-medium">🌍 Foreign Ownership</div>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleInvestClick}
            className="modern-button px-8 py-4 text-lg h-auto rounded-2xl group font-medium"
          >
            <span>Start Investing</span>
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleWatchDemo}
            className="px-8 py-4 text-lg h-auto rounded-2xl group font-medium"
          >
            <Play className="mr-2 w-5 h-5" />
            <span>Watch Demo</span>
          </Button>
        </div>

        {/* Video Player */}
        {showVideo && (
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-glass bg-white/5 border border-white/10 backdrop-blur-sm">
              <iframe
                src="https://www.youtube.com/embed/mhoL96KXuSw?autoplay=1&loop=1&playlist=mhoL96KXuSw&mute=0&quality=hd1080"
                title="Binga Beach Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Newsletter Signup & Disclaimer */}
        <div className="mb-12">
          <NewsletterSignup />
        </div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="stats-card group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm glow-purple">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/80 mb-2">{stat.label}</div>
              <div className="text-xs text-primary font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse glow-purple"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
