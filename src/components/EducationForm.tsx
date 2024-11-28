import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "../types";

const EducationForm = ({
  education,
  setEducation,
}: {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}) => {
    
  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now(),
        school: "",
        degree: "",
        graduationDate: "",
      },
    ]);
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string
  ) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>
      {education.map((edu) => (
        <div key={edu.id} className="space-y-4 mb-6 p-4 border rounded">
          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeEducation(edu.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            placeholder="School"
            value={edu.school}
            onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
          />
          <Input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
          />
          <Input
            placeholder="Graduation Date"
            type="date"
            value={edu.graduationDate}
            onChange={(e) =>
              updateEducation(edu.id, "graduationDate", e.target.value)
            }
          />
        </div>
      ))}
    </Card>
  );
};

export default EducationForm;
