
import React from "react";

interface Equipment {
  slot: string;
  name: string;
  rarity: string;
  stats: Record<string, number>;
}

interface EquipmentSectionProps {
  equipment: Equipment[];
}

const EquipmentSection: React.FC<EquipmentSectionProps> = ({ equipment }) => {
  // Helper to get color class based on equipment rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'text-game-accent';
      case 'epic': return 'text-purple-500';
      case 'rare': return 'text-blue-500';
      case 'uncommon': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Equipment</h2>
      <div className="space-y-3">
        {equipment.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{item.slot}</p>
              <p className={`text-sm ${getRarityColor(item.rarity)}`}>{item.name}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              {Object.entries(item.stats).map(([key, value]) => (
                <span key={key} className="ml-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: +{value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentSection;
