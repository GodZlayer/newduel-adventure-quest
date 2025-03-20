
import { useWallet } from "@/context/WalletContext";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import Button from "./ui-custom/Button";
import CharacterCreation from "./CharacterCreation";
import { Wallet, Shield } from "lucide-react";

const ConnectWallet = () => {
  const { connect, disconnect, walletStatus, publicKey } = useWallet();
  const { balance, isLoading: isBalanceLoading } = useTokenBalance();

  const handleConnectWallet = async () => {
    if (walletStatus === 'connected') {
      await disconnect();
    } else {
      await connect();
    }
  };
  
  // Get account type based on balance (for this demo)
  const getAccountType = () => {
    if (!balance) return 'Free';
    if (balance >= 1000) return 'Premium';
    return 'Free';
  };

  const accountType = getAccountType();
  const isPremium = accountType === 'Premium';

  return (
    <section id="wallet" className="py-24 bg-game-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block px-3 py-1 text-sm rounded-full bg-game-accent/10 text-game-accent mb-4">
            Get Started
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-muted-foreground text-lg">
            Link your Phantom wallet to start your adventure in NewDuel. Create characters, trade items, and participate in the game economy with NDC tokens.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            {walletStatus === 'connected' ? (
              <>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-game-accent/10 text-game-accent mb-4">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Wallet Connected</h3>
                  <p className="text-muted-foreground">
                    {publicKey?.slice(0, 10)}...{publicKey?.slice(-10)}
                  </p>
                  {balance !== null && (
                    <div className="mt-2 font-medium text-game-token">
                      {balance} NDC
                    </div>
                  )}
                  {isPremium && (
                    <div className="mt-2 inline-flex items-center gap-1 bg-game-accent/10 text-game-accent px-3 py-1 rounded-full text-sm">
                      <Shield className="h-3 w-3" />
                      <span>Premium Wallet</span>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 space-y-4">
                  <CharacterCreation />
                  
                  <Button 
                    onClick={handleConnectWallet} 
                    variant="outline"
                    className="w-full"
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-4">
                  <Wallet className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-muted-foreground mb-6">
                  Connect your Phantom wallet to get started with NDC tokens and create your character.
                </p>
                <Button 
                  onClick={handleConnectWallet}
                  isLoading={walletStatus === 'connecting'}
                  className="w-full"
                  size="lg"
                >
                  Connect Phantom Wallet
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectWallet;
