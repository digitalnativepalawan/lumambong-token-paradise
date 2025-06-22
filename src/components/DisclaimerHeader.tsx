
import { AlertTriangle } from "lucide-react";

const DisclaimerHeader = () => {
  return (
    <div className="bg-orange-100 border-b border-orange-200 py-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
          <p className="text-sm md:text-base text-orange-800 font-medium">
            This is a mock website and is not yet fully compliant. All features and content are subject to change until compliance is achieved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerHeader;
