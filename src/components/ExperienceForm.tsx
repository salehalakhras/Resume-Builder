import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Experience } from "../types";

const ExperienceForm = ({ experiences, setExperiences } : { experiences: Experience[], setExperiences: React.Dispatch<React.SetStateAction<Experience[]>> }) => {
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const updateExperience = (
    id: number,
    field: keyof Experience,
    value: string
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Experience</h2>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>
      {experiences.map((exp) => (
        <div key={exp.id} className="space-y-4 mb-6 p-4 border rounded">
          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            placeholder="Job Title"
            value={exp.title}
            onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
          />
          <Input
            placeholder="Company"
            value={exp.company}
            onChange={(e) =>
              updateExperience(exp.id, "company", e.target.value)
            }
          />
          <div className="flex gap-4">
            <Input
              placeholder="Start Date"
              type="date"
              value={exp.startDate}
              onChange={(e) =>
                updateExperience(exp.id, "startDate", e.target.value)
              }
            />
            <Input
              placeholder="End Date"
              type="date"
              value={exp.endDate}
              onChange={(e) =>
                updateExperience(exp.id, "endDate", e.target.value)
              }
            />
          </div>
          <Textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) =>
              updateExperience(exp.id, "description", e.target.value)
            }
            className="h-24"
          />
        </div>
      ))}
    </Card>
  );
};

export default ExperienceForm;
