
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useInvestmentModal } from "@/hooks/useInvestmentModal";

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
  const { openModal } = useInvestmentModal();

  const getUnitTypeColor = (type: string) => {
    switch (type) {
      case "BEACHFRONT PREMIUM":
        return "bg-amber-50 border-amber-200 hover:border-amber-300";
      case "BEACH VIEW":
        return "bg-blue-50 border-blue-200 hover:border-blue-300";
      case "GARDEN PARADISE":
        return "bg-emerald-50 border-emerald-200 hover:border-emerald-300";
      default:
        return "bg-white border-gray-200 hover:border-gray-300";
    }
  };

  const getOwnershipBadge = (ownershipType: string) => {
    if (ownershipType === "filipino_only") {
      return (
        <Badge className="bg-blue-100 text-blue-800 text-xs flex items-center gap-1">
          🇵🇭 Filipino Only
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-800 text-xs flex items-center gap-1">
        🌍 Foreign Allowed
      </Badge>
    );
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleInvestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal({
      id: unit.id.toString(),
      name: `Unit ${unit.unit_number} - ${unit.unit_type}`,
      token_price_usd: unit.invest_flow,
      unit_type: unit.unit_type,
      ownership_type: unit.ownership_type
    });
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

        {/* DIGITAL SECURITIES SOLD */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600 font-medium">
              SECURITIES SOLD {unit.toring_solid} / {unit.lbbl}
            </span>
            <span className="text-xs font-bold text-black">
              {unit.funded_percentage}% Funded
            </span>
          </div>
          <div className="relative">
            <Progress value={unit.funded_percentage} className="h-2 mb-2" />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(unit.funded_percentage)}`}
              style={{ width: `${unit.funded_percentage}%` }}
            />
          </div>
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
              <strong>{unit.ownership_type === "filipino_only" ? "Filipino (60%)" : "Foreign (40%)"}:</strong> 884 Volume
            </span>
          </div>
        </div>

        {/* Invest Flow */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-600">
            <strong>Price - ${unit.invest_flow}/Digital Security</strong>
          </span>
        </div>

        {/* Status and Investment Button */}
        <div className="mt-3 space-y-3">
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full ${
              unit.status === 'available' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {unit.status === 'available' ? '✅ Available' : '🔒 Sold Out'}
            </span>
            {unit.funded_percentage >= 100 && (
              <span className="text-xs text-red-600 font-semibold">FULLY FUNDED</span>
            )}
          </div>
          
          {unit.status === 'available' && unit.funded_percentage < 100 && (
            <Button 
              onClick={handleInvestClick}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-2"
            >
              Invest Now - ${unit.invest_flow}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitCard;
