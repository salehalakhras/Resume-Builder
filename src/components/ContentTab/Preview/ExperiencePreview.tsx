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
                                <div className="text-gray-600">
                                    {exp.startDate.split('-').reverse().join('/').substring(3, 10)} - {exp.endDate.split('-').reverse().join('/').substring(3, 10)}
                                </div>
                            </div>
                            <span>{exp.company}</span>
                            <p className="mt-2">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ExperiencePreview
