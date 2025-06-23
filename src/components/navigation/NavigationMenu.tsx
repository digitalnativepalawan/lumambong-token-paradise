
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationMenuProps {
  scrollToContact: () => void;
}

const NavigationMenu = ({ scrollToContact }: NavigationMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string, onClick?: () => void) => {
    if (onClick) {
      // Special handling for contact button
      if (href === "#contact") {
        if (location.pathname !== '/') {
          // If not on homepage, navigate to homepage with contact hash
          navigate('/#contact');
          // Use setTimeout to ensure navigation completes before scrolling
          setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
          return;
        } else {
          // If on homepage, use the scroll function
          onClick();
          return;
        }
      }
      onClick();
      return;
    }

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    // If we're not on the homepage and trying to access hash links, go to home first
    if (location.pathname !== '/' && href.startsWith('#')) {
      navigate('/' + href);
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // For hash links on the same page
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // For external links
    window.open(href, '_blank');
  };

  const navItems = [
    { label: "Project", href: "#project" },
    { label: "Token Utility", href: "#utility" }, 
    { label: "Investment", href: "#investment" },
    { label: "Location", href: "#location" },
    { label: "Business Plan", href: "/business-plan" }
  ];

  return (
    <div className="hidden lg:flex items-center gap-6">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => handleNavigation(item.href, item.onClick)}
          className="font-medium text-gray-600 hover:text-black transition-colors relative group cursor-pointer text-sm whitespace-nowrap"
        >
          {item.label}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
        </button>
      ))}
    </div>
  );
};

export default NavigationMenu;
