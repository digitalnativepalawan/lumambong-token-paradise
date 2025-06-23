
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, MapPin, Briefcase } from "lucide-react";

const ManagementStructure = () => {
  const teamMembers = [
    {
      name: "David Le",
      role: "Co-Founder & Project Lead",
      experience: "Successfully created Binga Beach Resort with all permits and environmental compliance",
      expertise: ["Resort Development", "Regulatory Compliance", "Project Management"]
    },
    {
      name: "Quennie Azarraga",
      role: "Co-Founder & Operations",
      experience: "Business owner with expertise in glass/aluminum business and construction ventures",
      expertise: ["Business Operations", "Construction", "Local Partnerships"]
    },
    {
      name: "Julius Leuteric",
      role: "Lead Solar Technician",
      experience: "Specialist in renewable energy systems and off-grid solutions",
      expertise: ["Solar Technology", "Sustainable Energy", "Technical Implementation"]
    },
    {
      name: "Jasper Arcinas",
      role: "Conservation Guide & Researcher",
      experience: "Survivalist and conservation expert with deep local knowledge",
      expertise: ["Environmental Conservation", "Local Ecosystem", "Sustainability"]
    },
    {
      name: "Rommel Cruz",
      role: "Tourism & Expeditions",
      experience: "Blue Bird Philippines, Mountain Expeditions leadership",
      expertise: ["Tourism Operations", "Guest Experience", "Adventure Tourism"]
    },
    {
      name: "Alfie Laos",
      role: "Research & Media",
      experience: "Pinoy Mountaineer, researcher, drone cinematographer, food science video editor",
      expertise: ["Content Creation", "Research", "Digital Marketing"]
    },
    {
      name: "CM Madrid",
      role: "Environmental Planner",
      experience: "Environmental planning consultant and researcher",
      expertise: ["Environmental Planning", "Regulatory Compliance", "Sustainability"]
    },
    {
      name: "Melinda Acala",
      role: "Finance & Education",
      experience: "Accountant and TESDA course instructor",
      expertise: ["Financial Management", "Education", "Training Programs"]
    }
  ];

  const phases = [
    {
      phase: "Phase 1: Foundation",
      duration: "Months 1-6",
      status: "In Progress",
      color: "bg-blue-500",
      objectives: [
        "Complete token sale and funding",
        "Finalize construction permits",
        "Begin modular home installation",
        "Establish operational procedures"
      ]
    },
    {
      phase: "Phase 2: Development",
      duration: "Months 7-18",
      status: "Planning",
      color: "bg-yellow-500",
      objectives: [
        "Complete all 10 modular units",
        "Implement full solar infrastructure",
        "Launch rental operations",
        "Establish governance mechanisms"
      ]
    },
    {
      phase: "Phase 3: Operations",
      duration: "Months 19-36",
      status: "Future",
      color: "bg-green-500",
      objectives: [
        "Full operational capacity",
        "Expand amenity offerings",
        "Implement advanced features",
        "Explore expansion opportunities"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-black mb-4">Management Structure</h2>
        <p className="text-xl text-gray-600 mb-6">
          Experienced team with proven track record in resort development and operations
        </p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            Core Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-black">{member.name}</h4>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-700">
                    <Award className="w-3 h-3 mr-1" />
                    Expert
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.experience}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <MapPin className="w-6 h-6 text-green-600" />
            Development Phases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${phase.color}`} />
                    <h4 className="text-lg font-semibold text-black">{phase.phase}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={phase.status === "In Progress" ? "default" : "secondary"}>
                      {phase.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{phase.duration}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {phase.objectives.map((objective, objIndex) => (
                    <div key={objIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      <span className="text-gray-700 text-sm">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-black flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-purple-600" />
            Organizational Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Binga Beach Brothers Inc. operates as an SEC-registered Philippine corporation with 
            a flat organizational structure that promotes collaboration and efficient decision-making. 
            The team combines local expertise with international best practices.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Executive Team</h4>
              <p className="text-blue-700 text-sm mb-3">
                Strategic oversight and project leadership
              </p>
              <ul className="text-blue-600 text-sm space-y-1">
                <li>• Co-Founders</li>
                <li>• Project Directors</li>
                <li>• Strategic Advisors</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Operations Team</h4>
              <p className="text-green-700 text-sm mb-3">
                Day-to-day operations and guest services
              </p>
              <ul className="text-green-600 text-sm space-y-1">
                <li>• Property Management</li>
                <li>• Guest Services</li>
                <li>• Maintenance</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-purple-800 mb-3">Technical Team</h4>
              <p className="text-purple-700 text-sm mb-3">
                Technology, sustainability, and innovation
              </p>
              <ul className="text-purple-600 text-sm space-y-1">
                <li>• Blockchain Development</li>
                <li>• Solar Systems</li>
                <li>• Environmental Planning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementStructure;
