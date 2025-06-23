
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Shield, Zap, Globe, Smartphone } from "lucide-react";

const TechnicalImplementation = () => {
  const techStack = [
    {
      category: "Blockchain Infrastructure",
      icon: Code,
      technologies: [
        { name: "Ethereum", purpose: "Primary blockchain for token deployment" },
        { name: "Solidity", purpose: "Smart contract development" },
        { name: "IPFS", purpose: "Decentralized file storage for property documents" },
        { name: "Web3.js", purpose: "Blockchain integration and wallet connectivity" }
      ]
    },
    {
      category: "Backend Systems",
      icon: Database,
      technologies: [
        { name: "Supabase", purpose: "User management and application database" },
        { name: "PostgreSQL", purpose: "Relational data storage" },
        { name: "Node.js", purpose: "API development and server-side logic" },
        { name: "Express.js", purpose: "RESTful API framework" }
      ]
    },
    {
      category: "Frontend Development",
      icon: Globe,
      technologies: [
        { name: "React", purpose: "User interface development" },
        { name: "TypeScript", purpose: "Type-safe development" },
        { name: "Tailwind CSS", purpose: "Responsive design and styling" },
        { name: "Vite", purpose: "Build tooling and development server" }
      ]
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      technologies: [
        { name: "MetaMask", purpose: "Secure wallet integration" },
        { name: "OpenZeppelin", purpose: "Audited smart contract libraries" },
        { name: "KYC/AML", purpose: "Identity verification and compliance" },
        { name: "SSL/TLS", purpose: "Encrypted data transmission" }
      ]
    }
  ];

  const implementationPhases = [
    {
      phase: "Phase 1: Foundation",
      duration: "Q1 2025",
      status: "In Progress",
      tasks: [
        "Smart contract development and testing",
        "Frontend application completion",
        "KYC/AML integration",
        "Payment gateway implementation"
      ]
    },
    {
      phase: "Phase 2: Token Launch",
      duration: "Q2 2025",
      status: "Planning",
      tasks: [
        "Smart contract audit and deployment",
        "Token sale platform launch",
        "Investor onboarding system",
        "Governance mechanism activation"
      ]
    },
    {
      phase: "Phase 3: Operations",
      duration: "Q3-Q4 2025",
      status: "Future",
      tasks: [
        "Property management integration",
        "Revenue distribution automation",
        "Mobile application development",
        "Advanced analytics dashboard"
      ]
    }
  ];

  const smartContractFeatures = [
    {
      title: "Ownership Management",
      description: "Automated tracking of fractional ownership and transfer restrictions"
    },
    {
      title: "Revenue Distribution",
      description: "Proportional dividend payments to token holders based on holdings"
    },
    {
      title: "Governance Voting",
      description: "Democratic decision-making through secure on-chain voting"
    },
    {
      title: "Timeshare Allocation",
      description: "Automated scheduling and access rights based on token ownership"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Technical Implementation</h2>
        <p className="text-xl text-gray-600 mb-6">
          Cutting-edge technology stack ensuring security, scalability, and user experience
        </p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Technology Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our technology stack combines proven blockchain infrastructure with modern web 
            development practices to create a secure, scalable, and user-friendly platform 
            for tokenized real estate investment.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {techStack.map((stack, index) => (
              <Card key={index} className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-black flex items-center gap-3">
                    <stack.icon className="w-5 h-5 text-blue-600" />
                    {stack.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stack.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-black">{tech.name}</span>
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{tech.purpose}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <Code className="w-6 h-6 text-purple-600" />
            Smart Contract Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {smartContractFeatures.map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-black mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {implementationPhases.map((phase, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-black">{phase.phase}</h4>
                  <div className="flex items-center gap-3">
                    <Badge variant={phase.status === "In Progress" ? "default" : "secondary"}>
                      {phase.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{phase.duration}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-700 text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-black flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-600" />
              Security Measures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h5 className="font-semibold text-black mb-1">Smart Contract Audits</h5>
              <p className="text-gray-600 text-sm">Third-party security audits before deployment</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-semibold text-black mb-1">Multi-Signature Wallets</h5>
              <p className="text-gray-600 text-sm">Secure fund management with multiple approvals</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h5 className="font-semibold text-black mb-1">Data Encryption</h5>
              <p className="text-gray-600 text-sm">End-to-end encryption for sensitive information</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h5 className="font-semibold text-black mb-1">Regular Updates</h5>
              <p className="text-gray-600 text-sm">Continuous security monitoring and updates</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-black flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-blue-600" />
              User Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-semibold text-black mb-1">Responsive Design</h5>
              <p className="text-gray-600 text-sm">Optimized for all devices and screen sizes</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h5 className="font-semibold text-black mb-1">Intuitive Interface</h5>
              <p className="text-gray-600 text-sm">User-friendly design for all technical levels</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h5 className="font-semibold text-black mb-1">Real-time Updates</h5>
              <p className="text-gray-600 text-sm">Live data synchronization and notifications</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h5 className="font-semibold text-black mb-1">24/7 Support</h5>
              <p className="text-gray-600 text-sm">Comprehensive help system and support</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-600" />
            Performance & Scalability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Our platform is designed for growth, with scalable infrastructure that can handle 
            increasing user adoption and transaction volume while maintaining fast performance 
            and low transaction costs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">&lt;3s</div>
              <div className="text-sm text-yellow-700">Average Load Time</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-blue-700">Uptime Target</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600">10K+</div>
              <div className="text-sm text-green-700">Concurrent Users</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalImplementation;
