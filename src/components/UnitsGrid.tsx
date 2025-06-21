
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import UnitsTable from "./UnitsTable";
import OwnershipDashboard from "./OwnershipDashboard";
import InvestmentModal from "./InvestmentModal";
import { useRealTimeUnits } from "@/hooks/useRealTimeUnits";
import { useInvestmentModal } from "@/hooks/useInvestmentModal";
import { Loader2 } from "lucide-react";

const UnitsGrid = () => {
  const { units, tokenPools, loading, error } = useRealTimeUnits();
  const { isOpen, selectedUnit, closeModal } = useInvestmentModal();

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

  // Calculate ownership stats from token pools
  const filipinoPool = tokenPools.find(pool => pool.pool_type === 'filipino');
  const foreignPool = tokenPools.find(pool => pool.pool_type === 'foreign');

  const filipinoSold = filipinoPool?.sold_tokens || 0;
  const foreignSold = foreignPool?.sold_tokens || 0;
  const filipinoTotal = filipinoPool?.total_tokens || 6;
  const foreignTotal = foreignPool?.total_tokens || 4;

  return (
    <section className="py-20 bg-gray-50">
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

        {/* Modern Units Table */}
        <div className="mt-12">
          <UnitsTable units={units} />
        </div>

        {/* Investment Modal */}
        <InvestmentModal
          isOpen={isOpen}
          onClose={closeModal}
          unit={selectedUnit}
        />

        {/* Legal Disclaimer */}
        <div className="mt-16 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
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
