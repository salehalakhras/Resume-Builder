import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Skill } from "@/types";
import { useDispatch, useSelector } from "react-redux";

const SkillsForm = () => {

  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const dispatch = useDispatch();

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now(),
      name: "",
      level: "Beginner",
    };
    const updatedResume: ResumeData = {
      ...resume,
      skills: [...resume.skills, newSkill],
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  const removeSkill = (id: number) => {
    const updatedResume: ResumeData = {
      ...resume,
      skills: resume.skills.filter((skill: Skill) => skill.id !== id),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  const updateSkill = (id: number, field: string, value: string) => {
    const updatedResume: ResumeData = {
      ...resume,
      skills: resume.skills.map((skill: Skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };


  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button onClick={addSkill} size="sm" className="font-bold dark:bg-slate-200 dark:hover:bg-slate-300">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>
      {resume.skills && resume.skills.map((skill: Skill) => (
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
            className="border rounded p-2 dark:bg-slate-900 dark:text-slate-200"
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
