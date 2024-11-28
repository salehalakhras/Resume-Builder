import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Project } from "../types";

const ProjectsForm = ({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) => {

    const addProject = () => {
        setProjects([
          ...projects,
          {
            id: Date.now(),
            name: "",
            description: "",
            technologies: "",
            link: "",
          },
        ]);
      };
    
      const updateProject = (
        id: number,
        field: keyof Project,
        value: string
      ) => {
        setProjects(
          projects.map((project) => (project.id === id ? { ...project, [field]: value } : project))
        );
      };
    
      const removeProject = (id: number) => {
        setProjects(projects.filter((project) => project.id !== id));
      };



  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button
          onClick={addProject}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>
      {projects.map((project) => (
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
