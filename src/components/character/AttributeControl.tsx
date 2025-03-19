
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { List, Plus, Minus } from "lucide-react";
import { CharacterFormValues } from './types';

interface AttributeControlProps {
  control: Control<CharacterFormValues>;
  name: 'strength' | 'agility' | 'energy' | 'resistance';
  label: string;
  description: string;
  colorClass: string;
  value: number;
  remainingPoints: number;
  onAttributeChange: (attribute: 'strength' | 'agility' | 'energy' | 'resistance', change: number) => void;
}

const AttributeControl = ({
  control,
  name,
  label,
  description,
  colorClass,
  value,
  remainingPoints,
  onAttributeChange
}: AttributeControlProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="bg-card border border-border rounded-md p-3">
            <div className="flex justify-between items-center">
              <FormLabel className={`flex items-center ${colorClass}`}>
                <div className={`w-6 h-6 rounded-full ${colorClass.replace('text-', 'bg-')}/20 flex items-center justify-center mr-2`}>
                  <List className={`h-3.5 w-3.5 ${colorClass}`} />
                </div>
                {label}
              </FormLabel>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={() => onAttributeChange(name, -1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                  disabled={value <= 1}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium w-8 text-center">{value}</span>
                <button 
                  type="button"
                  onClick={() => onAttributeChange(name, 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                  disabled={remainingPoints <= 0}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <FormDescription className="text-xs mt-2">
              {description}
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AttributeControl;
