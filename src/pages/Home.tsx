
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
              <span>Powered by GodZlayer</span>
            </div>
          </FadeIn>
          
          <SlideUp delay={0.3}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your Journey to Become the Top #1 Adventurer 
              <span className="text-game-accent block">in this World</span>
            </h1>
          </SlideUp>
          
          <FadeIn delay={0.5}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Create your itens, make unlimited skill combinations, Be yourself and try to be the Number ONE.
            </p>
          </FadeIn>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {walletStatus === 'connected' ? (
              <>
                <Link to="/characters">
                  <Button size="lg" className="group">
                    <span>Manage Characters</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/premium">
                  <Button variant="outline" size="lg">
                    Premium Benefits
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/connect">
                <Button size="lg" className="group">
                  <span>Join</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
