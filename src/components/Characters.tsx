
import Card from "./ui-custom/Card";
import { StaggerContainer, StaggerItem } from "@/assets/transitions";
import { Shield, Zap, User, Crown } from "lucide-react";

const Characters = () => {
  return (
    <section id="characters" className="py-20 bg-gradient-to-b from-background to-game-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 text-sm rounded-full bg-game-accent/10 text-game-accent mb-4">
            Character Tiers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Choose Your Path to Victory
          </h2>
          <p className="text-muted-foreground text-lg">
            Select from different account types, each offering unique advantages and the ability to create and customize multiple characters.
          </p>
        </div>
        
        <div className="animate-reveal">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {characterTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <CharacterTierCard {...tier} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        
        <div className="mt-20 bg-card rounded-lg border border-border p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Customize Your Character
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Allocate points to key attributes that define your character's strengths and abilities.
              </p>
              
              <div className="space-y-4">
                {attributes.map((attribute) => (
                  <AttributeBar key={attribute.name} {...attribute} />
                ))}
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden bg-gradient-to-br from-game-primary to-game-secondary h-[300px] md:h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/60 font-medium">Character Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CharacterTierCard = ({ 
  icon: Icon, 
  name, 
  characters, 
  description,
  featured
}: {
  icon: React.ElementType;
  name: string;
  characters: number;
  description: string;
  featured?: boolean;
}) => (
  <Card 
    variant={featured ? "premium" : "default"} 
    className={`h-full ${featured ? "border-game-accent/40" : ""}`}
    interactive
  >
    <div className="space-y-4">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${
        featured ? "bg-game-accent text-white" : "bg-muted text-foreground"
      }`}>
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="text-xl font-semibold">{name}</h3>
      
      <div className="bg-background/50 rounded-lg px-3 py-2 inline-block">
        <span className="font-semibold">{characters} Characters</span>
      </div>
      
      <p className="text-muted-foreground">{description}</p>
      
      {featured && (
        <div className="absolute top-3 right-3 bg-game-accent text-white text-xs px-2 py-1 rounded-full">
          Popular
        </div>
      )}
    </div>
  </Card>
);

const AttributeBar = ({ 
  name, 
  value, 
  maxValue, 
  color 
}: { 
  name: string; 
  value: number; 
  maxValue: number;
  color: string;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="font-medium">{name}</span>
      <span className="text-sm text-muted-foreground">{value}/{maxValue}</span>
    </div>
    <div className="h-2 bg-background rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${(value / maxValue) * 100}%` }}
      ></div>
    </div>
  </div>
);

const characterTiers = [
  {
    icon: User,
    name: "Free",
    characters: 3,
    description: "Begin your adventure with a free account. Create up to three characters and explore the world of NewDuel."
  },
  {
    icon: Shield,
    name: "Premium",
    characters: 5,
    description: "Upgrade to Premium for additional character slots and enhanced features to boost your adventure.",
    featured: true
  },
  {
    icon: Crown,
    name: "Game Master",
    characters: 6,
    description: "Guide others through the world as a Game Master with special abilities and six character slots."
  },
  {
    icon: Zap,
    name: "Admin",
    characters: 10,
    description: "The ultimate experience with ten character slots and access to exclusive administrative features."
  }
];

const attributes = [
  { name: "Physical", value: 75, maxValue: 100, color: "bg-game-fire" },
  { name: "Agility", value: 60, maxValue: 100, color: "bg-game-air" },
  { name: "Energy", value: 85, maxValue: 100, color: "bg-game-water" },
  { name: "Resistance", value: 50, maxValue: 100, color: "bg-game-earth" }
];

export default Characters;
