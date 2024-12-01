import ResumeDialog from './ResumeDialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { MoreVertical, Copy, Trash2, File } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { ResumeData } from '@/types';

const ResumeManagement = () => {

    const currentResume = useSelector((state: any) => state.resumes.currentResume);
    const resumes = useSelector((state: any) => state.resumes.resumes);
    const dispatch = useDispatch();


    const addResume = (
      name: string
    ) => {
      const newResume = {
        id: Date.now(),
        name: name,
        personalInformation: {
          fullName: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
          website: '',
          summary: ''
        },
        experiences: [],
        education: [],
        projects: [],
        skills: [],
        certifications: [],
        languages: [],
      };
      dispatch({ type: 'resumes/addResume', payload: newResume });
    };

    const duplicateResume = () => {
      const currentResumeData = resumes[currentResume];
      if (!currentResumeData) return;
  
      const newResume = {
        ...currentResumeData,
        id: Date.now().toString(),
        name: `${currentResumeData.name} (Copy)`,
      };
  
      dispatch({ type: 'resumes/addResume', payload: newResume });
    };

    const removeResume = (id: number) => {
      dispatch({ type: 'resumes/deleteResume', payload: id });
    };

    const changeResume = (id: number) => {
      dispatch({ type: 'resumes/changeResume', payload: id });
    };
    
  return (
    <div className="w-full lg:w-64 space-y-4">
    <ResumeDialog addResume={addResume} ></ResumeDialog>
    <div className="space-y-2">
      {resumes.map((resume: ResumeData, index: number) => (
        <div
          key={resume.id}
          className={`flex items-center justify-between p-2 rounded cursor-pointer ${currentResume === index ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          onClick={() => {
            changeResume(index);
          }}
        >
          <div className="flex items-center gap-2">
            <File className="w-4 h-4" />
            <span className="truncate">{resume.name}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => duplicateResume()}>
                <Copy className="w-4 h-4 mr-2" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => removeResume(index)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ResumeManagement
