
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">Limited Opportunity</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Secure Your Paradise Today
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Only 10 founding token holders will own a piece of this secluded Palawan paradise. 
            Join the exclusive community of sustainable luxury investors.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button 
              variant="outline" 
              className="w-full py-6 rounded-2xl text-base font-medium"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Full Prospectus
            </Button>
            <Button 
              variant="outline" 
              className="w-full py-6 rounded-2xl text-base font-medium"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Schedule Virtual Site Tour
            </Button>
          </div>

          {/* Investment Urgency */}
          <Card className="bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 backdrop-blur-sm shadow-glow">
            <CardContent className="p-6 text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Limited Time Offer</h4>
              <p className="text-white/80 mb-4">Early investors receive priority lot selection</p>
              <div className="text-3xl font-semibold text-primary glow-purple">10 Units Only</div>
              <p className="text-white/80 text-sm">Secure your legacy on Lumambong Beach</p>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-sm text-white/60 text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> This is a conceptual presentation. Actual offering would require 
            full legal documentation, SEC registration (if applicable), detailed feasibility studies, 
            and environmental impact assessments. Prices are illustrative and subject to final detailed 
            costing and market conditions. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
