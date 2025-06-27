
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UtilityCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center utility-card">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-black">
          Ready to Join the Future of Real Estate?
        </h3>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Start your investment journey with BBT digital securities and unlock exclusive access 
          to premium beachfront property in paradise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/auth')}
            className="modern-button px-8 py-4 text-lg h-auto rounded-xl group font-semibold"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/governance')}
            className="px-8 py-4 text-lg h-auto rounded-xl border-gray-300 text-black hover:bg-gray-50 group font-medium"
          >
            <Users className="mr-2 w-5 h-5" />
            View Governance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UtilityCTA;
