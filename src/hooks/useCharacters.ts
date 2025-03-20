
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Character, Skill, Equipment, InventoryItem } from '@/types/database';
import { useWallet } from '@/context/WalletContext';

export const useCharacters = () => {
  const { publicKey } = useWallet();
  
  const fetchCharacters = async (): Promise<Character[]> => {
    if (!publicKey) return [];
    
    // Fetch characters
    const { data: characters, error: charactersError } = await supabase
      .from('characters')
      .select('*')
      .eq('user_id', publicKey);
      
    if (charactersError) {
      console.error('Error fetching characters:', charactersError);
      throw new Error(charactersError.message);
    }
    
    if (!characters || characters.length === 0) return [];
    
    // Fetch related data for each character
    const enhancedCharacters = await Promise.all(
      characters.map(async (character) => {
        // Fetch skills
        const { data: skills } = await supabase
          .from('character_skills')
          .select('*')
          .eq('character_id', character.id);
          
        // Fetch equipment
        const { data: equipment } = await supabase
          .from('character_equipment')
          .select('*')
          .eq('character_id', character.id);
          
        // Fetch inventory
        const { data: inventory } = await supabase
          .from('character_inventory')
          .select('*')
          .eq('character_id', character.id);
          
        return {
          ...character,
          skills: skills || [],
          equipment: equipment || [],
          inventory: inventory || []
        } as Character;
      })
    );
    
    return enhancedCharacters;
  };
  
  return useQuery({
    queryKey: ['characters', publicKey],
    queryFn: fetchCharacters,
    enabled: !!publicKey,
  });
};
