
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
import Button from './ui-custom/Button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Check } from "lucide-react";

// Import component parts
import { characterSchema, CharacterFormValues, FOUNDER_WALLET } from './character/types';
import BasicInfoForm from './character/BasicInfoForm';
import AccountTypeSelection from './character/AccountTypeSelection';
import AttributesSection from './character/AttributesSection';
import EquipmentSlots from './character/EquipmentSlots';

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
      if (balance !== null && balance < 1000) {
        toast({
          title: "Insufficient NDC Balance",
          description: "You need 1000 NDC to create a Premium account.",
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
                <BasicInfoForm control={form.control} />
                
                {/* Account Type Selection */}
                <AccountTypeSelection 
                  selectedAccountType={selectedAccountType}
                  onChange={handleAccountTypeChange}
                  balance={balance}
                />
              </div>
              
              {/* Attributes Section */}
              <AttributesSection 
                control={form.control} 
                attributes={watchAttributes}
                remainingPoints={remainingPointsCalculated}
                onAttributeChange={handleAttributeChange}
              />
              
              {/* Equipment Slots Info */}
              <EquipmentSlots />
              
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
