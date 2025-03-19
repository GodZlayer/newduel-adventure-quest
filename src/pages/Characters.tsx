
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui-custom/Button";
import { Plus, User, Shield, Crown, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CharacterCreation from "@/components/CharacterCreation";
import { AccountType, accountTypes } from "@/components/character/types";

// Mock data for example characters
const mockCharacters = [
  {
    id: 1,
    name: "Aragorn",
    level: 24,
    accountType: "Free" as const,
    strength: 18,
    agility: 14,
    energy: 10,
    resistance: 12,
  },
  {
    id: 2,
    name: "Gandalf",
    level: 31,
    accountType: "Premium" as const,
    strength: 8,
    agility: 11,
    energy: 30,
    resistance: 15,
  }
];

const Characters = () => {
  const { publicKey, walletStatus } = useWallet();
  const { balance } = useTokenBalance();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState(mockCharacters);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Check if wallet is connected
  if (walletStatus !== 'connected') {
    navigate('/connect');
    return null;
  }

  // Function to get icon by account type
  const getAccountIcon = (type: string) => {
    const account = accountTypes.find(a => a.type === type);
    if (!account) return User;
    return account.icon;
  };

  // Function to get color by account type
  const getAccountColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'text-game-accent border-game-accent/20 bg-game-accent/10';
      case 'GameMaster': return 'text-game-token border-game-token/20 bg-game-token/10';
      case 'Admin': return 'text-game-fire border-game-fire/20 bg-game-fire/10';
      default: return 'text-muted-foreground border-border bg-muted/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-secondary/5 to-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Characters</h1>
            <p className="text-muted-foreground mt-1">
              {publicKey && `Wallet: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`}
              {balance !== null && ` • Balance: ${balance} NDC`}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Character
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Character</DialogTitle>
                </DialogHeader>
                <CharacterCreation />
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={() => navigate('/premium')}>
              Upgrade to Premium
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => {
            const AccountIcon = getAccountIcon(character.accountType);
            const accountColor = getAccountColor(character.accountType);
            
            return (
              <Card key={character.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{character.name}</CardTitle>
                    <div className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${accountColor}`}>
                      <AccountIcon className="h-3 w-3" />
                      <span>{character.accountType}</span>
                    </div>
                  </div>
                  <CardDescription>Level {character.level}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="text-center p-2 bg-game-fire/10 rounded">
                      <p className="text-xs text-muted-foreground">STR</p>
                      <p className="font-semibold text-game-fire">{character.strength}</p>
                    </div>
                    <div className="text-center p-2 bg-game-air/10 rounded">
                      <p className="text-xs text-muted-foreground">AGI</p>
                      <p className="font-semibold text-game-air">{character.agility}</p>
                    </div>
                    <div className="text-center p-2 bg-game-water/10 rounded">
                      <p className="text-xs text-muted-foreground">ENE</p>
                      <p className="font-semibold text-game-water">{character.energy}</p>
                    </div>
                    <div className="text-center p-2 bg-game-earth/10 rounded">
                      <p className="text-xs text-muted-foreground">RES</p>
                      <p className="font-semibold text-game-earth">{character.resistance}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    onClick={() => navigate(`/character/${character.id}`)} 
                    className="w-full"
                  >
                    Manage Character
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
