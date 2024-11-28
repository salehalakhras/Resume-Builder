import React, { useState } from "react";
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
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-slate-200">
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
  );
};

export default App;
