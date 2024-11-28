import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Experience, Education, PersonalInformation } from "../types";
//@ts-expect-error "There are no types for this library"
import html2pdf from "html2pdf.js";

const PreviewSection = ({
  personalInfo,
  experiences,
  education,
}: {
  personalInfo: PersonalInformation;
  experiences: Experience[];
  education: Education[];
}) => {
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
          <Button onClick={generatePDF}>
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
        <div id="resume-preview" className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-gray-600">
              {[personalInfo.email, personalInfo.phone, personalInfo.location]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>

          {personalInfo.summary && (
            <div>
              <h2 className="text-xl font-bold border-b mb-2">
                Professional Summary
              </h2>
              <p className="text-wrap">{personalInfo.summary}</p>
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
        </div>
      </Card>
    </div>
  );
};

export default PreviewSection;
