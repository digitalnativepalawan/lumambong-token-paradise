
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Download, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentAmount: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Interest Registered",
      description: "Thank you for your interest. Our team will contact you within 24 hours.",
    });
    setFormData({ name: '', email: '', phone: '', investmentAmount: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-600 text-white">Limited Opportunity</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Secure Your Paradise Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Only 10 founding token holders will own a piece of this secluded Palawan paradise. 
            Join the exclusive community of sustainable luxury investors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Express Your Interest</CardTitle>
              <p className="text-gray-300">Get priority access to the tokenized offering</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    name="investmentAmount"
                    placeholder="Investment Interest ($)"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your investment goals and any questions you have..."
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6">
                  Submit Interest
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Actions */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Direct Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-gray-300">Email</p>
                      <p className="text-white">investments@luxelumambong.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-gray-300">Phone</p>
                      <p className="text-white">+63 XXX XXXX XXX</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 py-6"
              >
                <Download className="mr-2 w-5 h-5" />
                Download Full Prospectus
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 py-6"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Virtual Site Tour
              </Button>
            </div>

            {/* Investment Urgency */}
            <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 border-none">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-semibold text-white mb-2">Limited Time Offer</h4>
                <p className="text-emerald-100 mb-4">Early investors receive priority lot selection</p>
                <div className="text-3xl font-bold text-white">10 Units Only</div>
                <p className="text-emerald-100 text-sm">Secure your legacy on Lumambong Beach</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-sm text-gray-400 text-center max-w-4xl mx-auto">
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
