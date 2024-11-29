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
  ResumeData,
} from "./types";
import PersonalInformationForm from "./components/PersonalInformation";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import PreviewSection from "./components/PreviewSection";
import SkillsForm from "./components/SkillsForm";
import ProjectsForm from "./components/ProjectsForm";
import CertificationForm from "./components/CertificationForm";
import LanguageForm from "./components/LanguageForm";
import ResumeDialog from "./components/ResumeDialog";
import { Button } from "./components/ui/button";
import { Moon, Sun, File, Copy, Trash2, MoreVertical } from "lucide-react";
import useInitializeApp from "./components/useInitializeApp";
import ResumeManagement from "./components/ResumeManagement";

const CONTENT_HEIGHT = 277; // mm (excluding margins)

const App = () => {

  useInitializeApp();

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      const scale = window.innerWidth / 1000;
      setContentScale(scale > 1? 1 : scale);
    })
  },[])

  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [currentResumeId, setCurrentResumeId] = useState<string>('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


  // Function to create a new resume
  const createNewResume = (name: string) => {
    const newResume: ResumeData = {
      id: Date.now().toString(),
      name,
      personalInformation: {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
        summary: ''
      },
      experiences: [],
      education: [],
      projects: [],
      skills: [],
      certifications: [],
      languages: [],
    };

    setResumes([...resumes, newResume]);
    setCurrentResumeId(newResume.id);
  };

  // Function to duplicate current resume
  const duplicateResume = () => {
    const currentResume = resumes.find(r => r.id === currentResumeId);
    if (!currentResume) return;

    const newResume = {
      ...currentResume,
      id: Date.now().toString(),
      name: `${currentResume.name} (Copy)`,
      updatedAt: new Date()
    };

    setResumes([...resumes, newResume]);
    setCurrentResumeId(newResume.id);
  };

  // Function to delete current resume
  const deleteResume = (id: string) => {
    setResumes(resumes.filter(r => r.id !== id));
    if (currentResumeId === id) {
      setCurrentResumeId(resumes[0]?.id || '');
    }
  };

  // Function to save current resume
  const saveResume = () => {
    const updatedResumes = resumes.map(resume => {
      if (resume.id === currentResumeId) {
        return {
          ...resume,
          personalInfo,
          experiences,
          education,
          projects,
          skills,
          certifications,
          languages,
          updatedAt: new Date()
        };
      }
      return resume;
    });
    setResumes(updatedResumes);
  };

  // Load resume data when switching between resumes
  React.useEffect(() => {
    const currentResume = resumes.find(r => r.id === currentResumeId);
    if (currentResume) {
      setPersonalInfo(currentResume.personalInformation);
      setExperiences(currentResume.experiences);
      setEducation(currentResume.education);
      setProjects(currentResume.projects);
      setSkills(currentResume.skills);
      setCertifications(currentResume.certifications);
      setLanguages(currentResume.languages);
    }
  }, [currentResumeId]);

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
  const [contentScale, setContentScale] = React.useState(1);
  const contentRef = React.useRef<HTMLDivElement>(null);




  // Auto-save when data changes
  React.useEffect(() => {
    if (currentResumeId) {
      saveResume();
    }
  }, [personalInfo, experiences, education, projects, skills, certifications, languages]);

  // Calculate total pages
  React.useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const pages = Math.ceil(contentHeight / (CONTENT_HEIGHT * contentScale));
      setTotalPages(pages);
    }
  }, [contentScale]);





  return (
    <>
      <Card className="p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
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

        <PreviewSection
          resumeName={currentResumeId ? resumes.find(r => r.id === currentResumeId)?.name || '' : ''}
          personalInformation={personalInfo}
          experiences={experiences}
          education={education}
          projects={projects}
          skills={skills}
          certifications={certifications}
          languages={languages}
          contentRef={contentRef}
          contentScale={contentScale}
          setContentScale={setContentScale}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></PreviewSection>
      </div>
      <div className="text-center text-lg p-2 bg-slate-200 dark:bg-slate-900">Created By Saleh Alakhras</div>
    </>
  );
};

export default App;
