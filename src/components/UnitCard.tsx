
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Unit {
  id: number;
  unit_number: number;
  unit_type: string;
  toring_solid: number;
  lbbl: string;
  annual_report: { regime: string; volume: number };
  invest_flow: number;
  ownership_type: string;
  status: string;
  funded_percentage: number;
}

interface UnitCardProps {
  unit: Unit;
  onClick: () => void;
}

const UnitCard = ({ unit, onClick }: UnitCardProps) => {
  const getUnitTypeColor = (type: string) => {
    switch (type) {
      case "BEACHFRONT PREMIUM":
        return "bg-amber-50 border-amber-200";
      case "BEACH VIEW":
        return "bg-blue-50 border-blue-200";
      case "GARDEN PARADISE":
        return "bg-emerald-50 border-emerald-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getOwnershipBadge = (ownershipType: string) => {
    if (ownershipType === "filipino_only") {
      return (
        <Badge className="bg-blue-100 text-blue-800 text-xs">
          Filipino Only
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-800 text-xs">
        Foreign Allowed
      </Badge>
    );
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${getUnitTypeColor(unit.unit_type)}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        {/* Unit Header */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-black text-sm">
              UNIT {unit.unit_number} - {unit.unit_type}
            </h3>
            {getOwnershipBadge(unit.ownership_type)}
          </div>
        </div>

        {/* TORING SOLID */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600 font-medium">
              TORING SOLID {unit.toring_solid} / {unit.lbbl}
            </span>
            <span className="text-xs font-bold text-black">
              {unit.funded_percentage}% Funded
            </span>
          </div>
          <Progress value={unit.funded_percentage} className="h-2 mb-2" />
        </div>

        {/* Annual Report */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">
              <strong>AVAILABLE:</strong> {unit.annual_report.volume.toLocaleString()} ({unit.annual_report.regime})
            </span>
          </div>
          <div className="flex justify-between items-center text-xs mt-1">
            <span className="text-gray-600">
              <strong>Filipino ({unit.ownership_type === "filipino_only" ? "60%" : "40%"}):</strong> 884 Volume
            </span>
          </div>
        </div>

        {/* Invest Flow */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-600">
            <strong>Invest Flow - ${unit.invest_flow}/Volume</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitCard;
