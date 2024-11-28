
export interface PersonalInformation {
    fullName: string;
    email: string;
    phone: string;
    location: string;
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
  
export  interface Education {
    id: number;
    school: string;
    degree: string;
    graduationDate: string;
  }