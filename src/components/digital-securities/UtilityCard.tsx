
import { Star } from "lucide-react";

interface UtilityCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  features: string[];
}

const UtilityCard = ({ icon: Icon, title, description, color, bgColor, features }: UtilityCardProps) => {
  return (
    <div className="utility-card group hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-start gap-6">
        <div className={`p-4 rounded-2xl ${bgColor} group-hover:scale-110 transition-transform`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-gray-700 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
          <div className="space-y-2">
            {features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center gap-3">
                <Star className={`w-4 h-4 ${color}`} />
                <span className="text-sm text-gray-500">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityCard;
