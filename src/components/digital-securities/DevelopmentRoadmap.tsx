
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DevelopmentRoadmap = () => {
  const roadmapItems = [
    { phase: "Q1 2025", title: "Digital Securities Launch", status: "completed" },
    { phase: "Q2 2025", title: "Development Start", status: "active" },
    { phase: "Q3 2025", title: "Resort Opening", status: "upcoming" },
    { phase: "Q4 2025", title: "Full Operations", status: "upcoming" }
  ];

  return (
    <div className="utility-card">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-green-50">
          <Zap className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-black">Development Roadmap</h3>
      </div>
      <div className="space-y-4">
        {roadmapItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className={`w-3 h-3 rounded-full ${
              item.status === 'completed' ? 'bg-green-500' :
              item.status === 'active' ? 'bg-blue-500 animate-pulse' :
              'bg-gray-400'
            }`}></div>
            <div className="flex-1">
              <div className="font-semibold text-black">{item.title}</div>
              <div className="text-sm text-gray-500">{item.phase}</div>
            </div>
            <Badge className={`text-xs ${
              item.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
              item.status === 'active' ? 'bg-blue-100 text-blue-700 border-blue-200' :
              'bg-gray-100 text-gray-600 border-gray-200'
            }`}>
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopmentRoadmap;
