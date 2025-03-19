
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/components/ui-custom/Button";
import { FadeIn, SlideUp } from "@/assets/transitions";
import { useWallet } from "@/context/WalletContext";

const Home = () => {
  const { walletStatus } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-secondary/20 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-game-accent/10 text-game-accent border border-game-accent/20 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-game-accent mr-2"></span>
              <span>Powered by Solana</span>
            </div>
          </FadeIn>
          
          <SlideUp delay={0.3}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your Journey to Become the Ultimate
              <span className="text-game-accent block">Adventurer</span>
            </h1>
          </SlideUp>
          
          <FadeIn delay={0.5}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Battle, explore, and conquer in this immersive MOBA/MMORPG hybrid. 
              Create your character and progress through the ranks with NDC tokens.
            </p>
          </FadeIn>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {walletStatus === 'connected' ? (
              <>
                <Button size="lg" className="group" asChild>
                  <Link to="/characters">
                    <span>Manage Characters</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/premium">Premium Benefits</Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="group" asChild>
                  <Link to="/connect">
                    <span>Connect Wallet</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <a href="#about">Learn More</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div id="about" className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="w-12 h-12 bg-game-fire/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-game-fire font-bold text-xl">7</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Elemental Powers</h3>
              <p className="text-muted-foreground">Master seven unique elemental powers to dominate the battlefield.</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="w-12 h-12 bg-game-water/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-game-water font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Character Tiers</h3>
              <p className="text-muted-foreground">Advance through four character tiers with unique abilities and rewards.</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="w-12 h-12 bg-game-accent/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-game-accent font-bold text-xl">∞</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adventure Possibilities</h3>
              <p className="text-muted-foreground">Endless adventure possibilities with unique quests and challenges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
