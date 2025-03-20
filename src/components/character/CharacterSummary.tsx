
import React from "react";
import { Shield, Sword, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CharacterSummaryProps {
  character: {
    name: string;
    level: number;
    element: string;
    class: string;
    experience: number;
    nextLevelExp: number;
    strength: number;
    agility: number;
    energy: number;
    resistance: number;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    stamina: number;
    maxStamina: number;
  };
  elementColorMap: Record<string, string>;
}

const CharacterSummary: React.FC<CharacterSummaryProps> = ({ character, elementColorMap }) => {
  // Calculate progress percentages
  const expProgress = Math.floor((character.experience / character.nextLevelExp) * 100);
  const healthProgress = Math.floor((character.health / character.maxHealth) * 100);
  const manaProgress = Math.floor((character.mana / character.maxMana) * 100);
  const staminaProgress = Math.floor((character.stamina / character.maxStamina) * 100);
  
  // Get element color
  const elementColor = elementColorMap[character.element] || 'gray-400';
  
  return (
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
  );
};

export default CharacterSummary;
