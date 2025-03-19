
import React, { createContext, useContext, ReactNode } from 'react';
import { usePhantomWallet, WalletStatus } from '@/hooks/usePhantomWallet';

interface WalletContextType {
  connect: () => Promise<string | null>;
  disconnect: () => Promise<void>;
  walletStatus: WalletStatus;
  publicKey: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const wallet = usePhantomWallet();
  
  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};
