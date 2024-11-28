import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Language } from "../types";

const LanguageForm = ({
  languages,
  setLanguages,
}: {
  languages: Language[];
  setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}) => {
  const addLanguage = () => {
    setLanguages([
      ...languages,
      { id: Date.now(), name: "", proficiency: "Professional" },
    ]);
  };

  const updateLanguage = (id: number, field: keyof Language, value: string) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const removeLanguage = (id: number) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Languages</h2>
        <Button onClick={addLanguage} size="sm" className="font-bold">
          <Plus className="w-4 h-4 mr-2" /> Add Language
        </Button>
      </div>
      {languages.map((lang) => (
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
            className="border rounded p-2"
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
