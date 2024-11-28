import React, { useState } from "react";
import { Card } from "./components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  const [currentResumeIndex, setCurrentResumeIndex] = useState(0);
  const [currentResumeName, setCurrentResumeName] = useState<string>("");
  const [savedResumes, setSavedResumes] = useState<string[]>([]);

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
  const [darkMode, setDarkMode] = useState(false);

  const [initialLoad, setInitialLoad] = useState(true);

  React.useEffect(() => {
    const resumeData = localStorage.getItem(`resumeData ${currentResumeIndex}`);
    const resumeNames = localStorage.getItem("resumeNames");

    if (resumeNames) {
      setSavedResumes(JSON.parse(resumeNames));
    }

    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      setDarkMode(JSON.parse(darkMode));
    }

    if (resumeData) {
      const parsedResumeData = JSON.parse(resumeData);
      setCurrentResumeName(parsedResumeData.resumeName);
      setPersonalInfo(parsedResumeData.personalInfo);
      setExperiences(parsedResumeData.experiences);
      setEducation(parsedResumeData.education);
      setProjects(parsedResumeData.projects);
      setSkills(parsedResumeData.skills);
      setCertifications(parsedResumeData.certifications);
      setLanguages(parsedResumeData.languages);
      setInitialLoad(false);
    }
  }, [currentResumeIndex]);

  React.useEffect(() => {
    if (initialLoad) return;
    localStorage.setItem(
      `resumeData ${currentResumeIndex}`,
      JSON.stringify({
        currentResumeName,
        personalInfo,
        experiences,
        education,
        projects,
        skills,
        certifications,
        languages,
      })
    );
  }, [
    personalInfo,
    experiences,
    education,
    projects,
    skills,
    certifications,
    languages,
    initialLoad,
    currentResumeName,
    currentResumeIndex,
  ]);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("darkMode");
    }
  }, [darkMode]);

  return (
    <>
      <Card className="p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <Tabs defaultValue="0" className="">
          <TabsList>
            {savedResumes.map((resumeName, index) => (
              <TabsTrigger onClick={() => setCurrentResumeIndex(index)} key={index} value={index.toString()}>
                {resumeName}
              </TabsTrigger>
            ))} : <TabsTrigger onClick={() => setCurrentResumeIndex(0)} value="0">New Resume</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          size={"sm"}
          onClick={() => {
            document.documentElement.classList.toggle("dark");
            setDarkMode(!darkMode);
          }}
        >
          <Sun color="white" />
          <Moon color="black" />
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
          resumeName={currentResumeName}
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
