
import React from "react";

interface Skill {
  id: number;
  name: string;
  element: string;
  damage: number;
  cooldown: number;
}

interface SkillsSectionProps {
  skills: Skill[];
  elementColorMap: Record<string, string>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, elementColorMap }) => {
  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <div className="space-y-4">
        {skills.map((skill) => {
          const skillElementColor = elementColorMap[skill.element] || 'gray-400';
          const colorBase = typeof skillElementColor === 'string' ? skillElementColor.split('-')[0] : 'game';
          return (
            <div key={skill.id} className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <h3 className="font-medium">{skill.name}</h3>
                <div className="flex items-center text-sm">
                  <span className={`text-${colorBase}-${skillElementColor.includes('-') ? skillElementColor.split('-')[1] : 'accent'}`}>
                    {skill.element.charAt(0).toUpperCase() + skill.element.slice(1)}
                  </span>
                  <span className="mx-2">•</span>
                  <span>Damage: {skill.damage}</span>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Cooldown: {skill.cooldown}s</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
