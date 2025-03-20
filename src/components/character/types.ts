
import { z } from 'zod';
import { User, Shield, Crown, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const characterSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(20, 'Name must be less than 20 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  strength: z.number().min(1).max(99),
  agility: z.number().min(1).max(99),
  energy: z.number().min(1).max(99),
  resistance: z.number().min(1).max(99)
});

export type CharacterFormValues = z.infer<typeof characterSchema>;

export type AccountType = {
  type: 'Free' | 'Premium' | 'GameMaster' | 'Admin';
  icon: LucideIcon;
  description: string;
  cost: number;
  restricted?: boolean;
};

export const accountTypes: AccountType[] = [
  {
    type: 'Free',
    icon: User,
    description: '3 character slots',
    cost: 0,
  },
  {
    type: 'Premium',
    icon: Shield,
    description: '5 character slots',
    cost: 1000,
  },
  {
    type: 'GameMaster',
    icon: Crown,
    description: '6 character slots (Founder only)',
    cost: 0,
    restricted: true,
  },
  {
    type: 'Admin',
    icon: Zap,
    description: '10 character slots (Founder only)',
    cost: 0,
    restricted: true,
  },
];

// Founder wallet address - in a real app you would fetch this from a secure source
export const FOUNDER_WALLET = "8xMUCYg1fjLZBB2rU9xZW4KCQqrX1Uxz61FeWXKyHnU8";
