
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
import { Label } from '@/components/ui/label';
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
import { Shield, User, Crown, Zap } from "lucide-react";

const characterSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(20, 'Name must be less than 20 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  accountType: z.enum(['Free', 'Premium', 'GameMaster', 'Admin']),
  physical: z.number().min(0).max(100),
  agility: z.number().min(0).max(100),
  energy: z.number().min(0).max(100),
  resistance: z.number().min(0).max(100)
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
    cost: 100,
  },
  {
    type: 'GameMaster',
    icon: Crown,
    description: '6 character slots',
    cost: 250,
  },
  {
    type: 'Admin',
    icon: Zap,
    description: '10 character slots',
    cost: 500,
  },
];

const CharacterCreation = () => {
  const [open, setOpen] = useState(false);
  const { walletStatus, publicKey } = useWallet();
  const { balance, isLoading: isBalanceLoading } = useTokenBalance();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('Free');
  const [remainingPoints, setRemainingPoints] = useState(100);

  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: '',
      bio: '',
      accountType: 'Free',
      physical: 25,
      agility: 25,
      energy: 25,
      resistance: 25,
    },
  });

  const watchAttributes = {
    physical: form.watch('physical'),
    agility: form.watch('agility'),
    energy: form.watch('energy'),
    resistance: form.watch('resistance'),
  };

  // Update remaining points when attributes change
  const totalPoints = Object.values(watchAttributes).reduce((acc, val) => acc + val, 0);
  const maxPoints = 100;

  const handleAttributeChange = (attribute: keyof typeof watchAttributes, value: number) => {
    const currentTotal = totalPoints - watchAttributes[attribute];
    const newTotal = currentTotal + value;
    
    if (newTotal <= maxPoints) {
      form.setValue(attribute, value);
      setRemainingPoints(maxPoints - newTotal);
    } else {
      toast({
        title: "Cannot increase attribute",
        description: "You've used all available attribute points",
        variant: "destructive",
      });
    }
  };

  const handleAccountTypeChange = (type: string) => {
    // Check if user has enough balance for selected account type
    const accountType = accountTypes.find(acct => acct.type === type);
    if (!accountType) return;
    
    if (balance !== null && balance < accountType.cost && type !== 'Free') {
      toast({
        title: "Insufficient NDC Balance",
        description: `You need ${accountType.cost} NDC to create a ${type} account.`,
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

    // Check if user has enough balance for selected account type
    const accountType = accountTypes.find(acct => acct.type === data.accountType);
    if (!accountType) return;

    if (balance !== null && balance < accountType.cost && data.accountType !== 'Free') {
      toast({
        title: "Insufficient NDC Balance",
        description: `You need ${accountType.cost} NDC to create a ${data.accountType} account.`,
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
                          <Input placeholder="Enter character name" {...field} />
                        </FormControl>
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
                      const isDisabled = balance !== null && balance < account.cost && account.type !== 'Free';
                      
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
                  <FormLabel>Attributes</FormLabel>
                  <span className="text-sm text-muted-foreground">
                    Remaining points: <span className={remainingPoints <= 0 ? 'text-destructive' : 'text-game-accent'}>{remainingPoints}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Physical */}
                  <FormField
                    control={form.control}
                    name="physical"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel>Physical</FormLabel>
                          <span className="text-sm">{field.value}/100</span>
                        </div>
                        <div className="relative pt-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={field.value}
                            onChange={(e) => handleAttributeChange('physical', parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-md appearance-none cursor-pointer"
                          />
                          <div 
                            className="absolute h-2 bg-game-fire rounded-md top-[0.25rem]"
                            style={{ width: `${field.value}%` }}
                          ></div>
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
                        <div className="flex justify-between items-center">
                          <FormLabel>Agility</FormLabel>
                          <span className="text-sm">{field.value}/100</span>
                        </div>
                        <div className="relative pt-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={field.value}
                            onChange={(e) => handleAttributeChange('agility', parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-md appearance-none cursor-pointer"
                          />
                          <div 
                            className="absolute h-2 bg-game-air rounded-md top-[0.25rem]"
                            style={{ width: `${field.value}%` }}
                          ></div>
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
                        <div className="flex justify-between items-center">
                          <FormLabel>Energy</FormLabel>
                          <span className="text-sm">{field.value}/100</span>
                        </div>
                        <div className="relative pt-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={field.value}
                            onChange={(e) => handleAttributeChange('energy', parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-md appearance-none cursor-pointer"
                          />
                          <div 
                            className="absolute h-2 bg-game-water rounded-md top-[0.25rem]"
                            style={{ width: `${field.value}%` }}
                          ></div>
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
                        <div className="flex justify-between items-center">
                          <FormLabel>Resistance</FormLabel>
                          <span className="text-sm">{field.value}/100</span>
                        </div>
                        <div className="relative pt-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={field.value}
                            onChange={(e) => handleAttributeChange('resistance', parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-md appearance-none cursor-pointer"
                          />
                          <div 
                            className="absolute h-2 bg-game-earth rounded-md top-[0.25rem]"
                            style={{ width: `${field.value}%` }}
                          ></div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  isLoading={isCreating}
                  disabled={isCreating}
                >
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
