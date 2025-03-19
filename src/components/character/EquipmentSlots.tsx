
import { List } from "lucide-react";

const EquipmentSlots = () => {
  return (
    <div className="bg-muted/40 p-4 rounded-md">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <List className="h-4 w-4" />
        Equipment Slots (11 Total)
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
        <div>• Helmet</div>
        <div>• Chest</div>
        <div>• Legs</div>
        <div>• Boots</div>
        <div>• Gloves</div>
        <div>• Backpack</div>
        <div>• Ring</div>
        <div>• Necklace</div>
        <div>• Bracelet</div>
        <div>• Main Hand</div>
        <div>• Off Hand</div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Some items require both hands and will occupy Main Hand and Off Hand slots.
      </p>
    </div>
  );
};

export default EquipmentSlots;
