
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import UnitCard from "./UnitCard";
import OwnershipDashboard from "./OwnershipDashboard";
import { useRealTimeUnits } from "@/hooks/useRealTimeUnits";
import { Loader2 } from "lucide-react";

const UnitsGrid = () => {
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const { units, tokenPools, loading, error } = useRealTimeUnits();

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading investment opportunities...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Error loading data: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const filipinoUnits = units.filter(unit => unit.ownership_type === "filipino_only");
  const foreignUnits = units.filter(unit => unit.ownership_type === "foreign_allowed");

  // Calculate ownership stats from token pools
  const filipinoPool = tokenPools.find(pool => pool.pool_type === 'filipino');
  const foreignPool = tokenPools.find(pool => pool.pool_type === 'foreign');

  const filipinoSold = filipinoPool?.sold_tokens || 0;
  const foreignSold = foreignPool?.sold_tokens || 0;
  const filipinoTotal = filipinoPool?.total_tokens || 6;
  const foreignTotal = foreignPool?.total_tokens || 4;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">Investment Opportunities</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Choose Your Paradise Unit
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Secure your slice of Palawan through our regulated 60/40 ownership structure. 
            Each unit offers unique benefits and investment potential.
          </p>
        </div>

        {/* Ownership Dashboard with real data */}
        <OwnershipDashboard 
          filipinoUnits={Math.min(filipinoSold, filipinoTotal)}
          foreignUnits={Math.min(foreignSold, foreignTotal)}
          totalUnits={filipinoTotal + foreignTotal}
          filipinoTotal={filipinoTotal}
          foreignTotal={foreignTotal}
        />

        {/* Units Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {units.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={{
                id: parseInt(unit.id),
                unit_number: parseInt(unit.id.slice(-1)) || 1,
                unit_type: unit.unit_type,
                toring_solid: unit.total_tokens - unit.available_tokens,
                lbbl: "LBBL",
                annual_report: { regime: "RPM", volume: 4440 },
                invest_flow: unit.token_price_usd,
                ownership_type: unit.ownership_type,
                status: unit.status,
                funded_percentage: unit.funded_percentage
              }}
              onClick={() => setSelectedUnit(unit)}
            />
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600 text-center">
            Legal Disclaimer: Investment is subject to Philippine property law. 
            Land ownership designed to foreign ownership laws, with design ownership 
            requirements. Unit selection is based on available status, 
            and terms for full compliance details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UnitsGrid;
