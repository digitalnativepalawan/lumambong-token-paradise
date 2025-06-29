
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { SimulationAdjustments } from "./types";

interface TokenGrowthControlsProps {
  adjustments: SimulationAdjustments;
  setAdjustments: (adjustments: SimulationAdjustments) => void;
}

const TokenGrowthControls = ({
  adjustments,
  setAdjustments
}: TokenGrowthControlsProps) => {
  const updateAdjustment = (key: keyof SimulationAdjustments, value: number) => {
    setAdjustments({
      ...adjustments,
      [key]: value
    });
  };

  return (
    <Card className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <h5 className="font-medium text-emerald-800 text-sm sm:text-base">Token Price Growth Modeling</h5>
        </div>

        {/* Annual Token Growth Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs sm:text-sm font-medium text-emerald-800">
              Expected Annual Token Growth
            </Label>
            <span className="text-xs text-emerald-600">
              {(adjustments.tokenGrowthPct * 100).toFixed(1)}%/year
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-600 min-w-[30px]">-5%</span>
            <Slider
              value={[adjustments.tokenGrowthPct * 100]}
              onValueChange={(value) => updateAdjustment('tokenGrowthPct', value[0] / 100)}
              min={-5}
              max={20}
              step={0.5}
              className="flex-1"
            />
            <span className="text-xs text-emerald-600 min-w-[30px]">+20%</span>
          </div>
          <div className="text-xs text-emerald-600 text-center">
            Current: {adjustments.tokenGrowthPct >= 0 ? '+' : ''}{(adjustments.tokenGrowthPct * 100).toFixed(1)}%
          </div>
        </div>

        {/* Years to Exit */}
        <div className="space-y-2">
          <Label className="text-xs sm:text-sm font-medium text-emerald-800">
            Years Until Exit
          </Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={adjustments.exitYears}
            onChange={(e) => updateAdjustment('exitYears', parseInt(e.target.value) || 12)}
            className="w-full text-center"
          />
          <div className="text-xs text-emerald-600 text-center">
            Model exit after {adjustments.exitYears} years
          </div>
        </div>

        <div className="text-xs text-emerald-700 bg-emerald-100 p-2 rounded border">
          <strong>Growth Model:</strong> Shows how token appreciation affects your total return alongside dividends.
        </div>
      </div>
    </Card>
  );
};

export default TokenGrowthControls;
