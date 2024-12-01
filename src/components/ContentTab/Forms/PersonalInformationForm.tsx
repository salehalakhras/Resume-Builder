import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInformation, ResumeData } from "@/types";
import { useDispatch, useSelector } from "react-redux";

const PersonalInformationForm = () => {
  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume: ResumeData = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const dispatch = useDispatch();


  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const updatedPersonalInfo: PersonalInformation = {
      ...resume.personalInformation,
      [name]: value,
    }

    const updatedResume: ResumeData = {
      ...resume,
      personalInformation: updatedPersonalInfo,
    }

    dispatch({
      type: "resumes/updateResume",
      payload: updatedResume,
    });
  }
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <Input
          placeholder="Full Name"
          name="fullName"
          value={resume.personalInformation.fullName}
          onChange={handlePersonalInfoChange}
        />
        <Input
          placeholder="Professional Title"
          name="title"
          value={resume.personalInformation.title}
          onChange={handlePersonalInfoChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={resume.personalInformation.email}
            onChange={handlePersonalInfoChange}
          />
          <Input
            placeholder="Phone"
            name="phone"
            value={resume.personalInformation.phone}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <Input
          placeholder="Location"
          name="location"
          value={resume.personalInformation.location}
          onChange={handlePersonalInfoChange}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="LinkedIn URL"
            name="linkedin"
            value={resume.personalInformation.linkedin}
            onChange={handlePersonalInfoChange}
          />
          <Input
            placeholder="GitHub Username"
            name="github"
            value={resume.personalInformation.github}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <Input
          placeholder="Personal Website"
          name="website"
          value={resume.personalInformation.website}
          onChange={handlePersonalInfoChange}
        />
        <Textarea
          placeholder="Professional Summary"
          name="summary"
          value={resume.personalInformation.summary}
          onChange={handlePersonalInfoChange}
          className="h-32"
        />
      </div>
    </Card>
  );
};

export default PersonalInformationForm;
