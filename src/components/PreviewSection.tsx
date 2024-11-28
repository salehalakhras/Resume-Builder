import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResumeData } from "../types";
//@ts-expect-error "There are no types for this library"
import html2pdf from "html2pdf.js";

const PreviewSection = ({
  personalInformation,
  experiences,
  education,
  projects,
  skills,
  certifications,
  languages,
}: ResumeData) => {
  const generatePDF = () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    const opt = {
      margin: 1,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="w-full lg:w-1/2">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Preview</h2>
          <Button onClick={generatePDF} className="font-bold">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
        <div id="resume-preview" className="space-y-6 rounded-lg border border-slate-300 p-6 shadow-lg dark:border-slate-700 h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {personalInformation.fullName || "Your Name"}
            </h1>
            <p className="text-gray-600">
              {[
                personalInformation.email,
                personalInformation.phone,
                personalInformation.location,
              ]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>

          {personalInformation.summary && (
            <div>
              <h2 className="text-xl font-bold border-b mb-2">
                Professional Summary
              </h2>
              <p className="text-wrap">{personalInformation.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b mb-2">Experience</h2>
              {experiences.map((exp) => (
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

          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b mb-2">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between">
                    <strong>{edu.degree}</strong>
                    <span>{edu.school}</span>
                  </div>
                  <div className="text-gray-600">{edu.graduationDate}</div>
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
      </Card>
    </div>
  );
};

export default PreviewSection;
