import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RiskDisclosure = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Risk Disclosure</h1>
        <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>
        
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
          <p className="text-destructive font-semibold">
            ⚠️ IMPORTANT: This platform is currently informational only. No securities are currently for sale. 
            Any future investment opportunities will carry significant risks including potential loss of principal.
          </p>
        </div>
        
        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. General Investment Risks</h2>
            <p className="mb-4">
              Digital securities and real estate investments involve substantial risks. Before making any investment 
              decision, you should carefully consider the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Loss of Capital:</strong> You may lose some or all of your invested capital</li>
              <li><strong>Illiquidity:</strong> Your investment may be difficult or impossible to sell quickly</li>
              <li><strong>No Guaranteed Returns:</strong> There is no assurance of profits or income</li>
              <li><strong>Long-Term Commitment:</strong> Recovery of investment may take many years</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Market and Economic Risks</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Real Estate Market Fluctuations:</strong> Property values can decrease due to market conditions</li>
              <li><strong>Economic Downturns:</strong> Economic recessions can negatively impact property values and rental income</li>
              <li><strong>Currency Risk:</strong> Exchange rate fluctuations may affect returns for international investors</li>
              <li><strong>Inflation:</strong> Rising costs may erode investment returns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Regulatory and Legal Risks</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Regulatory Changes:</strong> New laws or regulations may adversely affect the investment</li>
              <li><strong>Legal Challenges:</strong> The project may face legal disputes or challenges</li>
              <li><strong>Compliance Costs:</strong> Regulatory compliance may increase operational costs</li>
              <li><strong>Cross-Border Complexity:</strong> International regulations may create additional complications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Technology and Digital Security Risks</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Platform Security:</strong> Cyber attacks or technical failures may compromise the platform</li>
              <li><strong>Blockchain Risks:</strong> Technology underlying digital securities may have vulnerabilities</li>
              <li><strong>Loss of Access:</strong> You may lose access to your investments if you lose credentials</li>
              <li><strong>Technology Obsolescence:</strong> The technology may become outdated</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Property-Specific Risks</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Natural Disasters:</strong> Storms, earthquakes, or flooding may damage the property</li>
              <li><strong>Environmental Issues:</strong> Environmental contamination may reduce property value</li>
              <li><strong>Maintenance Costs:</strong> Unexpected repairs may be required</li>
              <li><strong>Occupancy Rates:</strong> The property may experience lower than expected occupancy</li>
              <li><strong>Location Risks:</strong> Changes in the local area may negatively impact the property</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Operational and Management Risks</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Management Performance:</strong> Poor management decisions may harm the investment</li>
              <li><strong>Key Person Risk:</strong> Loss of key personnel may impact operations</li>
              <li><strong>Conflicts of Interest:</strong> Management may have competing interests</li>
              <li><strong>Operational Failures:</strong> Business operations may not perform as expected</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Early Stage and Development Risks</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pre-Launch Status:</strong> The project is in early stages with no proven track record</li>
              <li><strong>Development Delays:</strong> Construction or development may take longer than planned</li>
              <li><strong>Budget Overruns:</strong> Costs may exceed initial estimates</li>
              <li><strong>Permitting Issues:</strong> Required permits or approvals may be delayed or denied</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limited Rights and Protections</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Minority Position:</strong> You may have limited voting rights or control</li>
              <li><strong>No Guaranteed Liquidity:</strong> There may be no secondary market for resale</li>
              <li><strong>Limited Recourse:</strong> Legal remedies may be limited or expensive to pursue</li>
              <li><strong>Dilution Risk:</strong> Future issuances may dilute your ownership percentage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Forward-Looking Statements</h2>
            <p>
              Any projections, forecasts, or estimates provided are forward-looking statements that involve risks and 
              uncertainties. Actual results may differ materially from projected results. Past performance does not 
              guarantee future results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Suitability and Professional Advice</h2>
            <p className="mb-4">
              These investments are suitable only for investors who:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Can afford to lose their entire investment</li>
              <li>Have sufficient knowledge and experience to evaluate the risks</li>
              <li>Have adequate financial resources and liquidity</li>
              <li>Can bear the risks for an extended period</li>
            </ul>
            <p className="mt-4">
              <strong>We strongly recommend that you consult with qualified financial, legal, and tax advisors 
              before making any investment decision.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact for Questions</h2>
            <p>
              For questions about these risk disclosures, contact us at{" "}
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

export default RiskDisclosure;
