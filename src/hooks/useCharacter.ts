
import { useState, useEffect } from "react";

// Define character type
export interface Character {
  id: number;
  name: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  class: string;
  element: string;
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
  skills: {
    id: number;
    name: string;
    element: string;
    damage: number;
    cooldown: number;
  }[];
  equipment: {
    slot: string;
    name: string;
    rarity: string;
    stats: Record<string, number>;
  }[];
  inventory: {
    id: number;
    name: string;
    quantity: number;
    effect: string;
  }[];
}

export const useCharacter = (id: string | undefined) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching character data
    setTimeout(() => {
      if (!id) {
        setLoading(false);
        return;
      }
      
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

  return { character, loading };
};

export const elementColorMap: Record<string, string> = {
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
