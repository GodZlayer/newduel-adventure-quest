
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui-custom/Button";
import { Check, Shield, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PREMIUM_COST = 1000;

const Premium = () => {
  const { publicKey, walletStatus } = useWallet();
  const { balance, fetchTokenBalance } = useTokenBalance();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if wallet is connected
  if (walletStatus !== 'connected') {
    navigate('/connect');
    return null;
  }
  
  const hasSufficientBalance = balance !== null && balance >= PREMIUM_COST;
  
  const handlePurchasePremium = async () => {
    if (!hasSufficientBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${PREMIUM_COST} NDC to upgrade to Premium.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be a call to a server-side API to process the transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      toast({
        title: "Success!",
        description: "Your account has been upgraded to Premium.",
      });
      
      // Refresh token balance
      fetchTokenBalance();
      
      // Redirect to characters page
      navigate('/characters');
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "There was an error processing your transaction.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-game-secondary/5 to-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Upgrade to Premium</h1>
            <p className="text-lg text-muted-foreground">
              Enhance your gaming experience with additional character slots and premium features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Free Account</CardTitle>
                <CardDescription>Current Plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">0 <span className="text-sm font-normal text-muted-foreground">NDC</span></div>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>3 Character Slots</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Basic Inventory Space</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>Standard Progression</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-game-accent/5 border-game-accent">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-game-accent">Premium Account</CardTitle>
                    <CardDescription>Upgraded Experience</CardDescription>
                  </div>
                  <Shield className="h-6 w-6 text-game-accent" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">{PREMIUM_COST} <span className="text-sm font-normal text-muted-foreground">NDC</span></div>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">5 Character Slots</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">Extended Inventory Space</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">Faster Progression</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">Access to Premium Events</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">Free Daily Rewards</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                {!hasSufficientBalance && (
                  <div className="w-full mb-3 p-2 bg-amber-50 border border-amber-200 rounded-md flex items-center text-amber-700 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>You need {PREMIUM_COST} NDC. Current balance: {balance} NDC</span>
                  </div>
                )}
                <Button 
                  className="w-full"
                  disabled={!hasSufficientBalance || isLoading}
                  isLoading={isLoading}
                  onClick={handlePurchasePremium}
                >
                  Upgrade Now
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/characters')}>
              Back to Characters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
