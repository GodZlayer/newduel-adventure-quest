
import { useState, useEffect, useCallback } from 'react';

// Tipos para a Phantom Wallet
type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: () => void) => void;
  isPhantom: boolean;
  isConnected: boolean | null;
  publicKey: { toString: () => string } | null;
}

type WindowWithSolana = Window & { 
  solana?: PhantomProvider;
  phantom?: {
    solana?: PhantomProvider;
  };
};

export type WalletStatus = 'disconnected' | 'connected' | 'connecting' | 'not-installed';

export const usePhantomWallet = () => {
  const [walletStatus, setWalletStatus] = useState<WalletStatus>('disconnected');
  const [publicKey, setPublicKey] = useState<string | null>(null);
  
  // Função para obter o provedor Phantom
  const getProvider = useCallback((): PhantomProvider | null => {
    const windowWithSolana = window as WindowWithSolana;
    
    if (windowWithSolana.phantom?.solana?.isPhantom) {
      return windowWithSolana.phantom.solana;
    }
    
    if (windowWithSolana.solana?.isPhantom) {
      return windowWithSolana.solana;
    }
    
    return null;
  }, []);
  
  // Função para conectar a wallet
  const connect = useCallback(async () => {
    try {
      setWalletStatus('connecting');
      const provider = getProvider();
      
      if (!provider) {
        setWalletStatus('not-installed');
        window.open('https://phantom.app/', '_blank');
        return;
      }
      
      const response = await provider.connect();
      const key = response.publicKey.toString();
      setPublicKey(key);
      setWalletStatus('connected');
      
      // Mostrar no console para debugging
      console.log('Wallet conectada com sucesso:', key);
      
      return key;
    } catch (error) {
      console.error('Erro ao conectar wallet:', error);
      setWalletStatus('disconnected');
      return null;
    }
  }, [getProvider]);
  
  // Função para desconectar a wallet
  const disconnect = useCallback(async () => {
    try {
      const provider = getProvider();
      
      if (provider) {
        await provider.disconnect();
        setPublicKey(null);
        setWalletStatus('disconnected');
        console.log('Wallet desconectada');
      }
    } catch (error) {
      console.error('Erro ao desconectar wallet:', error);
    }
  }, [getProvider]);
  
  // Verificar se a wallet já está conectada ao carregar a página
  useEffect(() => {
    const provider = getProvider();
    
    if (!provider) {
      setWalletStatus('not-installed');
      return;
    }
    
    if (provider.isConnected && provider.publicKey) {
      setPublicKey(provider.publicKey.toString());
      setWalletStatus('connected');
    }
    
    // Adicionar listeners para eventos da wallet
    provider.on('connect', () => {
      if (provider.publicKey) {
        setPublicKey(provider.publicKey.toString());
        setWalletStatus('connected');
      }
    });
    
    provider.on('disconnect', () => {
      setPublicKey(null);
      setWalletStatus('disconnected');
    });
    
    provider.on('accountChanged', () => {
      if (provider.publicKey) {
        setPublicKey(provider.publicKey.toString());
        setWalletStatus('connected');
      } else {
        setPublicKey(null);
        setWalletStatus('disconnected');
      }
    });
  }, [getProvider]);
  
  return { connect, disconnect, walletStatus, publicKey };
};
