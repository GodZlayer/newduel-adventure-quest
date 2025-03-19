
import { FormLabel } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import AttributeControl from './AttributeControl';
import { CharacterFormValues } from './types';

interface AttributesSectionProps {
  control: Control<CharacterFormValues>;
  attributes: {
    strength: number;
    agility: number;
    energy: number;
    resistance: number;
  };
  remainingPoints: number;
  onAttributeChange: (attribute: 'strength' | 'agility' | 'energy' | 'resistance', change: number) => void;
}

const AttributesSection = ({ 
  control, 
  attributes, 
  remainingPoints, 
  onAttributeChange 
}: AttributesSectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <FormLabel>Character Attributes</FormLabel>
        <span className="text-sm text-muted-foreground">
          Remaining points: <span className={remainingPoints < 0 ? 'text-destructive' : 'text-game-accent'}>{Math.max(0, remainingPoints)}</span>/26
        </span>
      </div>
      
      <div className="bg-muted/40 p-4 rounded-md mt-2">
        <p className="text-sm text-muted-foreground mb-4">
          Each character starts with 1 point in each attribute and 26 points to distribute. You'll gain 1 additional point to distribute per level (max level: 99).
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AttributeControl
            control={control}
            name="strength"
            label="Strength"
            description="Determines item equip requirements and melee damage"
            colorClass="text-game-fire"
            value={attributes.strength}
            remainingPoints={remainingPoints}
            onAttributeChange={onAttributeChange}
          />
          
          <AttributeControl
            control={control}
            name="agility"
            label="Agility"
            description="Influences dodge chance and attack speed"
            colorClass="text-game-air"
            value={attributes.agility}
            remainingPoints={remainingPoints}
            onAttributeChange={onAttributeChange}
          />
          
          <AttributeControl
            control={control}
            name="energy"
            label="Energy"
            description="Boosts magic attack and mana pool"
            colorClass="text-game-water"
            value={attributes.energy}
            remainingPoints={remainingPoints}
            onAttributeChange={onAttributeChange}
          />
          
          <AttributeControl
            control={control}
            name="resistance"
            label="Resistance"
            description="Increases defense and health points"
            colorClass="text-game-earth"
            value={attributes.resistance}
            remainingPoints={remainingPoints}
            onAttributeChange={onAttributeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AttributesSection;
