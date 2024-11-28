import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Skill } from "@/types";

const SkillsForm = ({
  skills,
  setSkills,
}: {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}) => {
  const addSkill = () => {
    setSkills([...skills, { id: Date.now(), name: "", level: "Intermediate" }]);
  };

  const updateSkill = (id: number, field: keyof Skill, value: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button onClick={addSkill} size="sm" className="font-bold">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Skill Name"
            value={skill.name}
            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
            className="flex-grow"
          />
          <select
            value={skill.level}
            onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
            className="border rounded p-2"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeSkill(skill.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </Card>
  );
};

export default SkillsForm;
