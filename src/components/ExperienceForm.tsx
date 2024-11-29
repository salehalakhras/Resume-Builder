import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Experience, ResumeData } from "../types";
import { resumeState } from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";

const ExperienceForm = () => {
  const currentResume = useSelector((state: resumeState) => state.currentResume);
  const resume: ResumeData = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const dispatch = useDispatch();

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    }

    const updatedResume: ResumeData = {
      ...resume,
      experiences: [...resume.experiences, newExperience],
    }

    dispatch({
      type: "resumes/updateResume",
      payload: updatedResume,
    });
  };

  const removeExperience = (id: number) => {
    const updatedResume: ResumeData = {
      ...resume,
      experiences: resume.experiences.filter((exp) => exp.id !== id),
    }

    dispatch({
      type: "resumes/updateResume",
      payload: updatedResume,
    });
  };

  const updateExperience = (id: number, field: keyof Experience, value: string) => {
    const updatedResume: ResumeData = {
      ...resume,
      experiences: resume.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }

    dispatch({
      type: "resumes/updateResume",
      payload: updatedResume,
    });
  };


  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Experience</h2>
        <Button onClick={addExperience} size="sm"
          className="font-bold">
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>
      {resume.experiences.map((exp) => (
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
              value={exp.startDate + "-01"}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2,
                  '0')}`;
                updateExperience(exp.id, "startDate", formattedDate)
              }

              }
            />
            <Input
              placeholder="End Date"
              type="date"
              value={exp.endDate + "-01"}
              onChange={(e) =>
                {
                  const selectedDate = new Date(e.target.value);
                  const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2,
                    '0')}`;
                  updateExperience(exp.id, "endDate", formattedDate)
                }
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
