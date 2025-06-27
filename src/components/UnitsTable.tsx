
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useInvestmentModal } from "@/hooks/useInvestmentModal";
import {
  ModernTable,
  ModernTableHeader,
  ModernTableBody,
  ModernTableRow,
  ModernTableCell,
  ModernTableHeadCell
} from "@/components/ui/modern-table";

interface Unit {
  id: string;
  name: string;
  unit_type: string;
  total_securities: number;
  available_securities: number;
  security_price_usd: number;
  ownership_type: string;
  status: string;
  funded_percentage: number;
}

interface UnitsTableProps {
  units: Unit[];
}

const UnitsTable = ({ units }: UnitsTableProps) => {
  const { openModal } = useInvestmentModal();

  const getOwnershipBadge = (ownershipType: string) => {
    if (ownershipType === "filipino_only") {
      return (
        <Badge className="bg-blue-100 text-blue-800 text-xs">
          🇵🇭 Filipino Only
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-800 text-xs">
        🌍 Foreign Allowed
      </Badge>
    );
  };

  const getStatusBadge = (status: string, fundedPercentage: number) => {
    if (fundedPercentage >= 100) {
      return (
        <Badge className="bg-red-100 text-red-800 text-xs">
          Fully Funded
        </Badge>
      );
    }
    if (status === 'available') {
      return (
        <Badge className="bg-green-100 text-green-800 text-xs">
          Available
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 text-xs">
        Sold Out
      </Badge>
    );
  };

  const handleInvestClick = (unit: Unit) => {
    openModal({
      id: unit.id,
      name: unit.name,
      token_price_usd: unit.security_price_usd,
      unit_type: unit.unit_type,
      ownership_type: unit.ownership_type
    });
  };

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <ModernTable>
          <ModernTableHeader>
            <ModernTableRow>
              <ModernTableHeadCell>Unit Details</ModernTableHeadCell>
              <ModernTableHeadCell>Ownership Type</ModernTableHeadCell>
              <ModernTableHeadCell align="center">Funding Progress</ModernTableHeadCell>
              <ModernTableHeadCell align="right">Security Price</ModernTableHeadCell>
              <ModernTableHeadCell align="center">Status</ModernTableHeadCell>
              <ModernTableHeadCell align="center">Action</ModernTableHeadCell>
            </ModernTableRow>
          </ModernTableHeader>
          <ModernTableBody>
            {units.map((unit) => (
              <ModernTableRow key={unit.id}>
                <ModernTableCell>
                  <div>
                    <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                    <p className="text-sm text-gray-600">{unit.unit_type}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Securities: {unit.total_securities - unit.available_securities} / {unit.total_securities}
                    </p>
                  </div>
                </ModernTableCell>
                <ModernTableCell>
                  {getOwnershipBadge(unit.ownership_type)}
                </ModernTableCell>
                <ModernTableCell align="center">
                  <div className="w-32 mx-auto">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{unit.funded_percentage}%</span>
                      <span>Funded</span>
                    </div>
                    <Progress value={unit.funded_percentage} className="h-2" />
                  </div>
                </ModernTableCell>
                <ModernTableCell align="right">
                  <span className="text-lg font-bold text-gray-900">
                    ${unit.security_price_usd.toLocaleString()}
                  </span>
                  <p className="text-xs text-gray-500">per security</p>
                </ModernTableCell>
                <ModernTableCell align="center">
                  {getStatusBadge(unit.status, unit.funded_percentage)}
                </ModernTableCell>
                <ModernTableCell align="center">
                  {unit.status === 'available' && unit.funded_percentage < 100 ? (
                    <Button 
                      onClick={() => handleInvestClick(unit)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2"
                    >
                      Invest Now
                    </Button>
                  ) : (
                    <span className="text-gray-400 text-sm">Unavailable</span>
                  )}
                </ModernTableCell>
              </ModernTableRow>
            ))}
          </ModernTableBody>
        </ModernTable>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {units.map((unit) => (
          <div key={unit.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                <p className="text-sm text-gray-600">{unit.unit_type}</p>
              </div>
              {getOwnershipBadge(unit.ownership_type)}
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Funding Progress</span>
                <span>{unit.funded_percentage}% Funded</span>
              </div>
              <Progress value={unit.funded_percentage} className="h-2" />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  ${unit.security_price_usd.toLocaleString()}
                </span>
                <p className="text-xs text-gray-500">per security</p>
              </div>
              {getStatusBadge(unit.status, unit.funded_percentage)}
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Securities: {unit.total_securities - unit.available_securities} / {unit.total_securities}
            </div>

            {unit.status === 'available' && unit.funded_percentage < 100 ? (
              <Button 
                onClick={() => handleInvestClick(unit)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Invest Now - ${unit.security_price_usd}
              </Button>
            ) : (
              <Button disabled className="w-full">
                Unavailable
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitsTable;
