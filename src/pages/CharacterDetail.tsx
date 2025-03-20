import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect, useState } from "react";
import { Shield, Sword, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Character detail component
const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock elemental type to color mapping
  const elementColorMap: Record<string, string> = {
    fire: "game-fire",
    water: "game-water",
    earth: "game-earth",
    air: "game-air",
    lightning: "game-accent",
    ice: "game-water",
    nature: "game-earth",
    shadow: "game-secondary",
    light: "game-token",
  };

  useEffect(() => {
    // Simulate fetching character data
    setTimeout(() => {
      setCharacter({
        id: Number(id),
        name: "Aragorn",
        level: 24,
        experience: 5600,
        nextLevelExp: 8000,
        class: "Warrior",
        element: "fire",
        strength: 18,
        agility: 14,
        energy: 10,
        resistance: 12,
        health: 840,
        maxHealth: 1000,
        mana: 220,
        maxMana: 350,
        stamina: 80,
        maxStamina: 100,
        skills: [
          { id: 1, name: "Blade Fury", element: "fire", damage: 180, cooldown: 5 },
          { id: 2, name: "Shield Bash", element: "earth", damage: 120, cooldown: 3 },
          { id: 3, name: "Raging Strike", element: "fire", damage: 250, cooldown: 8 },
        ],
        equipment: [
          { slot: "Weapon", name: "Anduril", rarity: "Legendary", stats: { strength: 5, damage: 120 } },
          { slot: "Shield", name: "Tower Shield", rarity: "Rare", stats: { resistance: 3, defense: 80 } },
          { slot: "Helmet", name: "Helm of Valor", rarity: "Epic", stats: { resistance: 2, health: 150 } },
          { slot: "Armor", name: "Chainmail", rarity: "Uncommon", stats: { resistance: 4, health: 200 } },
          { slot: "Boots", name: "Swift Boots", rarity: "Rare", stats: { agility: 3, speed: 15 } },
        ],
        inventory: [
          { id: 101, name: "Health Potion", quantity: 5, effect: "Restore 250 HP" },
          { id: 102, name: "Mana Potion", quantity: 3, effect: "Restore 150 MP" },
          { id: 103, name: "Dragon Scale", quantity: 1, effect: "Crafting Material" },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-1/4"></div>
            <div className="h-72 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!character) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Character not found</h1>
          <p>The character you're looking for doesn't exist or has been deleted.</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Calculate progress percentage
  const expProgress = Math.floor((character.experience / character.nextLevelExp) * 100);
  const healthProgress = Math.floor((character.health / character.maxHealth) * 100);
  const manaProgress = Math.floor((character.mana / character.maxMana) * 100);
  const staminaProgress = Math.floor((character.stamina / character.maxStamina) * 100);

  // Helper to get color class based on equipment rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'text-game-accent';
      case 'epic': return 'text-purple-500';
      case 'rare': return 'text-blue-500';
      case 'uncommon': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  // Get element color
  const elementColor = elementColorMap[character.element] || 'gray-400';

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{character.name}</h1>
                <span className={`px-2 py-1 text-xs rounded bg-${elementColor}/10 text-${elementColor} border border-${elementColor}/20`}>
                  Level {character.level}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Experience</span>
                    <span>{character.experience} / {character.nextLevelExp}</span>
                  </div>
                  <Progress value={expProgress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-game-fire/10 rounded">
                    <p className="text-xs text-muted-foreground">STR</p>
                    <p className="font-semibold text-game-fire">{character.strength}</p>
                  </div>
                  <div className="text-center p-2 bg-game-air/10 rounded">
                    <p className="text-xs text-muted-foreground">AGI</p>
                    <p className="font-semibold text-game-air">{character.agility}</p>
                  </div>
                  <div className="text-center p-2 bg-game-water/10 rounded">
                    <p className="text-xs text-muted-foreground">ENE</p>
                    <p className="font-semibold text-game-water">{character.energy}</p>
                  </div>
                </div>
                
                <div className="text-center p-2 bg-game-earth/10 rounded">
                  <p className="text-xs text-muted-foreground">RES</p>
                  <p className="font-semibold text-game-earth">{character.resistance}</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-red-500" />
                      Health
                    </span>
                    <span>{character.health} / {character.maxHealth}</span>
                  </div>
                  <Progress value={healthProgress} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-blue-500" />
                      Mana
                    </span>
                    <span>{character.mana} / {character.maxMana}</span>
                  </div>
                  <Progress value={manaProgress} className="h-2 bg-gray-200" indicatorClassName="bg-blue-500" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Sword className="h-3 w-3 mr-1 text-yellow-500" />
                      Stamina
                    </span>
                    <span>{character.stamina} / {character.maxStamina}</span>
                  </div>
                  <Progress value={staminaProgress} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-500" />
                </div>
              </div>
            </div>
            
            {/* Equipment Section */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Equipment</h2>
              <div className="space-y-3">
                {character.equipment.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{item.slot}</p>
                      <p className={`text-sm ${getRarityColor(item.rarity)}`}>{item.name}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Object.entries(item.stats).map(([key, value]: [string, any]) => (
                        <span key={key} className="ml-2">
                          {key.charAt(0).toUpperCase() + key.slice(1)}: +{value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Skills and Inventory */}
          <div className="lg:col-span-2 space-y-6">
            {/* Character Skills */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="space-y-4">
                {character.skills.map((skill: any) => {
                  const skillElementColor = elementColorMap[skill.element] || 'gray-400';
                  const colorBase = typeof skillElementColor === 'string' ? skillElementColor.split('-')[0] : 'game';
                  return (
                    <div key={skill.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <h3 className="font-medium">{skill.name}</h3>
                        <div className="flex items-center text-sm">
                          <span className={`text-${colorBase}-${skillElementColor.includes('-') ? skillElementColor.split('-')[1] : 'accent'}`}>
                            {skill.element.charAt(0).toUpperCase() + skill.element.slice(1)}
                          </span>
                          <span className="mx-2">•</span>
                          <span>Damage: {skill.damage}</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Cooldown: {skill.cooldown}s</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Inventory */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Inventory</h2>
              <div className="space-y-4">
                {character.inventory.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.effect}</p>
                    </div>
                    <div className="text-sm">
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CharacterDetail;
