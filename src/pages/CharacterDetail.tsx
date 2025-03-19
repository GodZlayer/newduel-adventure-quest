
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import Button from "@/components/ui-custom/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Shield, Sword, Cpu, Wallet, 
  Backpack, ChevronLeft, ArrowUp
} from "lucide-react";

// Mock character data
const mockCharacter = {
  id: 1,
  name: "Aragorn",
  level: 24,
  accountType: "Free",
  strength: 18,
  agility: 14,
  energy: 10,
  resistance: 12,
  inventory: [
    { id: 1, name: "Steel Sword", type: "Weapon", stats: { str: 5 } },
    { id: 2, name: "Leather Boots", type: "Boots", stats: { agi: 3 } },
    { id: 3, name: "Ruby Amulet", type: "Necklace", stats: { ene: 4 } },
  ],
  equipped: {
    helmet: null,
    chest: { id: 4, name: "Chain Mail", type: "Chest", stats: { res: 6 } },
    legs: null,
    boots: { id: 2, name: "Leather Boots", type: "Boots", stats: { agi: 3 } },
    gloves: null,
    backpack: null,
    ring: null,
    necklace: { id: 3, name: "Ruby Amulet", type: "Necklace", stats: { ene: 4 } },
    bracelet: null,
    mainHand: { id: 1, name: "Steel Sword", type: "Weapon", stats: { str: 5 } },
    offHand: null,
  },
  // Mock skill trees
  basicTree: [
    { id: 1, name: "Strength Mastery", level: 2, maxLevel: 5, attribute: "strength" },
    { id: 2, name: "Agility Training", level: 1, maxLevel: 5, attribute: "agility" },
    { id: 3, name: "Energy Focus", level: 0, maxLevel: 5, attribute: "energy" },
    { id: 4, name: "Resistance Conditioning", level: 3, maxLevel: 5, attribute: "resistance" },
  ],
  elementalTree: [
    { id: 1, name: "Fire Mastery", level: 1, maxLevel: 3, element: "fire" },
    { id: 2, name: "Water Control", level: 0, maxLevel: 3, element: "water" },
    { id: 3, name: "Earth Shaping", level: 2, maxLevel: 3, element: "earth" },
    { id: 4, name: "Air Manipulation", level: 0, maxLevel: 3, element: "air" },
  ]
};

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { walletStatus } = useWallet();
  const [character, setCharacter] = useState(mockCharacter);
  const [activeTab, setActiveTab] = useState("stats");
  
  // Check if wallet is connected
  if (walletStatus !== 'connected') {
    navigate('/connect');
    return null;
  }
  
  // Function to get attribute color
  const getAttributeColor = (attribute: string) => {
    switch (attribute) {
      case 'strength': return 'text-game-fire bg-game-fire/10';
      case 'agility': return 'text-game-air bg-game-air/10';
      case 'energy': return 'text-game-water bg-game-water/10';
      case 'resistance': return 'text-game-earth bg-game-earth/10';
      default: return 'text-foreground bg-muted';
    }
  };
  
  // Function to get element color
  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'text-game-fire bg-game-fire/10';
      case 'water': return 'text-game-water bg-game-water/10';
      case 'earth': return 'text-game-earth bg-game-earth/10';
      case 'air': return 'text-game-air bg-game-air/10';
      default: return 'text-foreground bg-muted';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-game-secondary/5 to-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/characters')}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Characters
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{character.name}</h1>
              <p className="text-muted-foreground">Level {character.level} • {character.accountType} Account</p>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:w-[400px] mb-8">
            <TabsTrigger value="stats">
              <User className="h-4 w-4 mr-2 hidden sm:inline" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="equipment">
              <Shield className="h-4 w-4 mr-2 hidden sm:inline" />
              Equipment
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Cpu className="h-4 w-4 mr-2 hidden sm:inline" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <Backpack className="h-4 w-4 mr-2 hidden sm:inline" />
              Inventory
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Character Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Base Attributes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-game-fire/10 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-game-fire/20 flex items-center justify-center mr-3">
                        <Sword className="h-4 w-4 text-game-fire" />
                      </div>
                      <span>Strength</span>
                    </div>
                    <span className="text-xl font-bold text-game-fire">{character.strength}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-game-air/10 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-game-air/20 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-game-air" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 5l7 7m-7 7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M3 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span>Agility</span>
                    </div>
                    <span className="text-xl font-bold text-game-air">{character.agility}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-game-water/10 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-game-water/20 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-game-water" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span>Energy</span>
                    </div>
                    <span className="text-xl font-bold text-game-water">{character.energy}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-game-earth/10 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-game-earth/20 flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-game-earth" />
                      </div>
                      <span>Resistance</span>
                    </div>
                    <span className="text-xl font-bold text-game-earth">{character.resistance}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Derived Stats</h3>
                <div className="p-4 border rounded-md space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Health Points</span>
                    <span className="font-semibold">{100 + (character.resistance * 10)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mana Points</span>
                    <span className="font-semibold">{50 + (character.energy * 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attack Power</span>
                    <span className="font-semibold">{10 + (character.strength * 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Defense</span>
                    <span className="font-semibold">{5 + (character.resistance * 1.5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Critical Chance</span>
                    <span className="font-semibold">{5 + (character.agility * 0.5)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dodge Chance</span>
                    <span className="font-semibold">{2 + (character.agility * 0.3)}%</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Next Level</h3>
                  <div className="p-4 border rounded-md">
                    <div className="h-2 bg-muted rounded-full mb-2">
                      <div className="h-2 bg-game-accent rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Level {character.level}</span>
                      <span className="text-muted-foreground">{character.level + 1}</span>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" className="w-full">
                        <ArrowUp className="h-4 w-4 mr-2" />
                        Distribute Points
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="equipment" className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Equipped Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(character.equipped).map(([slot, item]) => {
                const formattedSlot = slot.replace(/([A-Z])/g, ' $1').trim();
                
                return (
                  <div key={slot} className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground mb-1 capitalize">{formattedSlot}</div>
                    {item ? (
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="flex gap-2 mt-2">
                          {Object.entries(item.stats).map(([stat, value]) => (
                            <div key={stat} className={`px-2 py-1 text-xs rounded ${getAttributeColor(stat)}`}>
                              {stat.toUpperCase()}: +{value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm italic">Empty slot</div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-8">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Skill Tree</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.basicTree.map(skill => (
                  <div key={skill.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{skill.name}</h3>
                        <div className={`inline-block px-2 py-1 text-xs rounded mt-1 ${getAttributeColor(skill.attribute)}`}>
                          {skill.attribute.charAt(0).toUpperCase() + skill.attribute.slice(1)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {skill.level} / {skill.maxLevel}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-2 bg-muted rounded-full">
                      <div 
                        className={`h-2 ${getAttributeColor(skill.attribute).split(' ')[0]} rounded-full`} 
                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        disabled={skill.level >= skill.maxLevel}
                        className="w-full"
                      >
                        Upgrade Skill
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Elemental Skill Tree</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.elementalTree.map(skill => (
                  <div key={skill.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{skill.name}</h3>
                        <div className={`inline-block px-2 py-1 text-xs rounded mt-1 ${getElementColor(skill.element)}`}>
                          {skill.element.charAt(0).toUpperCase() + skill.element.slice(1)} Element
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {skill.level} / {skill.maxLevel}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-2 bg-muted rounded-full">
                      <div 
                        className={`h-2 ${getElementColor(skill.element).split(' ')[0]} rounded-full`} 
                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        disabled={skill.level >= skill.maxLevel}
                        className="w-full"
                      >
                        Upgrade Skill
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
            <div className="space-y-4">
              {character.inventory.map(item => (
                <div key={item.id} className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.type}</div>
                    <div className="flex gap-2 mt-2">
                      {Object.entries(item.stats).map(([stat, value]) => (
                        <div key={stat} className={`px-2 py-1 text-xs rounded ${getAttributeColor(stat)}`}>
                          {stat.toUpperCase()}: +{value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Button size="sm" variant="outline">Equip</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CharacterDetail;
