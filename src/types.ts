
export interface PersonalInformation {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    summary: string;
}
export interface Experience {
    id: number;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: number;
    school: string;
    degree: string;
    graduationDate: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    technologies: string;
    link?: string;
}

export interface Skill {
    id: number;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Certification {
    id: number;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
}

export interface Language {
    id: number;
    name: string;
    proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

export interface ResumeData {
    resumeName: string;
    personalInformation: PersonalInformation;
    experiences: Experience[];
    education: Education[];
    projects: Project[];
    skills: Skill[];
    certifications: Certification[];
    languages: Language[];
}