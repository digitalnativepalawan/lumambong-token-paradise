
import { Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SecuritiesDistribution = () => {
  const securities = [
    { label: "Circulating Supply", value: "65,000 BBT", percentage: 65, color: "bg-blue-500" },
    { label: "Development Reserve", value: "25,000 BBT", percentage: 25, color: "bg-green-500" },
    { label: "Liquidity Pool", value: "10,000 BBT", percentage: 10, color: "bg-purple-500" }
  ];

  return (
    <div className="utility-card">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-purple-50">
          <Coins className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-black">Security Distribution</h3>
      </div>
      <div className="space-y-6">
        {securities.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">{item.label}</span>
              <span className="text-black font-semibold">{item.value}</span>
            </div>
            <Progress 
              value={item.percentage} 
              className="h-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecuritiesDistribution;
