
import { useWallet } from "@/context/WalletContext";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui-custom/Button";
import { Wallet } from "lucide-react";
import { FadeIn } from "@/assets/transitions";

const Connect = () => {
  const { connect, disconnect, walletStatus, publicKey } = useWallet();
  const { balance, isLoading: isBalanceLoading } = useTokenBalance();
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    if (walletStatus === 'connected') {
      await disconnect();
    } else {
      await connect();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-secondary/5 to-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <FadeIn>
          <div className="max-w-xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 text-sm rounded-full bg-game-accent/10 text-game-accent mb-4">
              Get Started
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Connect Your Wallet
            </h1>
            <p className="text-muted-foreground text-lg">
              Link your Phantom wallet to start your adventure in NewDuel. Create characters, trade items, and participate in the game economy with NDC tokens.
            </p>
          </div>
        </FadeIn>

        <div className="bg-card rounded-xl border border-border p-8 max-w-md mx-auto">
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
                </div>
                
                <div className="pt-4 space-y-4">
                  <Button 
                    onClick={() => navigate('/characters')}
                    className="w-full"
                    size="lg"
                  >
                    Manage Characters
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/premium')}
                    variant="outline"
                    className="w-full"
                  >
                    Purchase Premium
                  </Button>
                  
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
    </div>
  );
};

export default Connect;
