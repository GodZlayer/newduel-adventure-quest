
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import Button from "./ui-custom/Button";
import { ChevronDown, Menu, X, Wallet } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { connect, disconnect, walletStatus, publicKey } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectWallet = async () => {
    if (walletStatus === 'connected') {
      await disconnect();
    } else {
      await connect();
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 bg-game-accent rounded-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse-soft"></div>
            <span className="relative font-heading font-extrabold text-white">ND</span>
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">NewDuel</span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#characters">Characters</NavItem>
          <NavItem href="#token">NDC Token</NavItem>
          <NavItem href="#gameplay" hasDropdown>Gameplay</NavItem>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {publicKey ? (
            <div className="text-sm bg-game-primary/40 px-2 py-1 rounded border border-game-accent/20">
              {publicKey.slice(0, 6)}...{publicKey.slice(-4)}
            </div>
          ) : null}
          <Button 
            variant="outline" 
            size="sm"
            className="transition-all hover:text-game-accent"
          >
            Login
          </Button>
          <Button 
            onClick={handleConnectWallet}
            isLoading={walletStatus === 'connecting'}
          >
            {walletStatus === 'connected' ? 'Disconnect' : 'Connect Wallet'}
          </Button>
        </div>
        
        <button 
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
        
        {/* Mobile menu */}
        <div 
          className={`md:hidden fixed inset-0 z-50 bg-background ${
            mobileMenuOpen ? "flex" : "hidden"
          } flex-col pt-24 pb-8 px-6`}
        >
          <button 
            className="absolute top-4 right-4 p-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex flex-col space-y-4">
            <MobileNavItem href="#features" onClick={() => setMobileMenuOpen(false)}>Features</MobileNavItem>
            <MobileNavItem href="#characters" onClick={() => setMobileMenuOpen(false)}>Characters</MobileNavItem>
            <MobileNavItem href="#token" onClick={() => setMobileMenuOpen(false)}>NDC Token</MobileNavItem>
            <MobileNavItem href="#gameplay" onClick={() => setMobileMenuOpen(false)}>Gameplay</MobileNavItem>
          </div>
          
          <div className="mt-8 flex flex-col space-y-3">
            <Button variant="outline" className="w-full">Login</Button>
            <Button 
              className="w-full"
              onClick={handleConnectWallet}
              isLoading={walletStatus === 'connecting'}
            >
              {walletStatus === 'connected' ? 'Disconnect' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ 
  href, 
  children, 
  hasDropdown = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  hasDropdown?: boolean;
}) => (
  <a
    href={href}
    className="relative px-3 py-2 text-sm font-medium rounded-md hover:bg-muted group"
  >
    <div className="flex items-center">
      <span>{children}</span>
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4 opacity-70" />}
    </div>
    
    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-game-accent transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const MobileNavItem = ({ 
  href, 
  children,
  onClick
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <a
    href={href}
    className="py-3 text-lg font-medium border-b border-border"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Header;
