
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Globe } from "lucide-react";

interface OwnershipDashboardProps {
  filipinoUnits: number;
  foreignUnits: number;
  totalUnits: number;
  filipinoTotal?: number;
  foreignTotal?: number;
}

const OwnershipDashboard = ({ 
  filipinoUnits, 
  foreignUnits, 
  totalUnits,
  filipinoTotal = 6,
  foreignTotal = 4
}: OwnershipDashboardProps) => {
  const filipinoPercentage = (filipinoUnits / filipinoTotal) * 100;
  const foreignPercentage = (foreignUnits / foreignTotal) * 100;
  
  const filipinoRemaining = Math.max(0, filipinoTotal - filipinoUnits);
  const foreignRemaining = Math.max(0, foreignTotal - foreignUnits);

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-black flex items-center justify-center gap-2">
          <span className="text-2xl">🇵🇭</span>
          60/40 Ownership Distribution
          <span className="text-2xl">🌍</span>
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
                <h3 className="font-semibold text-black">Filipino Ownership 🇵🇭</h3>
                <p className="text-sm text-gray-600">Sold: {filipinoUnits} of {filipinoTotal}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Progress</span>
                <span className="text-sm font-bold text-blue-600">{filipinoPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={filipinoPercentage} className="h-3" />
              <p className="text-xs text-gray-500">
                {filipinoRemaining} Filipino units remaining
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
                <h3 className="font-semibold text-black">Foreign Ownership 🌍</h3>
                <p className="text-sm text-gray-600">Sold: {foreignUnits} of {foreignTotal}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Progress</span>
                <span className="text-sm font-bold text-green-600">{foreignPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={foreignPercentage} className="h-3" />
              <p className="text-xs text-gray-500">
                {foreignRemaining} foreign units remaining
              </p>
            </div>
          </div>
        </div>

        {/* Summary Bar */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-black">Overall Distribution</span>
            <span className="text-sm text-gray-600">{filipinoTotal + foreignTotal} Total Units</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-blue-500 h-4 float-left transition-all duration-500" 
              style={{ width: `${(filipinoPercentage / 100) * 60}%` }}
            ></div>
            <div 
              className="bg-green-500 h-4 float-left transition-all duration-500" 
              style={{ width: `${(foreignPercentage / 100) * 40}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs">
            <span className="text-blue-600 flex items-center gap-1">
              🇵🇭 60% Filipino (Max {filipinoTotal} units)
            </span>
            <span className="text-green-600 flex items-center gap-1">
              🌍 40% Foreign (Max {foreignTotal} units)
            </span>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Compliance Status:</span>
            <span className={`font-semibold ${
              filipinoPercentage <= 100 && foreignPercentage <= 100 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {filipinoPercentage <= 100 && foreignPercentage <= 100 ? '✅ Compliant' : '⚠️ Over Quota'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnershipDashboard;
