
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Globe } from "lucide-react";

interface OwnershipDashboardProps {
  filipinoUnits: number;
  foreignUnits: number;
  totalUnits: number;
}

const OwnershipDashboard = ({ filipinoUnits, foreignUnits, totalUnits }: OwnershipDashboardProps) => {
  const filipinoPercentage = (filipinoUnits / totalUnits) * 100;
  const foreignPercentage = (foreignUnits / totalUnits) * 100;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-black">
          60/40 Ownership Distribution
        </CardTitle>
        <p className="text-sm text-gray-600">
          Compliant with Philippine property law
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Filipino Ownership */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Filipino Ownership</h3>
                <p className="text-sm text-gray-600">Reserved Units: {filipinoUnits} of 6</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Progress</span>
                <span className="text-sm font-bold text-blue-600">{filipinoPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={filipinoPercentage} className="h-3" />
              <p className="text-xs text-gray-500">
                {6 - filipinoUnits} Filipino units remaining
              </p>
            </div>
          </div>

          {/* Foreign Ownership */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Foreign Ownership</h3>
                <p className="text-sm text-gray-600">Available Units: {foreignUnits} of 4</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Progress</span>
                <span className="text-sm font-bold text-green-600">{foreignPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={foreignPercentage} className="h-3" />
              <p className="text-xs text-gray-500">
                {4 - foreignUnits} foreign units remaining
              </p>
            </div>
          </div>
        </div>

        {/* Summary Bar */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-black">Overall Distribution</span>
            <span className="text-sm text-gray-600">{totalUnits} Total Units</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-blue-500 h-4 float-left" 
              style={{ width: `${filipinoPercentage}%` }}
            ></div>
            <div 
              className="bg-green-500 h-4 float-left" 
              style={{ width: `${foreignPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs">
            <span className="text-blue-600">60% Filipino (Max 6 units)</span>
            <span className="text-green-600">40% Foreign (Max 4 units)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnershipDashboard;
