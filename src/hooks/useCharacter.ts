
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Character, Skill, Equipment, InventoryItem } from '@/types/database';

// Element color map for UI display
export const elementColorMap: Record<string, string> = {
  fire: 'red-500',
  water: 'blue-500',
  earth: 'amber-700',
  wind: 'emerald-500',
  lightning: 'yellow-500',
  ice: 'cyan-500',
  light: 'orange-300',
  dark: 'purple-700',
};

export const useCharacter = (characterId: string | undefined) => {
  const fetchCharacter = async (): Promise<Character | null> => {
    if (!characterId) {
      return null;
    }

    try {
      // Fetch character
      const { data: characterData, error: characterError } = await supabase
        .from('characters')
        .select('*')
        .eq('id', characterId)
        .single();

      if (characterError || !characterData) {
        console.error('Error fetching character:', characterError);
        return null;
      }

      // Fetch skills
      const { data: skills, error: skillsError } = await supabase
        .from('character_skills')
        .select('*')
        .eq('character_id', characterId);

      if (skillsError) {
        console.error('Error fetching skills:', skillsError);
      }

      // Fetch equipment
      const { data: equipment, error: equipmentError } = await supabase
        .from('character_equipment')
        .select('*')
        .eq('character_id', characterId);

      if (equipmentError) {
        console.error('Error fetching equipment:', equipmentError);
      }

      // Fetch inventory
      const { data: inventory, error: inventoryError } = await supabase
        .from('character_inventory')
        .select('*')
        .eq('character_id', characterId);

      if (inventoryError) {
        console.error('Error fetching inventory:', inventoryError);
      }

      // Convert equipment stats from Json to Record<string, any>
      const typedEquipment = equipment?.map(item => ({
        ...item,
        stats: item.stats as unknown as Record<string, any>
      })) || [];

      // Combine all data
      const fullCharacter: Character = {
        ...characterData,
        skills: skills || [],
        equipment: typedEquipment,
        inventory: inventory || []
      };

      return fullCharacter;
    } catch (error) {
      console.error('Unexpected error:', error);
      return null;
    }
  };

  return useQuery({
    queryKey: ['character', characterId],
    queryFn: fetchCharacter,
    enabled: !!characterId
  });
};
