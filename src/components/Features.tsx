
import { StaggerContainer, StaggerItem } from "@/assets/transitions";
import Card from "./ui-custom/Card";
import { 
  Sword, 
  Trophy, 
  UserPlus, 
  Zap, 
  ShieldCheck, 
  Flame,
  Droplet,
  Wind
} from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 text-sm rounded-full bg-game-accent/10 text-game-accent mb-4">
            Game Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Adventure, Battle, and Conquer
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience a unique blend of MOBA and MMORPG gameplay with strategic combat,
            character progression, and an immersive game world.
          </p>
        </div>
        
        <div className="animate-reveal">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <FeatureCard {...feature} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        
        <div className="mt-20 pt-10 border-t border-border">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Master the Seven Elements
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each element provides unique powers and abilities. Earn elemental points as you level up your Energy attribute.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {elements.map((element) => (
              <ElementCard key={element.name} {...element} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <Card 
    variant="premium" 
    className="h-full transition-transform duration-300 hover:-translate-y-1"
  >
    <div className="space-y-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-game-accent/10 text-game-accent">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </Card>
);

const ElementCard = ({ 
  name, 
  color, 
  icon: Icon 
}: { 
  name: string; 
  color: string;
  icon: React.ElementType;
}) => (
  <div 
    className={`text-center p-4 rounded-lg ${color} flex flex-col items-center space-y-3 transition-transform duration-300 hover:-translate-y-1`}
  >
    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
      <Icon className="h-6 w-6" />
    </div>
    <span className="font-medium text-white">{name}</span>
  </div>
);

const features = [
  {
    icon: Sword,
    title: "Strategic Combat",
    description: "Engage in dynamic battles that combine MOBA mechanics with MMORPG depth. Master abilities and outplay your opponents."
  },
  {
    icon: Trophy,
    title: "Rank Progression",
    description: "Climb the ranks in the Adventurers Guild. Earn recognition and access to exclusive high-level missions and rewards."
  },
  {
    icon: UserPlus,
    title: "Party Formation",
    description: "Team up with friends to tackle challenging missions. Combine your skills and strategies for greater rewards."
  },
  {
    icon: Zap,
    title: "Elemental Powers",
    description: "Harness the power of seven elements. Customize your character with unique elemental abilities that shape your playstyle."
  },
  {
    icon: ShieldCheck,
    title: "Balanced Economy",
    description: "Fair gameplay between free and premium players. Access equivalent items with a maximum advantage of just 10-20%."
  },
  {
    icon: UserPlus,
    title: "Crafting System",
    description: "Create unique items that define your adventure. The best items in the game are crafted, not purchased."
  },
];

const elements = [
  { name: "Fire", color: "bg-game-fire", icon: Flame },
  { name: "Water", color: "bg-game-water", icon: Droplet },
  { name: "Earth", color: "bg-game-earth", icon: ShieldCheck },
  { name: "Air", color: "bg-game-air", icon: Wind },
  { name: "Light", color: "bg-game-light", icon: Zap },
  { name: "Dark", color: "bg-game-dark", icon: UserPlus },
  { name: "Time", color: "bg-game-time", icon: Trophy },
];

export default Features;
