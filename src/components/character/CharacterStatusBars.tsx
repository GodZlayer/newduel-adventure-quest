
import React from "react";
import { Shield, Sword, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CharacterStatusBarsProps {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  stamina: number;
  maxStamina: number;
}

const CharacterStatusBars: React.FC<CharacterStatusBarsProps> = ({
  health,
  maxHealth,
  mana,
  maxMana,
  stamina,
  maxStamina
}) => {
  // Calculate progress percentages
  const healthProgress = Math.floor((health / maxHealth) * 100);
  const manaProgress = Math.floor((mana / maxMana) * 100);
  const staminaProgress = Math.floor((stamina / maxStamina) * 100);
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="flex items-center">
            <Shield className="h-3 w-3 mr-1 text-red-500" />
            Health
          </span>
          <span>{health} / {maxHealth}</span>
        </div>
        <Progress value={healthProgress} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
      </div>
      
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="flex items-center">
            <Zap className="h-3 w-3 mr-1 text-blue-500" />
            Mana
          </span>
          <span>{mana} / {maxMana}</span>
        </div>
        <Progress value={manaProgress} className="h-2 bg-gray-200" indicatorClassName="bg-blue-500" />
      </div>
      
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="flex items-center">
            <Sword className="h-3 w-3 mr-1 text-yellow-500" />
            Stamina
          </span>
          <span>{stamina} / {maxStamina}</span>
        </div>
        <Progress value={staminaProgress} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-500" />
      </div>
    </div>
  );
};

export default CharacterStatusBars;
