
import { Instagram, Facebook, Linkedin, Github } from "lucide-react";

interface SocialMediaIconsProps {
  variant?: "header" | "footer";
  className?: string;
}

const SocialMediaIcons = ({ variant = "header", className = "" }: SocialMediaIconsProps) => {
  const iconSize = variant === "header" ? "w-4 h-4" : "w-5 h-5";
  const containerClass = variant === "header" 
    ? "flex items-center gap-3" 
    : "flex items-center gap-4";

  const socialLinks = [
    {
      icon: <Instagram className={iconSize} />,
      url: "https://www.instagram.com/beachfronthideaway/",
      label: "Instagram"
    },
    {
      icon: <Facebook className={iconSize} />,
      url: "https://www.facebook.com/bingabeachresort",
      label: "Facebook"
    },
    {
      icon: <Linkedin className={iconSize} />,
      url: "https://www.linkedin.com/in/bingabeachbrothers",
      label: "LinkedIn"
    },
    {
      icon: (
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: "https://x.com/nomadpalawan",
      label: "X (Twitter)"
    },
    {
      icon: <Github className={iconSize} />,
      url: "https://github.com/digitalnativepalawan/",
      label: "GitHub"
    }
  ];

  return (
    <div className={`${containerClass} ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-current hover:text-emerald-600 transition-colors"
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
