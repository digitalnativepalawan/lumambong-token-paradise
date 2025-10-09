import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>
        
        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this platform, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="mb-4">
              Palawan Collective provides an informational platform for potential digital securities offerings 
              related to real estate properties in Palawan, Philippines. This platform:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Is currently informational only - no securities are currently for sale</li>
              <li>Does not constitute an offer to sell or solicitation to buy securities</li>
              <li>Provides educational content about future potential investment opportunities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Eligibility</h2>
            <p className="mb-4">To use this platform, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be prohibited from participating under applicable laws</li>
              <li>Complete KYC verification when required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Investment Risks</h2>
            <p>
              Any future investment opportunities involve significant risks, including the possible loss of principal. 
              You acknowledge that digital securities investments are speculative and should only be made by individuals 
              who can afford to lose their entire investment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to the platform</li>
              <li>Interfere with or disrupt the platform's operation</li>
              <li>Use the platform for any fraudulent purposes</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p>
              All content on this platform, including text, graphics, logos, and software, is the property of 
              Palawan Collective and is protected by intellectual property laws. You may not copy, modify, or 
              distribute our content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Palawan Collective shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising from your use of this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Continued use of the platform 
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:david@palawancollective.com" className="text-primary hover:underline">
                david@palawancollective.com
              </a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
