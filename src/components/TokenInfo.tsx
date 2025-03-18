
import { FadeIn, SlideUp, ZoomIn } from "@/assets/transitions";
import Button from "./ui-custom/Button";
import Card from "./ui-custom/Card";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

const TokenInfo = () => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText("A7qmEo17Xm2PgLmXuTjJ4fFePQpDU6s5mDBQEJRxcbH2");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="token" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-token-glow opacity-70 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <FadeIn>
              <div className="inline-block px-3 py-1 text-sm rounded-full bg-game-token/10 text-game-token mb-4">
                NDC Token
              </div>
            </FadeIn>
            
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Powered by <span className="text-game-token">NewDuelCoin</span>
              </h2>
            </SlideUp>
            
            <FadeIn delay={0.3}>
              <p className="text-lg text-muted-foreground">
                The native currency of the NewDuel ecosystem. Use NDC for in-game purchases, trading, 
                and earning rewards for your achievements in the world of adventure.
              </p>
            </FadeIn>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button variant="token" className="flex items-center gap-2">
                <span>View on Solscan</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <span>Explorer</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            <Card variant="outline" className="p-4 max-w-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Token Address</p>
                  <p className="font-mono text-sm truncate max-w-[250px] sm:max-w-[350px]">
                    A7qmEo17Xm2PgLmXuTjJ4fFePQpDU6s5mDBQEJRxcbH2
                  </p>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                  aria-label="Copy token address"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </Card>
          </div>
          
          <ZoomIn delay={0.3}>
            <div className="relative token-glow">
              <Card variant="glass" className="p-6 border border-game-token/20">
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-game-token flex items-center justify-center">
                        <span className="font-bold text-white">NDC</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">NewDuelCoin</h3>
                        <p className="text-white/70 text-sm">NDC</p>
                      </div>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg">
                      <span className="text-white/80 text-sm">On Solana</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {tokenFeatures.map((feature) => (
                      <div key={feature.name} className="space-y-1">
                        <p className="text-white/60 text-sm">{feature.name}</p>
                        <p className="font-medium text-lg text-white">{feature.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="font-medium mb-3">Token Utility</h4>
                    <ul className="space-y-2 text-white/80">
                      {tokenUtility.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-game-token"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </ZoomIn>
        </div>
      </div>
    </section>
  );
};

const tokenFeatures = [
  { name: "Network", value: "Solana" },
  { name: "Type", value: "SPL Token" },
  { name: "Symbol", value: "NDC" },
  { name: "Cluster", value: "Devnet" }
];

const tokenUtility = [
  "In-game purchases and upgrades",
  "Trading between players (10-30% fee)",
  "Special item crafting material",
  "Guild membership and advancement",
  "Tournament entry and rewards"
];

export default TokenInfo;
