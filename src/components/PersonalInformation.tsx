import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInformation } from "@/types";

const PersonalInformationForm = ({
  personalInfo,
  setPersonalInfo,
}: {
  personalInfo: PersonalInformation;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInformation>>;
}) => {


  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
  );
};

export default PersonalInformationForm;
