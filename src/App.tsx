import { Card } from "./components/ui/card";
import PersonalInformationForm from "./components/Forms/PersonalInformationForm";
import ExperienceForm from "./components/Forms/ExperienceForm";
import EducationForm from "./components/Forms/EducationForm";
import PreviewSection from "./components/PreviewSection";
import SkillsForm from "./components/Forms/SkillsForm";
import ProjectsForm from "./components/Forms/ProjectsForm";
import CertificationForm from "./components/Forms/CertificationForm";
import LanguageForm from "./components/Forms/LanguageForm";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import useInitializeApp from "./components/useInitializeApp";
import ResumeManagement from "./components/ResumeManagement";

const App = () => {

  useInitializeApp();
  
  return (
    <>
      <Card className="p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <Button
          size={"sm"}
          onClick={() => {
            document.body.classList.toggle("dark");
          }}
        >
          <Sun color="white" />
          <Moon color="black" />
        </Button>
      </Card>
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-slate-200 dark:bg-slate-900">
        <ResumeManagement></ResumeManagement>
        <div className="w-full lg:w-1/2 space-y-6">
          <PersonalInformationForm></PersonalInformationForm>
          <ExperienceForm></ExperienceForm>
          <EducationForm></EducationForm>
          <SkillsForm></SkillsForm>
          <ProjectsForm></ProjectsForm>
          <CertificationForm></CertificationForm>
          <LanguageForm></LanguageForm>
        </div>

        <PreviewSection></PreviewSection>
      </div>
      <div className="text-center text-lg p-2 bg-slate-200 dark:bg-slate-900">Created By Saleh Alakhras</div>
    </>
  );
};

export default App;
