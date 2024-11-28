import React, { useState } from 'react';
import { Experience, Education, PersonalInformation } from './types';
import PersonalInformationForm from './components/PersonalInformation';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import PreviewSection from './components/PreviewSection';


const App = () => {

  const [personalInfo, setPersonalInfo] = React.useState<PersonalInformation>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);


  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-slate-200">
      <div className="w-full lg:w-1/2 space-y-6">
        <PersonalInformationForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo}></PersonalInformationForm>
        <ExperienceForm experiences={experiences} setExperiences={setExperiences}></ExperienceForm>
        <EducationForm education={education} setEducation={setEducation}></EducationForm>
      </div>

      <PreviewSection personalInfo={personalInfo} experiences={experiences} education={education}></PreviewSection>
      
    </div>
  );
};

export default App;