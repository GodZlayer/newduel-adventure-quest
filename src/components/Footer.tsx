
import { FadeIn } from "@/assets/transitions";

const Footer = () => {
  return (
    <footer className="bg-game-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <FadeIn delay={0.1}>
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-8 bg-game-accent rounded-full flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <span className="relative font-heading font-extrabold text-white">ND</span>
                </div>
                <span className="font-heading font-bold text-xl">NewDuel</span>
              </div>
              
              <p className="text-white/70 mb-6">
                The next generation of adventure questing. Combine your skills, elements, and strategy to become the ultimate adventurer.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div>
              <h3 className="font-bold text-lg mb-4">Game</h3>
              <ul className="space-y-3">
                {gameLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <div>
              <h3 className="font-bold text-lg mb-4">Token</h3>
              <ul className="space-y-3">
                {tokenLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2023 NewDuel. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Import these from lucide-react
import { 
  Twitter, 
  Discord, 
  Globe, 
  Github 
} from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Discord, href: "#", label: "Discord" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Github, href: "#", label: "GitHub" }
];

const gameLinks = [
  { label: "Features", href: "#features" },
  { label: "Characters", href: "#characters" },
  { label: "Gameplay", href: "#gameplay" },
  { label: "Roadmap", href: "#" },
  { label: "Whitepaper", href: "#" }
];

const tokenLinks = [
  { label: "NDC Token", href: "#token" },
  { label: "Tokenomics", href: "#" },
  { label: "Solscan", href: "https://solscan.io/token/A7qmEo17Xm2PgLmXuTjJ4fFePQpDU6s5mDBQEJRxcbH2?cluster=devnet" },
  { label: "Solana Explorer", href: "https://explorer.solana.com/address/A7qmEo17Xm2PgLmXuTjJ4fFePQpDU6s5mDBQEJRxcbH2?cluster=devnet" }
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Community", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" }
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" }
];

export default Footer;
