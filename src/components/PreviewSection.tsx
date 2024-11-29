import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download, Maximize2, ZoomOut, ZoomIn, ChevronLeft, ChevronRight, Linkedin, Github, Globe } from "lucide-react";
import { Education, Experience, ResumeData } from "../types";
//@ts-expect-error "There are no types for this library"
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";

const PAGE_HEIGHT = 297 //mm

const PreviewSection = ({
  resumeName,
  projects,
  skills,
  certifications,
  languages,
  contentRef,
  setContentScale,
  contentScale,
  currentPage,
  setCurrentPage,
  totalPages
}: {
  resumeName: string;
  personalInformation: ResumeData["personalInformation"];
  experiences: ResumeData["experiences"];
  education: ResumeData["education"];
  projects: ResumeData["projects"];
  skills: ResumeData["skills"];
  certifications: ResumeData["certifications"];
  languages: ResumeData["languages"];
  contentRef: React.RefObject<HTMLDivElement>;
  setContentScale: React.Dispatch<React.SetStateAction<number>>;
  contentScale: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) => {

  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);

  const [scale, setScale] = React.useState(1);
  const previewRef = React.useRef<HTMLDivElement>(null);

  // Function to check if content overflows the page
  // const checkOverflow = () => {
  //   if (contentRef.current && previewRef.current) {
  //     const content = contentRef.current;
  //     const container = previewRef.current;
  //     return content.scrollHeight > container.clientHeight;
  //   }
  //   return false;
  // };

  // Function to automatically fit content to page
  const autoFitContent = () => {
    if (contentRef.current && previewRef.current) {
      const content = contentRef.current;
      const container = previewRef.current;

      // Start with scale 1
      let testScale = 1;
      setContentScale(1);

      // While content overflows, reduce scale by 0.05
      while (content.scrollHeight > container.clientHeight && testScale > 0.5) {
        testScale -= 0.05;
        setContentScale(testScale);
      }
    }
  };

  const generatePDF = () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    const opt = {
      filename: `${resumeName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: contentScale },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Preview</h2>
          <span className="text-lg font-bold text-gray-700 dark:text-gray-400">Resume: {resumeName}</span>
          <div className="flex items-center gap-4">
            <Button onClick={autoFitContent} className="font-bold">
              <Maximize2 className="w-4 h-4 mr-2" />
              Auto-fit to Page
            </Button>
            <Button onClick={generatePDF} className="font-bold">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>

        <div className="flex gap-4 justify-around items-center mb-4">
          {/* Page Navigation */}
          <div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          {/* Preview Scale Controls */}
          <div className="flex justify-center gap-4">
            <ZoomOut className="w-4 h-4" />
            <Slider
              value={[scale]}
              onValueChange={(value) => setScale(value[0])}
              min={0.5}
              max={1}
              step={0.1}
              className="w-48"
            />
            <ZoomIn className="w-4 h-4" />
            <span className="text-sm text-gray-500">
              {Math.round(scale * 100)}%
            </span>
          </div>
        </div>


        {/* A4 Preview Container */}
        <div className="relative w-full flex justify-center">
          <div
            style={{
              width: '210mm',
              height: '297mm',
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              backgroundColor: 'white',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              margin: '0 auto',
            }}
            className="relative overflow-hidden"
            ref={previewRef}
          >
            {/* Content Container */}
            <div
              id="resume-preview"
              ref={contentRef}
              className="h-full w-full p-6 dark:text-black font-merri"
              style={{
                transform: `scale(${contentScale})`,
                transformOrigin: 'top center',
                top: `${-(currentPage - 1) * (PAGE_HEIGHT / contentScale)}mm`,
              }}
            >
              <div className="text-center">
                <h1 className="text-3xl font-semibold">
                  {resume.personalInformation.name || "Your Name"}
                </h1>
                <p className="text-gray-800">{resume.personalInformation.title}</p>
                <p className="text-gray-600 text-sm">
                  {[
                    resume.personalInformation.email,
                    resume.personalInformation.phone,
                    resume.personalInformation.location,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
                <p className="text-gray-600 text-sm italic gap-2 flex items-center justify-center">
                  {resume.personalInformation.github && (
                    <>
                      <Github className="w-4 h-4 inline-block"></Github>
                      <a
                        href={"https://github.com/" + resume.personalInformation.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {resume.personalInformation.github}
                      </a>
                    </>

                  )}

                  {resume.personalInformation.linkedin && (
                    <>
                      <Linkedin className="w-4 h-4 inline-block"></Linkedin>
                      <a
                        href={resume.personalInformation.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {resume.personalInformation.linkedin}
                      </a>

                    </>

                  )}
                  {resume.personalInformation.website && (
                    <>
                      <Globe className="w-4 h-4 inline-block"></Globe>
                      <a
                        href={resume.personalInformation.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {resume.personalInformation.website}
                      </a>
                    </>

                  )}
                </p>
              </div>

              {resume.personalInformation.summary && (
                <div>
                  <h2 className="text-xl font-bold border-b mb-2 mt-2">
                    Professional Summary
                  </h2>
                  <p className="text-wrap">{resume.personalInformation.summary}</p>
                </div>
              )}

              {resume.experiences.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold border-b mb-2">Experience</h2>
                  {resume.experiences.map((exp: Experience) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between">
                        <strong>{exp.title}</strong>
                        <span>{exp.company}</span>
                      </div>
                      <div className="text-gray-600">
                        {exp.startDate} - {exp.endDate}
                      </div>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {resume.education.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold border-b mb-2">Education</h2>
                  {resume.education.map((edu: Education) => (
                    <div key={edu.id} className="mb-4">
                      <div className="flex justify-between">
                        <strong>{edu.degree}</strong>
                        <div className="text-gray-600">{edu.startDate} - {edu.endDate}</div>
                      </div>
                      <span>{edu.school}</span>
                    </div>
                  ))}
                </div>
              )}

              {projects.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold border-b mb-2">Projects</h2>
                  {projects.map((proj) => (
                    <div key={proj.id} className="mb-4">
                      <div className="flex gap-4">
                        <strong>{proj.name}</strong>
                        <span>|</span>
                        <span>{proj.technologies}</span>
                      </div>
                      {proj.link && (
                        <div className="text-sm italic text-blue-700 ">
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {proj.link}
                          </a>
                        </div>
                      )}
                      <div className="text-gray-600">{proj.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold border-b mb-2">Skills</h2>
                  <ul className="grid grid-cols-2">
                    {skills.map((skill) => (
                      <li key={skill.id} className="text-sm">
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {certifications.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold border-b mb-2">
                    Certifications
                  </h2>
                  {certifications.map((cert) => (
                    <div key={cert.id} className="mb-4">
                      <div className="flex justify-between">
                        <strong>{cert.name}</strong>
                        <span>{cert.issuer}</span>
                      </div>
                      <div className="text-gray-600">{cert.date}</div>
                    </div>
                  ))}
                </div>
              )}

              {languages.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold border-b mb-2">Languages</h2>
                  <ul className="grid grid-cols-2">
                    {languages.map((lang) => (
                      <li key={lang.id} className="text-sm">
                        {lang.name} - {lang.proficiency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PreviewSection;
