import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
//@ts-expect-error "There are no types for this library"
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import PersonalInfoPreview from "./ContentTab/Preview/PersonalInfoPreview";
import ExperiencePreview from "./ContentTab/Preview/ExperiencePreview";
import EducationPerview from "./ContentTab/Preview/EducationPerview";
import ProjectsPreview from "./ContentTab/Preview/ProjectsPreview";
import CertificationsPreview from "./ContentTab/Preview/CertificationsPreview";
import LanguagesPreview from "./ContentTab/Preview/LanguagesPreview";
import SkillsPreview from "./ContentTab/Preview/SkillsPreview";

const PreviewSection = () => {

  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);


  const generatePDF = () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    const opt = {
      filename: `${resume.name}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", orientation: "portrait", format: "a4" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4" >
      <Card className="p-4">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Preview</h2>

          <div className="flex items-center gap-4">
            <Button onClick={generatePDF} className="font-bold">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>

        </div>

        {/* A4 Preview Container */}
        <div className=" w-full h-full p-4 flex justify-center ">
          <div
            style={{
              width: '210mm',
              height: '297mm',
              transform: 'scale(1)',
              transformOrigin: 'top center',
              backgroundColor: 'white',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              margin: '0 auto',
            }}
            className="relative overflow-hidden"
          >
            {/* Content Container */}
            <div
              id="resume-preview"
              className="absulute top-0 left-0 right-0 p-8 dark:text-black font-merri origin-center"
            >
              <PersonalInfoPreview personalInformation={resume.personalInformation} />
              <ExperiencePreview experiences={resume.experiences} />
              <EducationPerview education={resume.education} />
              <ProjectsPreview projects={resume.projects} />
              <SkillsPreview skills={resume.skills} />
              <CertificationsPreview certifications={resume.certifications} />
              <LanguagesPreview languages={resume.languages} />

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PreviewSection;
