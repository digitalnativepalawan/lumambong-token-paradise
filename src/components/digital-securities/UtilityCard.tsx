
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
        <div className={`p-4 rounded-2xl ${bgColor} border border-primary/30 group-hover:scale-110 transition-transform backdrop-blur-sm glow-purple`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-white/80 mb-6 leading-relaxed text-sm">
            {description}
          </p>
          <div className="space-y-2">
            {features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center gap-3">
                <Star className={`w-4 h-4 ${color}`} />
                <span className="text-sm text-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityCard;
