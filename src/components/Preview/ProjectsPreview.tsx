import { Project } from '@/types'

const ProjectsPreview = ({ projects }: { projects: Project[] }) => {
    return (
        <>
            {projects.length > 0 && (
                <div>
                    <h2 className="text-xl uppercase font-bold border-b border-slate-600 mb-2">Projects</h2>
                    {projects.map((proj: Project) => (
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

        </>
    )
}

export default ProjectsPreview
