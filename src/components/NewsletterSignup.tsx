import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // For now, we'll use a simple mailto until backend is set up
      const subject = "Newsletter Signup - HBCX Digital Securities";
      const body = `New newsletter signup from: ${email}`;
      
      window.location.href = `mailto:david@bingabeach.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      toast({
        title: "Thank you for signing up!",
        description: "We'll send you updates on launch timelines and early access opportunities.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue with your signup. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Disclaimer Alert */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Preview Notice:</strong> This is a front-end build preview of our HBCX Digital Securities Web App. 
          The platform is not yet live or accepting real investments. All displayed data is for demonstration purposes only.
        </AlertDescription>
      </Alert>

      {/* Newsletter Signup */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Mail className="w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
          </div>
          <p className="text-gray-600">
            Enter your email to receive exclusive project updates and early access opportunities
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !email}
              className="bg-blue-600 hover:bg-blue-700 px-6"
            >
              {isLoading ? "Joining..." : "Join Newsletter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;