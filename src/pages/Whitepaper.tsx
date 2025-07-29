import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Shield, Users, TrendingUp, CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Whitepaper = () => {
  const navigate = useNavigate();
  
  const handleDownloadWhitepaper = () => {
    // Create a link to download the whitepaper PDF
    const link = document.createElement('a');
    link.href = 'https://docs.google.com/document/d/1Ox7db0ZN5MTSmH-ODzJj8-9kA0gXKUMP4J4iUl43L1Q/edit?usp=sharing';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="mr-4"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <Badge className="mb-6 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2">
              Official Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              Halo Bloc Whitepaper
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              StratBox Testing Plan, Investor Summary, and Regulatory Alignment for HBCX Digital Asset Platform
            </p>
            <Button 
              onClick={handleDownloadWhitepaper}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto max-w-sm"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Whitepaper
            </Button>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-6">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              <strong>Halo Bloc</strong> offers investors a unique opportunity to own a piece of paradise in Palawan through 
              a cutting-edge, <strong>blockchain-powered real estate investment platform</strong>. We combine the 
              <strong>tangible value of prime Philippine real estate</strong> with the <strong>accessibility and 
              transparency of digital assets</strong>. Here's what potential investors need to know:
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="font-bold text-lg mb-3">🏝️ Fractional Ownership of High-Value Real Estate</h3>
                  <p className="text-gray-700">
                    Halo Bloc's flagship project is a luxury resort in Palawan – a location renowned as the <strong>Philippines' last frontier</strong> and 
                    voted "Best Island in the World" by travel publications. Through our HBCX Digital Asset, investors can purchase 
                    <strong>fractional shares</strong> of the resort project for as little as a few thousand pesos, owning a slice of 
                    lucrative property with strong potential for <strong>capital appreciation</strong> alongside ongoing income.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="font-bold text-lg mb-3">💰 Regular Income and Transparent Payouts</h3>
                  <p className="text-gray-700">
                    Investing in HBCX Digital Assets provides <strong>passive income</strong> through automated dividend distribution. 
                    Revenue is distributed as <strong>dividends</strong> quarterly, with options to receive in Philippine Pesos or stablecoins. 
                    All transactions are recorded on the blockchain ledger, ensuring <strong>total transparency</strong> and 
                    <strong>minimal middleman fees</strong>.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="font-bold text-lg mb-3">🔒 Secure and Compliant Investment</h3>
                  <p className="text-gray-700">
                    Halo Bloc is fully committed to <strong>regulatory compliance and investor protection</strong>. We're registered with 
                    the Philippine SEC, and the HBCX Digital Asset is structured as a <strong>security token registered with the SEC</strong>. 
                    We implement stringent <strong>KYC/AML</strong> checks and operate under the Philippines' framework for digital assets, 
                    with our pilot conducted in the SEC's StratBox sandbox.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="font-bold text-lg mb-3">🌍 Inclusive and Accessible</h3>
                  <p className="text-gray-700">
                    Our platform is designed for <strong>broad participation</strong> - from young Filipino professionals to foreign investors. 
                    The mobile-friendly platform integrates with <strong>Coins.ph</strong> and supports both crypto and traditional payment methods. 
                    By fractionalizing assets, we <strong>lower investment minimums</strong> and make premium real estate accessible to many.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="font-bold text-lg mb-3">⚡ Liquidity and Flexibility</h3>
                  <p className="text-gray-700">
                    Unlike traditional real estate, HBCX tokens provide <strong>more flexibility</strong>. After an initial lock-up period, 
                    you can trade tokens on our regulated marketplace, creating a <strong>liquidity option</strong> that direct property 
                    ownership cannot easily provide. This means <strong>real estate investing on your terms</strong>.
                  </p>
                </div>

                <div className="border-l-4 border-teal-500 pl-6">
                  <h3 className="font-bold text-lg mb-3">🏆 Strong Team and Track Record</h3>
                  <p className="text-gray-700">
                    We have <strong>decades of experience in Palawan</strong> real estate, finance, and technology. Our existing resort 
                    is profitable and compliant, showcasing our ability to execute. We're <strong>mentored by industry leaders</strong> 
                    and have partnerships with regulated entities for payments and compliance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 my-8">
              <h3 className="font-bold text-lg mb-3 text-green-800">🌱 Sustainable and Ethical Investment</h3>
              <p className="text-gray-700">
                Investing in Halo Bloc supports <strong>sustainable, inclusive growth</strong> for Palawan. We adhere to sustainable tourism 
                practices and work with local communities to provide jobs while respecting indigenous rights. As an investor, your money 
                helps develop Palawan responsibly with regular <strong>ESG (Environmental, Social, Governance)</strong> reporting.
              </p>
            </div>

            <p className="text-lg font-semibold text-blue-600 text-center">
              Halo Bloc is ushering in a <strong>new era of real estate investment</strong> in the Philippines – one that is{" "}
              <strong>inclusive, tech-driven, and secure</strong>. Join us in becoming part-owner of paradise and share in the success of{" "}
              Palawan's thriving real estate market. 🏝️✨
            </p>
          </CardContent>
        </Card>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <FileText className="w-8 h-8 text-blue-600 mb-4" />
              <CardTitle>Testing Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Comprehensive testing framework designed for SEC StratBox sandbox execution, ensuring platform security and compliance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 text-green-600 mb-4" />
              <CardTitle>Regulatory Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Full compliance with SEC StratBox criteria and Philippine regulatory requirements for digital asset offerings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-purple-600 mb-4" />
              <CardTitle>Investor Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Robust safeguards including segregated accounts, KYC/AML verification, and transparent reporting mechanisms.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testing Objectives */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Testing Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              Validate that fractional real estate investment via the HBCX Digital Asset is secure, efficient, and compliant. 
              The sandbox test aims to demonstrate seamless investment flows (fiat and crypto), automated dividend distribution, 
              and strict adherence to SEC rules.
            </p>
            <p className="text-lg font-semibold text-blue-600">
              We intend to prove the viability and safety of our model while collecting data to refine the platform for broader deployment.
            </p>
          </CardContent>
        </Card>

        {/* Test Scenarios */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Test Scenarios</CardTitle>
            <p className="text-gray-600">Multiple scenarios will be run to cover all core functionalities:</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold text-lg mb-2">Onboarding & KYC</h3>
              <p className="text-gray-600">
                Investors register, complete KYC/AML verification, and link payment methods (Coins.ph wallet or bank account). 
                Tests our <strong>off-chain KYC integration</strong> and ensures only whitelisted addresses can hold or trade HBCX tokens.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold text-lg mb-2">Token Acquisition</h3>
              <p className="text-gray-600">
                Investors purchase HBCX tokens by depositing PHP via Coins.ph or bank transfer. The <strong>smart contract</strong> 
                listens for payment confirmation and mints/allocates the correct number of tokens to the investor's blockchain wallet.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="font-semibold text-lg mb-2">Dividend Distribution</h3>
              <p className="text-gray-600">
                Simulate rental income from the Palawan resort project being deposited into the system. The smart contract 
                calculates proportional shares and auto-distributes payouts to token holders with <strong>automated payout mechanism</strong> 
                and multi-currency support.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="font-semibold text-lg mb-2">Secondary Trading</h3>
              <p className="text-gray-600">
                Allow limited, controlled secondary market among sandbox participants. Verified users may list and trade HBCX tokens 
                with <strong>transfer restrictions</strong> ensuring compliance with investor caps and lock-up periods.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="font-semibold text-lg mb-2">Reporting & Monitoring</h3>
              <p className="text-gray-600">
                System logs detailed transactions and events, generating required audit trails and periodic reports for SEC and AMLC 
                to ensure <strong>regulatory reporting obligations</strong> are met.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Testing Period & Expected Outcomes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Testing Period</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We propose a <strong>12-month sandbox period</strong>. This allows enough time to onboard users, 
                execute multiple dividend cycles, and iterate on improvements.
              </p>
              <p className="text-gray-600">
                Quarterly reports will be provided to the SEC PhilFintech Innovation Office to evaluate progress 
                and compliance. Midpoint reviews can be conducted to address any issues or adjust parameters if needed.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Expected Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Secure handling of investments with no loss of funds</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">High investor satisfaction metrics and smooth user experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Strict compliance with sandbox limits and zero regulatory breaches</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Valuable platform performance data for full launch optimization</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* SEC StratBox Alignment */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Alignment with SEC StratBox Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">1. Innovative Financial Product/Service</h3>
              <p className="text-gray-600">
                The HBCX Digital Asset introduces a <strong>novel application of blockchain technology</strong> to real estate investment. 
                Our use of <strong>asset-backed tokens for fractional ownership</strong> is cutting-edge in the Philippine context, 
                addressing market problems of high barriers to entry and illiquidity in property investing.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">2. Legality and Necessity of Sandbox</h3>
              <p className="text-gray-600">
                Fractional ownership of real estate via digital tokens is <strong>not prohibited by Philippine law</strong>, 
                but involves securities regulation. We have <strong>SEC registration as a corporation</strong> and will register 
                our digital asset offerings with the SEC before any public sale.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">3. Intention and Ability for Broader Deployment</h3>
              <p className="text-gray-600">
                After successful sandbox testing, we intend to <strong>deploy the HBCX platform at full scale in the Philippines</strong>, 
                expanding to multiple resort and land projects. Our roadmap includes registering as a licensed CASP and possibly 
                a REIT-like structure for broader public offerings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">4. Readiness to Test with Actual Consumers</h3>
              <p className="text-gray-600">
                We are operationally ready to engage real users in the sandbox. Our platform development is in advanced stages, 
                smart contracts are coded, and we have <strong>deep real estate domain experience</strong> from successfully 
                developing and managing a resort in Palawan.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Risk Assessment & Mitigation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-red-600">Key Risks Identified</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cybersecurity vulnerabilities</li>
                  <li>• Fraud and AML compliance</li>
                  <li>• Investor misunderstanding</li>
                  <li>• Operational errors and system failures</li>
                  <li>• Regulatory compliance breaches</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-600">Mitigation Measures</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Third-party smart contract audits</li>
                  <li>• Comprehensive KYC/AML monitoring</li>
                  <li>• Clear disclosures and investor education</li>
                  <li>• Multi-sig controls and fail-safes</li>
                  <li>• Dedicated compliance officer oversight</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal and Regulatory Comparisons */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Legal and Regulatory Comparisons</CardTitle>
            <p className="text-gray-600">
              Halo Bloc's model sits at the intersection of real estate law and securities/fintech regulation. 
              Here we compare our approach to existing legal frameworks and highlight how we ensure compliance:
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">🏛️ Land Ownership Laws (Foreign vs. Filipino Ownership)</h3>
              <p className="text-gray-600 mb-4">
                Philippine law restricts land ownership to Filipino citizens or corporations that are at least 60% Filipino-owned. 
                Halo Bloc fully complies with this by operating through an SEC-registered Philippine corporation (Halo Bloc Inc.) 
                where 60% of the shares are owned by Filipino citizens.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Foreign investors</strong> participate economically through their up to 40% stake via HBCX tokens, which represent 
                beneficial interest in the company/project. This structure provides a <strong>legal investment route for foreigners</strong> 
                while respecting national ownership laws. 
              </p>
              <p className="text-gray-600">
                We've structured HBCX to give foreign investors rights to profits <strong>without giving title to land</strong>, 
                staying within the compliant corporation framework.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">🏢 REIT Model vs. Tokenized Real Estate</h3>
              <p className="text-gray-600 mb-4">
                A Real Estate Investment Trust (REIT) is a well-known vehicle that also allows fractional investment in real estate. 
                However, there are key differences between a traditional REIT and Halo Bloc's tokenized project:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">📊 Structure</h4>
                  <p className="text-sm text-gray-600">
                    A REIT typically owns a portfolio of properties with public ownership requirements. 
                    Halo Bloc focuses on <strong>single-project investment</strong> – each HBCX digital asset 
                    is tied to a specific property, providing more direct exposure.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">💰 Flexibility and Costs</h4>
                  <p className="text-sm text-gray-600">
                    Tokenization is more flexible and cost-efficient. REITs involve significant fees and regulatory hurdles. 
                    By using blockchain, we automate many processes, resulting in <strong>higher net returns</strong> to investors.
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">⚖️ Regulatory Compliance</h4>
                  <p className="text-sm text-gray-600">
                    Both REITs and HBCX tokens are regulated as securities under different frameworks. 
                    Halo Bloc operates within securities laws but offers a <strong>different, more flexible model</strong> than a REIT.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">⛓️ Traditional Fractional Ownership vs. Blockchain Records</h3>
              <p className="text-gray-600 mb-4">
                Fractional ownership isn't entirely new – groups have pooled money to co-own property before. The <strong>major legal challenge</strong> 
                in traditional setups is often the clarity and security of ownership records, and the rights of investors.
              </p>
              <p className="text-gray-600">
                Halo Bloc improves this by using blockchain to issue tokens that incontrovertibly represent your share in the asset. 
                The tokens are effectively <strong>digital securities</strong> with all transactions recorded immutably, providing an 
                <strong>audit trail for regulators and owners alike</strong>. This addresses issues of trust and transparency that 
                plagued older fractional models, and we fall squarely under securities law with full SEC oversight.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">🏛️ CASP Regulations and SEC Oversight</h3>
              <p className="text-gray-600 mb-4">
                Under the <strong>SEC Memorandum Circular Nos. 4 and 5, Series 2025</strong>, all crypto-asset service providers 
                dealing in digital asset offerings must register and comply with strict requirements. This includes maintaining 
                minimum capital (₱100M for full CASPs), separating customer assets from company assets, and submitting regular reports.
              </p>
              <p className="text-gray-600">
                Our <strong>end goal is full compliance</strong> – we plan to graduate from the sandbox and meet CASP licensing standards. 
                We believe our proactive compliance gives investors confidence that we are a <strong>legally sanctioned investment</strong> 
                under active SEC oversight, not an unregulated scheme.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">🛡️ Consumer Protection and Investor Rights</h3>
              <p className="text-gray-600 mb-4">
                We measure ourselves against laws like the <strong>Financial Products and Services Consumer Protection Act (RA 11765)</strong> 
                and related BSP/SEC regulations aimed at protecting investors. Practically, this means:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    <strong>Full disclosure</strong> of all material risks, no misrepresentation or misleading marketing
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Investors have avenues for complaints and we maintain a consumer assistance helpdesk
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    We uphold data privacy and secure personal information obtained via KYC
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    <strong>Investor funds are safeguarded</strong> through segregated accounts and reputable institutions
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">🌿 Environmental and Local Compliance</h3>
              <p className="text-gray-600">
                While not a direct financial regulatory comparison, it's worth noting our compliance with <strong>local real estate 
                and environmental laws</strong>. Many development projects in Palawan have struggled due to non-compliance with environmental 
                rules. Halo Bloc secures all clearances upfront and works closely with agencies like PAMB, obtaining proper licenses 
                and engaging in mandated environmental protections. This compliance not only avoids legal pitfalls but aligns with 
                the <strong>ethical and sustainability expectations</strong> of modern investors.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">🔗 Conclusion</h3>
              <p className="text-gray-600">
                Halo Bloc's model is carefully <strong>woven into the legal and regulatory fabric</strong> of the Philippines. 
                We take the best aspects of existing frameworks (investor protection and shared ownership ideas behind REITs, 
                the flexibility of fractional ownership, and the innovation allowances of the sandbox) and create a solution that is both 
                groundbreaking and compliant. Our commitment is that <strong>innovation will not come at the expense of compliance</strong>; 
                rather, we believe working within the regulatory system is the only sustainable way to introduce revolutionary 
                blockchain-based real estate investment.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Download CTA */}
        <div className="text-center bg-blue-50 rounded-lg p-6 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get the Complete Whitepaper</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Download the full technical documentation including detailed testing protocols, 
            compliance frameworks, and implementation roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleDownloadWhitepaper}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto max-w-sm"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Download Full Whitepaper PDF
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto max-w-sm"
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;