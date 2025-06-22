
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast({
      title: "Message Sent",
      description: "Thank you for your interest! We'll contact you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "invest@lumambong.com",
      action: "mailto:invest@lumambong.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+63 (2) 123-4567",
      action: "tel:+6321234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Lumambong Beach, Palawan",
      action: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Get In Touch</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Ready to Own Your Paradise?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Contact our investment team to learn more about Lumambong Beach opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Tell us about your investment interests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      <a 
                        href={info.action}
                        className="text-gray-600 hover:text-emerald-600 transition-colors"
                      >
                        {info.content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-800">Investment Inquiry?</h4>
              <p className="text-emerald-700 text-sm mb-4">
                Schedule a consultation with our investment team to discuss your Palawan paradise opportunity.
              </p>
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
