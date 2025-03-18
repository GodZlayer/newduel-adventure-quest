
import Button from "./ui-custom/Button";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/assets/transitions";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-70"></div>
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-game-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-game-water/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero content */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn delay={0.2}>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-game-accent/10 text-game-accent border border-game-accent/20 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-game-accent mr-2"></span>
                <span>Launching Soon on Solana</span>
              </div>
            </FadeIn>
            
            <SlideUp delay={0.3}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight">
                Your Journey to Become the Ultimate
                <span className="text-game-accent block">Adventurer</span>
              </h1>
            </SlideUp>
            
            <FadeIn delay={0.5}>
              <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                Battle, explore, and conquer in this immersive MOBA/MMORPG hybrid. 
                Progress through the ranks, master elemental powers, and earn valuable 
                rewards with NDC tokens.
              </p>
            </FadeIn>
            
            <StaggerContainer className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8" delayChildren={0.7}>
              <StaggerItem>
                <Button size="lg" className="group">
                  <span>Join the Adventure</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </StaggerItem>
              <StaggerItem>
                <Button variant="outline" size="lg">
                  Watch Gameplay
                </Button>
              </StaggerItem>
            </StaggerContainer>
            
            <SlideUp delay={1}>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-game-accent">7</p>
                  <p className="text-sm text-muted-foreground">Elemental Powers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-game-accent">4</p>
                  <p className="text-sm text-muted-foreground">Character Tiers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-game-accent">∞</p>
                  <p className="text-sm text-muted-foreground">Adventure Possibilities</p>
                </div>
              </div>
            </SlideUp>
          </div>
          
          {/* Hero image/video */}
          <div className="lg:col-span-6 relative h-[400px] md:h-[500px] lg:h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="relative h-full w-full rounded-xl overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-game-primary to-game-secondary">
                {/* Placeholder for game screenshot/video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xl text-white/60 font-medium">Game Preview</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <FloatingElement 
                className="absolute top-10 left-10 h-16 w-16 bg-game-fire rounded-lg"
                delay={0.5} 
              />
              <FloatingElement 
                className="absolute top-20 right-16 h-12 w-12 bg-game-water rounded-full"
                delay={0.8} 
              />
              <FloatingElement 
                className="absolute bottom-20 left-1/4 h-14 w-14 bg-game-earth rounded-lg rotate-45"
                delay={1.2} 
              />
              <FloatingElement 
                className="absolute bottom-14 right-1/4 h-10 w-10 bg-game-air rounded-lg"
                delay={0.9} 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingElement = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.5, y: 0 }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: "easeOut" 
    }}
    className={`${className} animate-float shadow-lg`}
  />
);

export default Hero;
