
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { SimulationAdjustments } from "./types";

interface AdjustmentControlsProps {
  adjustments: SimulationAdjustments;
  setAdjustments: (adjustments: SimulationAdjustments) => void;
}

const AdjustmentControls = ({
  adjustments,
  setAdjustments
}: AdjustmentControlsProps) => {
  const updateAdjustment = (key: keyof SimulationAdjustments, value: number) => {
    setAdjustments({
      ...adjustments,
      [key]: value
    });
  };

  return (
    <Card className="p-3 sm:p-4 bg-blue-50 border border-blue-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-blue-600" />
          <h5 className="font-medium text-blue-800 text-sm sm:text-base">What-If Scenario Controls</h5>
        </div>

        {/* Nightly Rate Adjustment */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs sm:text-sm font-medium text-blue-800">
              Nightly Rate Adjustment
            </Label>
            <span className="text-xs text-blue-600">
              ${(200 + adjustments.rateDelta).toFixed(0)}/night
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-blue-600 min-w-[30px]">-$20</span>
            <Slider
              value={[adjustments.rateDelta]}
              onValueChange={(value) => updateAdjustment('rateDelta', value[0])}
              min={-20}
              max={50}
              step={5}
              className="flex-1"
            />
            <span className="text-xs text-blue-600 min-w-[30px]">+$50</span>
          </div>
          <div className="text-xs text-blue-600 text-center">
            Current: {adjustments.rateDelta >= 0 ? '+' : ''}${adjustments.rateDelta}
          </div>
        </div>

        {/* High Season Occupancy */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs sm:text-sm font-medium text-blue-800">
              High Season Occupancy
            </Label>
            <span className="text-xs text-blue-600">
              {((80 + adjustments.highOccDelta)).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-blue-600 min-w-[30px]">70%</span>
            <Slider
              value={[adjustments.highOccDelta]}
              onValueChange={(value) => updateAdjustment('highOccDelta', value[0])}
              min={-10}
              max={10}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-blue-600 min-w-[30px]">90%</span>
          </div>
          <div className="text-xs text-blue-600 text-center">
            Adjustment: {adjustments.highOccDelta >= 0 ? '+' : ''}{adjustments.highOccDelta}pp
          </div>
        </div>

        {/* Low Season Occupancy */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs sm:text-sm font-medium text-blue-800">
              Low Season Occupancy
            </Label>
            <span className="text-xs text-blue-600">
              {((60 + adjustments.lowOccDelta)).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-blue-600 min-w-[30px]">50%</span>
            <Slider
              value={[adjustments.lowOccDelta]}
              onValueChange={(value) => updateAdjustment('lowOccDelta', value[0])}
              min={-10}
              max={10}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-blue-600 min-w-[30px]">70%</span>
          </div>
          <div className="text-xs text-blue-600 text-center">
            Adjustment: {adjustments.lowOccDelta >= 0 ? '+' : ''}{adjustments.lowOccDelta}pp
          </div>
        </div>

        {/* Amenity Take Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs sm:text-sm font-medium text-blue-800">
              Amenity Revenue Rate
            </Label>
            <span className="text-xs text-blue-600">
              {((10 + adjustments.amenityDelta)).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-blue-600 min-w-[30px]">0%</span>
            <Slider
              value={[adjustments.amenityDelta]}
              onValueChange={(value) => updateAdjustment('amenityDelta', value[0])}
              min={-10}
              max={10}
              step={0.5}
              className="flex-1"
            />
            <span className="text-xs text-blue-600 min-w-[30px]">20%</span>
          </div>
          <div className="text-xs text-blue-600 text-center">
            Adjustment: {adjustments.amenityDelta >= 0 ? '+' : ''}{adjustments.amenityDelta.toFixed(1)}pp
          </div>
        </div>

        <div className="text-xs text-blue-700 bg-blue-100 p-2 rounded border">
          <strong>Tip:</strong> Adjust these parameters to see how operational improvements affect your dividend returns.
        </div>
      </div>
    </Card>
  );
};

export default AdjustmentControls;
