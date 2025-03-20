
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CharacterSummary from "@/components/character/CharacterSummary";
import EquipmentSection from "@/components/character/EquipmentSection";
import SkillsSection from "@/components/character/SkillsSection";
import InventorySection from "@/components/character/InventorySection";
import CharacterLoading from "@/components/character/CharacterLoading";
import CharacterNotFound from "@/components/character/CharacterNotFound";
import { useCharacter, elementColorMap } from "@/hooks/useCharacter";

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading } = useCharacter(id);

  if (loading) {
    return (
      <MainLayout>
        <CharacterLoading />
      </MainLayout>
    );
  }

  if (!character) {
    return (
      <MainLayout>
        <CharacterNotFound />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Summary & Equipment Column */}
          <div className="lg:col-span-1 space-y-6">
            <CharacterSummary character={character} elementColorMap={elementColorMap} />
            <EquipmentSection equipment={character.equipment} />
          </div>
          
          {/* Skills and Inventory Column */}
          <div className="lg:col-span-2 space-y-6">
            <SkillsSection skills={character.skills} elementColorMap={elementColorMap} />
            <InventorySection inventory={character.inventory} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CharacterDetail;
