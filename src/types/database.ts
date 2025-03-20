
// Custom database types that work with the existing Supabase types
import { Database as SupabaseDatabase } from "@/integrations/supabase/types";

// Character related types
export interface Character {
  id: string;
  user_id: string;
  name: string;
  bio: string | null;
  level: number;
  experience: number;
  next_level_exp: number;
  class: string;
  element: string;
  strength: number;
  agility: number;
  energy: number;
  resistance: number;
  health: number;
  max_health: number;
  mana: number;
  max_mana: number;
  stamina: number;
  max_stamina: number;
  created_at: string;
  updated_at: string;
  equipment?: Equipment[];
  skills?: Skill[];
  inventory?: InventoryItem[];
}

export interface Skill {
  id: string;
  character_id: string;
  name: string;
  element: string;
  damage: number;
  cooldown: number;
  created_at: string;
}

export interface Equipment {
  id: string;
  character_id: string;
  slot: string;
  name: string;
  rarity: string;
  stats: Record<string, any>;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  character_id: string;
  item_id: string | null;
  name: string;
  quantity: number;
  effect: string | null;
  created_at: string;
}

export interface AccountType {
  id: string;
  user_id: string;
  type: string;
  character_slots: number;
  created_at: string;
  updated_at: string;
}

// You can extend this with Database utility types if needed
export type Database = SupabaseDatabase;
