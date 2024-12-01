import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Project, ResumeData } from "../../../types";
import { useSelector, useDispatch } from "react-redux";

const ProjectsForm = () => {
  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const dispatch = useDispatch();

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    };
    const updatedResume: ResumeData = {
      ...resume,
      projects: [...resume.projects, newProject],
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  const removeProject = (projectId: number) => {    
    const updatedResume: ResumeData = {
      ...resume,
      projects: resume.projects.filter((project: Project) => project.id !== projectId),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };

  const updateProject = (projectId: number, field: keyof Project, value: string) => {
    const updatedResume: ResumeData = {
      ...resume,
      projects: resume.projects.map((project: Project) => {
        if (project.id === projectId) {
          return { ...project, [field]: value };
        }
        return project;
      }),
    };
    dispatch({ type: "resumes/updateResume", payload: updatedResume });
  };



  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button
          onClick={addProject}
          size="sm"
          className="font-bold dark:bg-slate-200 dark:hover:bg-slate-300"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
      </div>
      {resume.projects && resume.projects.map((project: Project) => (
        <div key={project.id} className="space-y-4 mb-6 p-4 border rounded">
          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeProject(project.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            placeholder="Project Name"
            value={project.name}
            onChange={(e) =>
              updateProject(project.id, "name", e.target.value)
            }
          />
          <Textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) =>
              updateProject(project.id, "description", e.target.value)
            }
            className="h-24"
          />
          <Input
            placeholder="Technologies Used"
            value={project.technologies}
            onChange={(e) =>
              updateProject(
                project.id,
                "technologies",
                e.target.value,
              )
            }
          />
          <Input
            placeholder="Project Link (optional)"
            value={project.link}
            onChange={(e) =>
              updateProject(project.id, "link", e.target.value)
            }
          />
        </div>
      ))}
    </Card>
  );
};

export default ProjectsForm;
