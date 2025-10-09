
import { Badge } from "@/components/ui/badge";

const DigitalSecuritiesHeader = () => {
  return (
    <div className="text-center mb-20">
      <Badge className="mb-6 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 text-sm">
        Digital Securities Utility
      </Badge>
      <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">
        BBT Digital Securities
        <br />
        <span className="text-blue-600">Ecosystem</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        More than just ownership - BBT digital securities unlock a comprehensive ecosystem of 
        benefits, rights, and opportunities in the Palawan Collective community.
      </p>
    </div>
  );
};

export default DigitalSecuritiesHeader;
