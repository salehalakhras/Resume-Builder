import CertificationForm from './Forms/CertificationForm'
import EducationForm from './Forms/EducationForm'
import ExperienceForm from './Forms/ExperienceForm'
import LanguageForm from './Forms/LanguageForm'
import PersonalInformationForm from './Forms/PersonalInformationForm'
import ProjectsForm from './Forms/ProjectsForm'
import SkillsForm from './Forms/SkillsForm'
import PreviewSection from '../PreviewSection'
import ResumeManagement from './ResumeManagement'

const Content = () => {
  return (
    <div>
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
    </div>
  )
}

export default Content
