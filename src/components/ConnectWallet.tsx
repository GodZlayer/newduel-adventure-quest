
import { useState } from "react";
import Button from "./ui-custom/Button";
import Card from "./ui-custom/Card";
import { Wallet, ChevronRight } from "lucide-react";

const ConnectWallet = () => {
  const [connecting, setConnecting] = useState(false);
  
  const handleConnect = () => {
    setConnecting(true);
    // Simulate connection process
    setTimeout(() => setConnecting(false), 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-game-primary to-game-secondary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 text-sm rounded-full bg-white/10 text-white mb-4">
            Start Your Adventure
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect Your Wallet to Play
          </h2>
          <p className="text-white/70 text-lg">
            Use your Phantom Wallet to create an account, log in, and start your adventure in the world of NewDuel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            variant="glass" 
            className="md:col-span-2 p-8 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Connect Your Wallet</h3>
              <p className="text-white/70">
                Securely log in using your Phantom Wallet. Your wallet serves as your unique identity in the game,
                allowing you to own in-game assets and participate in the NewDuel economy.
              </p>
              
              <div className="flex items-center space-x-4">
                <Button 
                  className="bg-[#AB9FF2] hover:bg-[#9D8CE4] text-white"
                  size="lg"
                  isLoading={connecting}
                  onClick={handleConnect}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  <span>Connect Phantom</span>
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            {walletFeatures.map((feature, index) => (
              <WalletFeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WalletFeatureCard = ({ 
  title, 
  description 
}: { 
  title: string;
  description: string;
}) => (
  <Card 
    variant="glass" 
    className="p-4 cursor-pointer group transition-all duration-300 hover:bg-white/10"
  >
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" />
    </div>
  </Card>
);

const walletFeatures = [
  {
    title: "Secure Login",
    description: "No password needed, just connect your wallet"
  },
  {
    title: "Asset Ownership",
    description: "True ownership of your in-game items and tokens"
  },
  {
    title: "Easy Transfers",
    description: "Transfer NDC and items between accounts"
  }
];

export default ConnectWallet;
