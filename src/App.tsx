import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Download } from 'lucide-react';
//@ts-ignore
import html2pdf from 'html2pdf.js';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  graduationDate: string;
}

const App = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now(),
        school: '',
        degree: '',
        graduationDate: ''
      }
    ]);
  };

  const updateExperience = (id: number, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setEducation(education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const generatePDF = () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    
    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-slate-200">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handlePersonalInfoChange}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
            <Input
              placeholder="Phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
            <Input
              placeholder="Location"
              name="location"
              value={personalInfo.location}
              onChange={handlePersonalInfoChange}
            />
            <Textarea
              placeholder="Professional Summary"
              name="summary"
              value={personalInfo.summary}
              onChange={handlePersonalInfoChange}
              className="h-32"
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Experience</h2>
            <Button onClick={addExperience} size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
          </div>
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-4 mb-6 p-4 border rounded">
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              />
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
              <div className="flex gap-4">
                <Input
                  placeholder="Start Date"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
                <Input
                  placeholder="End Date"
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                />
              </div>
              <Textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                className="h-24"
              />
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Education</h2>
            <Button onClick={addEducation} size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Education
            </Button>
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="space-y-4 mb-6 p-4 border rounded">
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              />
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
              <Input
                placeholder="Graduation Date"
                type="date"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
              />
            </div>
          ))}
        </Card>
      </div>

      {/* Preview Section */}
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
              <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="text-gray-600">
                {[personalInfo.email, personalInfo.phone, personalInfo.location]
                  .filter(Boolean)
                  .join(' • ')}
              </p>
            </div>

            {personalInfo.summary && (
              <div>
                <h2 className="text-xl font-bold border-b mb-2">Professional Summary</h2>
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
    </div>
  );
};

export default App;