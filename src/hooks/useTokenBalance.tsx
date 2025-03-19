
import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { toast } from '@/components/ui/use-toast';

const NDC_TOKEN_ADDRESS = 'A7qmEo17Xm2PgLmXuTjJ4fFePQpDU6s5mDBQEJRxcbH2';
const SOLANA_CONNECTION_URL = 'https://api.devnet.solana.com';

export const useTokenBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, walletStatus } = useWallet();

  const fetchTokenBalance = async () => {
    if (!publicKey || walletStatus !== 'connected') {
      setBalance(null);
      return;
    }

    try {
      setIsLoading(true);
      
      // For demo purposes we're simulating a token balance
      // In a real implementation, you would call the Solana API to get the actual balance
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: { value: { uiAmount: 500 } } });
        }, 1000);
      });
      
      // @ts-ignore - This is for demo purposes
      const tokenBalance = response.data.value.uiAmount;
      setBalance(tokenBalance);
      
      console.log(`NDC Token Balance: ${tokenBalance}`);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch NDC token balance",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey && walletStatus === 'connected') {
      fetchTokenBalance();
    } else {
      setBalance(null);
    }
  }, [publicKey, walletStatus]);

  return { 
    balance, 
    isLoading, 
    fetchTokenBalance 
  };
};
