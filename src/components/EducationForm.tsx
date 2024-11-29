import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Education, ResumeData } from "../types";
import { useDispatch, useSelector } from "react-redux";

const EducationForm = () => {
  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const dispatch = useDispatch();

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
    };
    const updatedResume: ResumeData = {
      ...resume,
      education: [...resume.education, newEducation],
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    const updatedResume: ResumeData = {
      ...resume,
      education: resume.education.map((edu: Education) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  }

  const removeEducation = (id: number) => {
    const updatedResume: ResumeData = {
      ...resume,
      education: resume.education.filter((edu: Education) => edu.id !== id),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };


  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <Button onClick={addEducation} size="sm" className="font-bold dark:bg-slate-200 dark:hover:bg-slate-300">
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>
      {resume.education && resume.education.map((edu: Education) => (
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
            placeholder="Grade (optional)"
            value={edu.grade}
            onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
          />
          <div className="flex gap-4">

            <Input
              placeholder="Start Year"
              type="date"
              value={edu.startDate}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = selectedDate.getFullYear().toString();
                updateEducation(edu.id, "startDate", formattedDate);
              }
              }
            />
            <Input
              placeholder="End Year"
              type="date"
              value={edu.endDate}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = selectedDate.getFullYear().toString();
                updateEducation(edu.id, "endDate", formattedDate);
              }
              }
            />
          </div>
        </div>
      ))}
    </Card>
  );
};

export default EducationForm;
