
import React from "react";
import { Progress } from "@/components/ui/progress";
import CharacterAttributes from "./CharacterAttributes";
import CharacterStatusBars from "./CharacterStatusBars";

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
        
        <CharacterAttributes 
          strength={character.strength}
          agility={character.agility}
          energy={character.energy}
          resistance={character.resistance}
        />
        
        <CharacterStatusBars 
          health={character.health}
          maxHealth={character.maxHealth}
          mana={character.mana}
          maxMana={character.maxMana}
          stamina={character.stamina}
          maxStamina={character.maxStamina}
        />
      </div>
    </div>
  );
};

export default CharacterSummary;
