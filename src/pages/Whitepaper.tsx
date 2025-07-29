import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Shield, Users, TrendingUp, CheckCircle } from "lucide-react";

const Whitepaper = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2">
              Official Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              Halo Bloc Whitepaper
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              StratBox Testing Plan, Investor Summary, and Regulatory Alignment for HBCX Digital Asset Platform
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
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
              a cutting-edge, <strong>blockchain-powered real estate investment platform</strong>. In essence, we 
              are revolutionizing how people invest in premium tropical resort properties by making fractional 
              ownership accessible, transparent, and profitable.
            </p>
            <p className="text-lg leading-relaxed">
              Our platform introduces the <strong>HBCX Digital Asset</strong> - a novel application of blockchain 
              technology to real estate investment that addresses long-standing market problems including high 
              barriers to entry and illiquidity in property investing.
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

        {/* Download CTA */}
        <div className="text-center bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Get the Complete Whitepaper</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Download the full technical documentation including detailed testing protocols, 
            compliance frameworks, and implementation roadmap.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
            <Download className="w-6 h-6 mr-3" />
            Download Full Whitepaper PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;