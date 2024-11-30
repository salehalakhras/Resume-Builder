import { Experience } from '@/types'

const ExperiencePreview = ({ experiences }: { experiences: Experience[] }) => {
    return (
        <>
            {experiences.length > 0 && (
                <div>
                    <h2 className="text-xl uppercase font-bold border-b border-slate-600 mb-2">Experience</h2>
                    {experiences.map((exp: Experience) => (
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
        </>
    )
}

export default ExperiencePreview
