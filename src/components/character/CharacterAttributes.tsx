
import React from "react";

interface CharacterAttributesProps {
  strength: number;
  agility: number;
  energy: number;
  resistance: number;
}

const CharacterAttributes: React.FC<CharacterAttributesProps> = ({
  strength,
  agility,
  energy,
  resistance
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="text-center p-2 bg-game-fire/10 rounded">
          <p className="text-xs text-muted-foreground">STR</p>
          <p className="font-semibold text-game-fire">{strength}</p>
        </div>
        <div className="text-center p-2 bg-game-air/10 rounded">
          <p className="text-xs text-muted-foreground">AGI</p>
          <p className="font-semibold text-game-air">{agility}</p>
        </div>
        <div className="text-center p-2 bg-game-water/10 rounded">
          <p className="text-xs text-muted-foreground">ENE</p>
          <p className="font-semibold text-game-water">{energy}</p>
        </div>
      </div>
      
      <div className="text-center p-2 bg-game-earth/10 rounded">
        <p className="text-xs text-muted-foreground">RES</p>
        <p className="font-semibold text-game-earth">{resistance}</p>
      </div>
    </div>
  );
};

export default CharacterAttributes;
