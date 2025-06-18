
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import UnitCard from "./UnitCard";
import OwnershipDashboard from "./OwnershipDashboard";

const UnitsGrid = () => {
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  
  // Mock data - in real app this would come from Supabase
  const units = [
    {
      id: 1,
      unit_number: 1,
      unit_type: "BEACHFRONT PREMIUM",
      toring_solid: 1740,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "filipino_only",
      status: "available",
      funded_percentage: 82
    },
    {
      id: 2,
      unit_number: 2,
      unit_type: "BEACHFRONT PREMIUM", 
      toring_solid: 1450,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "foreign_allowed",
      status: "available",
      funded_percentage: 84
    },
    {
      id: 3,
      unit_number: 3,
      unit_type: "BEACH VIEW",
      toring_solid: 850,
      lbbl: "LBBL", 
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "filipino_only",
      status: "available",
      funded_percentage: 51
    },
    {
      id: 4,
      unit_number: 4,
      unit_type: "BEACH VIEW",
      toring_solid: 620,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "foreign_allowed", 
      status: "available",
      funded_percentage: 39
    },
    {
      id: 5,
      unit_number: 5,
      unit_type: "GARDEN PARADISE",
      toring_solid: 690,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "filipino_only",
      status: "available",
      funded_percentage: 43
    },
    {
      id: 6,
      unit_number: 6,
      unit_type: "GARDEN PARADISE",
      toring_solid: 430,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "foreign_allowed",
      status: "available", 
      funded_percentage: 36
    },
    {
      id: 7,
      unit_number: 7,
      unit_type: "GARDEN PARADISE",
      toring_solid: 590,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "filipino_only",
      status: "available",
      funded_percentage: 63
    },
    {
      id: 8,
      unit_number: 8,
      unit_type: "GARDEN PARADISE",
      toring_solid: 790,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "foreign_allowed",
      status: "available",
      funded_percentage: 56
    },
    {
      id: 9,
      unit_number: 9,
      unit_type: "GARDEN PARADISE",
      toring_solid: 1200,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "filipino_only",
      status: "available",
      funded_percentage: 89
    },
    {
      id: 10,
      unit_number: 10,
      unit_type: "GARDEN PARADISE",
      toring_solid: 0,
      lbbl: "LBBL",
      annual_report: { regime: "RPM", volume: 4440 },
      invest_flow: 450,
      ownership_type: "foreign_allowed",
      status: "available",
      funded_percentage: 0
    }
  ];

  const filipinoUnits = units.filter(unit => unit.ownership_type === "filipino_only");
  const foreignUnits = units.filter(unit => unit.ownership_type === "foreign_allowed");

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

        {/* Ownership Dashboard */}
        <OwnershipDashboard 
          filipinoUnits={filipinoUnits.length}
          foreignUnits={foreignUnits.length}
          totalUnits={units.length}
        />

        {/* Units Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {units.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
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
