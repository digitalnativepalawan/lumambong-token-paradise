
import { Shield, Calendar, Vote, TrendingUp } from "lucide-react";
import UtilityCard from "./UtilityCard";

const UtilityGrid = () => {
  const utilities = [
    {
      icon: Shield,
      title: "Ownership Rights",
      description: "Direct fractional ownership of premium beachfront property with legal title protection",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: ["Legal ownership documents", "Property appreciation", "Asset backing"]
    },
    {
      icon: Calendar,
      title: "Timeshare Benefits", 
      description: "Proportional annual usage rights with flexible booking and rental options",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: ["~36 nights per 10% ownership", "Flexible booking system", "Rent unused nights"]
    },
    {
      icon: Vote,
      title: "Governance Power",
      description: "On-chain voting rights for property decisions and community proposals",
      color: "text-green-600",
      bgColor: "bg-green-50",
      features: ["Property management votes", "Budget approvals", "Development decisions"]
    },
    {
      icon: TrendingUp,
      title: "Revenue Share",
      description: "Automatic dividend distribution from resort operations and rental income",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      features: ["30% revenue distribution", "Monthly payouts", "Compound growth"]
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-20">
      {utilities.map((utility, index) => (
        <UtilityCard
          key={index}
          icon={utility.icon}
          title={utility.title}
          description={utility.description}
          color={utility.color}
          bgColor={utility.bgColor}
          features={utility.features}
        />
      ))}
    </div>
  );
};

export default UtilityGrid;
