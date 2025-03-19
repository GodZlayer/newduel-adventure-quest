
import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { toast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from './ui-custom/Button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User, Shield, Crown, Zap, Plus, Minus, List, Check } from "lucide-react";

const characterSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(20, 'Name must be less than 20 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  accountType: z.enum(['Free', 'Premium', 'GameMaster', 'Admin']),
  strength: z.number().min(1).max(99),
  agility: z.number().min(1).max(99),
  energy: z.number().min(1).max(99),
  resistance: z.number().min(1).max(99)
});

type CharacterFormValues = z.infer<typeof characterSchema>;

const accountTypes = [
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
const FOUNDER_WALLET = "8xMUCYg1fjLZBB2rU9xZW4KCQqrX1Uxz61FeWXKyHnU8";

const CharacterCreation = () => {
  const [open, setOpen] = useState(false);
  const { walletStatus, publicKey } = useWallet();
  const { balance, isLoading: isBalanceLoading } = useTokenBalance();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('Free');
  const [remainingPoints, setRemainingPoints] = useState(26);

  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: '',
      bio: '',
      accountType: 'Free',
      strength: 1,
      agility: 1,
      energy: 1,
      resistance: 1,
    },
  });

  const watchAttributes = {
    strength: form.watch('strength'),
    agility: form.watch('agility'),
    energy: form.watch('energy'),
    resistance: form.watch('resistance'),
  };

  // Calculate total points used (subtract the base 1 point for each attribute)
  const usedPoints = Object.values(watchAttributes).reduce((acc, val) => acc + (val - 1), 0);
  const totalStartingPoints = 26;
  const remainingPointsCalculated = totalStartingPoints - usedPoints;

  // Update remaining points when attributes change
  const handleAttributeChange = (attribute: keyof typeof watchAttributes, change: number) => {
    const currentValue = watchAttributes[attribute];
    const newValue = currentValue + change;
    
    // Ensure value stays within bounds (min 1, max 99)
    if (newValue < 1 || newValue > 99) return;
    
    // Check if we have enough points for an increase
    if (change > 0 && remainingPointsCalculated <= 0) {
      toast({
        title: "Cannot increase attribute",
        description: "You've used all available attribute points",
        variant: "destructive",
      });
      return;
    }
    
    form.setValue(attribute, newValue);
    setRemainingPoints(remainingPointsCalculated - change);
  };

  const handleAccountTypeChange = (type: string) => {
    const accountType = accountTypes.find(acct => acct.type === type);
    if (!accountType) return;
    
    // Check for restricted account types (GameMaster and Admin)
    if (accountType.restricted && publicKey !== FOUNDER_WALLET) {
      toast({
        title: "Restricted Account Type",
        description: `Only the founder wallet can create a ${type} account.`,
        variant: "destructive",
      });
      return;
    }
    
    // Check if user has enough balance for Premium
    if (type === 'Premium' && (balance === null || balance < accountType.cost)) {
      toast({
        title: "Insufficient NDC Balance",
        description: `You need ${accountType.cost} NDC to create a Premium account.`,
        variant: "destructive",
      });
      return;
    }
    
    setSelectedAccountType(type);
    form.setValue('accountType', type as CharacterFormValues['accountType']);
  };

  const onSubmit = async (data: CharacterFormValues) => {
    if (!publicKey || walletStatus !== 'connected') {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to create a character.",
        variant: "destructive",
      });
      return;
    }

    // Check if attributes add up correctly (should equal 4 base points + 26 distributable points)
    const totalAttributes = data.strength + data.agility + data.energy + data.resistance;
    if (totalAttributes !== 30) {
      toast({
        title: "Invalid Attributes",
        description: "Please distribute all available attribute points.",
        variant: "destructive",
      });
      return;
    }

    // Additional verification for Premium account
    if (data.accountType === 'Premium') {
      const accountType = accountTypes.find(acct => acct.type === 'Premium');
      if (!accountType) return;

      if (balance !== null && balance < accountType.cost) {
        toast({
          title: "Insufficient NDC Balance",
          description: `You need ${accountType.cost} NDC to create a Premium account.`,
          variant: "destructive",
        });
        return;
      }
    }

    // Verification for restricted accounts
    if ((data.accountType === 'GameMaster' || data.accountType === 'Admin') && publicKey !== FOUNDER_WALLET) {
      toast({
        title: "Unauthorized",
        description: "Only the founder wallet can create this account type.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      // For demo purposes, we're just simulating a successful character creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Character Created",
        description: `Your character ${data.name} has been created!`,
      });
      
      // Reset form and close dialog
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Error creating character:', error);
      toast({
        title: "Error",
        description: "Failed to create character",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full">
      <Button 
        onClick={() => setOpen(true)}
        disabled={walletStatus !== 'connected' || isBalanceLoading}
        className="w-full"
        size="lg"
      >
        Create Character
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create your Character</DialogTitle>
            <DialogDescription>
              Create your character and start your adventure in the world of NewDuel.
              {balance !== null && (
                <div className="mt-2">
                  Your NDC Balance: <span className="font-semibold text-game-accent">{balance} NDC</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Character basic info */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Character Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a unique character name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Names must be unique in the game world
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a short bio for your character" 
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Optional background story for your character
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Account Type Selection */}
                <div>
                  <FormLabel>Account Type</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {accountTypes.map((account) => {
                      const Icon = account.icon;
                      const isSelected = selectedAccountType === account.type;
                      const isDisabled = 
                        (account.type === 'Premium' && (balance === null || balance < account.cost)) || 
                        (account.restricted && publicKey !== FOUNDER_WALLET);
                      
                      return (
                        <div
                          key={account.type}
                          onClick={() => !isDisabled && handleAccountTypeChange(account.type)}
                          className={`p-3 border rounded-md cursor-pointer transition-all ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                          } ${
                            isSelected 
                              ? 'border-game-accent bg-game-accent/10' 
                              : 'border-border hover:border-muted-foreground'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-full ${isSelected ? 'bg-game-accent text-white' : 'bg-muted'}`}>
                              <Icon size={16} />
                            </div>
                            <div>
                              <p className="font-medium">{account.type}</p>
                              <p className="text-xs text-muted-foreground">{account.description}</p>
                            </div>
                          </div>
                          {account.cost > 0 && (
                            <div className="mt-2 text-sm">
                              Cost: <span className="font-medium">{account.cost} NDC</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Attributes */}
              <div>
                <div className="flex justify-between items-center">
                  <FormLabel>Character Attributes</FormLabel>
                  <span className="text-sm text-muted-foreground">
                    Remaining points: <span className={remainingPointsCalculated < 0 ? 'text-destructive' : 'text-game-accent'}>{Math.max(0, remainingPointsCalculated)}</span>/26
                  </span>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-md mt-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Each character starts with 1 point in each attribute and 26 points to distribute. You'll gain 1 additional point to distribute per level (max level: 99).
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Strength */}
                    <FormField
                      control={form.control}
                      name="strength"
                      render={({ field }) => (
                        <FormItem>
                          <div className="bg-card border border-border rounded-md p-3">
                            <div className="flex justify-between items-center">
                              <FormLabel className="flex items-center text-game-fire">
                                <div className="w-6 h-6 rounded-full bg-game-fire/20 flex items-center justify-center mr-2">
                                  <List className="h-3.5 w-3.5 text-game-fire" />
                                </div>
                                Strength
                              </FormLabel>
                              <div className="flex items-center gap-2">
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('strength', -1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={watchAttributes.strength <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-medium w-8 text-center">{field.value}</span>
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('strength', 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={remainingPointsCalculated <= 0}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <FormDescription className="text-xs mt-2">
                              Determines item equip requirements and melee damage
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {/* Agility */}
                    <FormField
                      control={form.control}
                      name="agility"
                      render={({ field }) => (
                        <FormItem>
                          <div className="bg-card border border-border rounded-md p-3">
                            <div className="flex justify-between items-center">
                              <FormLabel className="flex items-center text-game-air">
                                <div className="w-6 h-6 rounded-full bg-game-air/20 flex items-center justify-center mr-2">
                                  <List className="h-3.5 w-3.5 text-game-air" />
                                </div>
                                Agility
                              </FormLabel>
                              <div className="flex items-center gap-2">
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('agility', -1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={watchAttributes.agility <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-medium w-8 text-center">{field.value}</span>
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('agility', 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={remainingPointsCalculated <= 0}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <FormDescription className="text-xs mt-2">
                              Influences dodge chance and attack speed
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {/* Energy */}
                    <FormField
                      control={form.control}
                      name="energy"
                      render={({ field }) => (
                        <FormItem>
                          <div className="bg-card border border-border rounded-md p-3">
                            <div className="flex justify-between items-center">
                              <FormLabel className="flex items-center text-game-water">
                                <div className="w-6 h-6 rounded-full bg-game-water/20 flex items-center justify-center mr-2">
                                  <List className="h-3.5 w-3.5 text-game-water" />
                                </div>
                                Energy
                              </FormLabel>
                              <div className="flex items-center gap-2">
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('energy', -1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={watchAttributes.energy <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-medium w-8 text-center">{field.value}</span>
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('energy', 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={remainingPointsCalculated <= 0}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <FormDescription className="text-xs mt-2">
                              Boosts magic attack and mana pool
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {/* Resistance */}
                    <FormField
                      control={form.control}
                      name="resistance"
                      render={({ field }) => (
                        <FormItem>
                          <div className="bg-card border border-border rounded-md p-3">
                            <div className="flex justify-between items-center">
                              <FormLabel className="flex items-center text-game-earth">
                                <div className="w-6 h-6 rounded-full bg-game-earth/20 flex items-center justify-center mr-2">
                                  <List className="h-3.5 w-3.5 text-game-earth" />
                                </div>
                                Resistance
                              </FormLabel>
                              <div className="flex items-center gap-2">
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('resistance', -1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={watchAttributes.resistance <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-medium w-8 text-center">{field.value}</span>
                                <button 
                                  type="button"
                                  onClick={() => handleAttributeChange('resistance', 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20"
                                  disabled={remainingPointsCalculated <= 0}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <FormDescription className="text-xs mt-2">
                              Increases defense and health points
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              {/* Equipment Slots Info */}
              <div className="bg-muted/40 p-4 rounded-md">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <List className="h-4 w-4" />
                  Equipment Slots (11 Total)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>• Helmet</div>
                  <div>• Chest</div>
                  <div>• Legs</div>
                  <div>• Boots</div>
                  <div>• Gloves</div>
                  <div>• Backpack</div>
                  <div>• Ring</div>
                  <div>• Necklace</div>
                  <div>• Bracelet</div>
                  <div>• Main Hand</div>
                  <div>• Off Hand</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Some items require both hands and will occupy Main Hand and Off Hand slots.
                </p>
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  isLoading={isCreating}
                  disabled={isCreating || remainingPointsCalculated !== 0}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Create Character
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterCreation;
