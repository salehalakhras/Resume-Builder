import React, { useState } from "react";
import { Card } from "./components/ui/card";
import {
  Experience,
  Education,
  PersonalInformation,
  Project,
  Skill,
  Certification,
  Language,
} from "./types";
import PersonalInformationForm from "./components/PersonalInformation";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import PreviewSection from "./components/PreviewSection";
import SkillsForm from "./components/SkillsForm";
import ProjectsForm from "./components/ProjectsForm";
import CertificationForm from "./components/CertificationForm";
import LanguageForm from "./components/LanguageForm";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";

const App = () => {
  const [personalInfo, setPersonalInfo] = React.useState<PersonalInformation>({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  return (
    <>
    <Card className="p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Resume Builder</h1>
      <Button size={"sm"}
        onClick={() => document.documentElement.classList.toggle("dark")}>
        <Sun color="white"/>
        <Moon color="black"/>
      </Button>
    </Card>
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-slate-200 dark:bg-slate-900">
      <div className="w-full lg:w-1/2 space-y-6">
        <PersonalInformationForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        ></PersonalInformationForm>
        <ExperienceForm
          experiences={experiences}
          setExperiences={setExperiences}
        ></ExperienceForm>
        <EducationForm
          education={education}
          setEducation={setEducation}
        ></EducationForm>
        <SkillsForm skills={skills} setSkills={setSkills}></SkillsForm>
        <ProjectsForm
          projects={projects}
          setProjects={setProjects}
        ></ProjectsForm>
        <CertificationForm
          certifications={certifications}
          setCertifications={setCertifications}
        ></CertificationForm>
        <LanguageForm
          languages={languages}
          setLanguages={setLanguages}
        ></LanguageForm>
      </div>

      <PreviewSection
        personalInformation={personalInfo}
        experiences={experiences}
        education={education}
        projects={projects}
        skills={skills}
        certifications={certifications}
        languages={languages}
      ></PreviewSection>
    </div>
    </>
  );
};

export default App;
