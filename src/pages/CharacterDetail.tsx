
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
  const { data: character, isLoading: loading, isError } = useCharacter(id);

  if (loading) {
    return (
      <MainLayout>
        <CharacterLoading />
      </MainLayout>
    );
  }

  if (isError || !character) {
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
            <CharacterSummary character={{
              name: character.name,
              level: character.level,
              element: character.element,
              class: character.class,
              experience: character.experience,
              nextLevelExp: character.next_level_exp,
              strength: character.strength,
              agility: character.agility,
              energy: character.energy,
              resistance: character.resistance,
              health: character.health,
              maxHealth: character.max_health,
              mana: character.mana,
              maxMana: character.max_mana,
              stamina: character.stamina,
              maxStamina: character.max_stamina
            }} elementColorMap={elementColorMap} />
            <EquipmentSection equipment={character.equipment || []} />
          </div>
          
          {/* Skills and Inventory Column */}
          <div className="lg:col-span-2 space-y-6">
            <SkillsSection skills={character.skills?.map(skill => ({
              id: parseInt(skill.id),
              name: skill.name,
              element: skill.element,
              damage: skill.damage,
              cooldown: skill.cooldown
            })) || []} elementColorMap={elementColorMap} />
            <InventorySection inventory={character.inventory?.map(item => ({
              id: parseInt(item.id),
              name: item.name,
              quantity: item.quantity,
              effect: item.effect || ''
            })) || []} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CharacterDetail;
