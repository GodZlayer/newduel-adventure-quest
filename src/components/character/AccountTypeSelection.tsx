
import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { toast } from '@/components/ui/use-toast';
import { FormLabel } from '@/components/ui/form';
import { AccountType, accountTypes, FOUNDER_WALLET } from './types';
import { LucideIcon } from "lucide-react";

interface AccountTypeSelectionProps {
  selectedAccountType: string;
  onChange: (type: string) => void;
  balance: number | null;
}

const AccountTypeSelection = ({ selectedAccountType, onChange, balance }: AccountTypeSelectionProps) => {
  const { publicKey } = useWallet();

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
    
    onChange(type);
  };

  return (
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
  );
};

export default AccountTypeSelection;
