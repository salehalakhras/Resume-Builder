import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Language, ResumeData } from "../../types";
import { useSelector, useDispatch } from "react-redux";

const LanguageForm = () => {

  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const dispatch = useDispatch();

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now(),
      name: "",
      proficiency: "Basic",
    };
    const updatedResume: ResumeData = {
      ...resume,
      languages: [...resume.languages, newLanguage],
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  const removeLanguage = (id: number) => {
    const updatedResume: ResumeData = {
      ...resume,
      languages: resume.languages.filter((lang: Language) => lang.id !== id),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  const updateLanguage = (id: number, field: string, value: string) => {
    const updatedResume: ResumeData = {
      ...resume,
      languages: resume.languages.map((lang: Language) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Languages</h2>
        <Button onClick={addLanguage} size="sm" className="font-bold dark:bg-slate-200 dark:hover:bg-slate-300">
          <Plus className="w-4 h-4 mr-2" /> Add Language
        </Button>
      </div>
      {resume.languages && resume.languages.map((lang: Language) => (
        <div key={lang.id} className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Language"
            value={lang.name}
            onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
            className="flex-grow"
          />
          <select
            value={lang.proficiency}
            onChange={(e) =>
              updateLanguage(lang.id, "proficiency", e.target.value)
            }
            className="border rounded p-2 dark:bg-gray-900 dark:text-slate-200"
          >
            <option value="Basic">Basic</option>
            <option value="Conversational">Conversational</option>
            <option value="Professional">Professional</option>
            <option value="Native">Native</option>
          </select>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeLanguage(lang.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </Card>
  );
};

export default LanguageForm;
