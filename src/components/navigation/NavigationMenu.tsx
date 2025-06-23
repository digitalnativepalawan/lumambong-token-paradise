
import { useNavigate } from "react-router-dom";

interface NavigationMenuProps {
  scrollToContact: () => void;
}

const NavigationMenu = ({ scrollToContact }: NavigationMenuProps) => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Project", href: "#project" },
    { label: "Token Utility", href: "#utility" }, 
    { label: "Investment", href: "#investment" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact", onClick: scrollToContact },
    { label: "Business Plan", href: "/business-plan" }
  ];

  return (
    <div className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        item.href.startsWith('/') ? (
          <button
            key={item.label}
            onClick={() => navigate(item.href)}
            className="font-medium text-gray-600 hover:text-black transition-colors relative group cursor-pointer"
          >
            {item.label}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
          </button>
        ) : (
          <a
            key={item.label}
            href={item.href}
            onClick={item.onClick}
            className="font-medium text-gray-600 hover:text-black transition-colors relative group cursor-pointer"
          >
            {item.label}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
          </a>
        )
      ))}
    </div>
  );
};

export default NavigationMenu;
