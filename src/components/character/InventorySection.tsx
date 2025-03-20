
import React from "react";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  effect: string;
}

interface InventorySectionProps {
  inventory: InventoryItem[];
}

const InventorySection: React.FC<InventorySectionProps> = ({ inventory }) => {
  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Inventory</h2>
      <div className="space-y-4">
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.effect}</p>
              </div>
              <div className="text-sm">
                <span>Quantity: {item.quantity}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No items in inventory</p>
        )}
      </div>
    </div>
  );
};

export default InventorySection;
