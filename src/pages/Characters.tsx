
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui-custom/Button";
import { Plus, User, Shield, Crown, Zap, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import CharacterCreation from "@/components/CharacterCreation";
import { AccountType, accountTypes } from "@/components/character/types";

// Mock data for example characters
const mockCharacters = [
  {
    id: 1,
    name: "Aragorn",
    level: 24,
    strength: 18,
    agility: 14,
    energy: 10,
    resistance: 12,
  },
  {
    id: 2,
    name: "Gandalf",
    level: 31,
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

  // Get account type based on balance (for this demo)
  const getAccountType = () => {
    if (!balance) return 'Free';
    if (balance >= 1000) return 'Premium';
    return 'Free';
  };

  const accountType = getAccountType();

  // Function to get color by account type
  const getAccountColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'text-game-accent border-game-accent/20 bg-game-accent/10';
      case 'GameMaster': return 'text-game-token border-game-token/20 bg-game-token/10';
      case 'Admin': return 'text-game-fire border-game-fire/20 bg-game-fire/10';
      default: return 'text-muted-foreground border-border bg-muted/30';
    }
  };
  
  const handleRemoveCharacter = (id: number) => {
    setCharacters(prevCharacters => prevCharacters.filter(char => char.id !== id));
    toast({
      title: "Character Removed",
      description: "The character has been successfully removed.",
    });
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
            <div className={`mt-2 px-2 py-1 text-xs inline-flex items-center gap-1 rounded ${getAccountColor(accountType)}`}>
              {accountType === 'Premium' ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
              <span>{accountType} Account</span>
            </div>
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
            
            {accountType !== 'Premium' && (
              <Button variant="outline" onClick={() => navigate('/premium')}>
                Upgrade to Premium
              </Button>
            )}
          </div>
        </div>
        
        {characters.length === 0 ? (
          <div className="text-center py-16 bg-muted/20 rounded-lg border border-border">
            <h3 className="text-xl font-medium mb-2">No Characters Available</h3>
            <p className="text-muted-foreground mb-6">Create your first character to begin your adventure</p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Character
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <Card key={character.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{character.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Level {character.level}
                    </div>
                  </div>
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
                <CardFooter className="border-t pt-4 flex gap-2">
                  <Button 
                    onClick={() => navigate(`/character/${character.id}`)} 
                    className="flex-1"
                  >
                    Manage Character
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Character</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove {character.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleRemoveCharacter(character.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;
