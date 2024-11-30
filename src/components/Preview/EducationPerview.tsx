import { Education } from '@/types'

const EducationPerview = ({ education }: { education: Education[] }) => {
    return (
        <>
            {education.length > 0 && (
                <div>
                    <h2 className="text-xl uppercase font-bold border-b border-slate-600 mb-2">Education</h2>
                    {education.map((edu: Education) => (
                        <div key={edu.id} className="mb-4">
                            <div className="flex justify-between">
                                <strong>{edu.degree}</strong>
                                <div className="text-gray-600">{edu.startDate} - {edu.endDate}</div>
                            </div>
                            <span>{edu.school}</span>
                        </div>
                    ))}
                </div>
            )}

        </>
    )
}

export default EducationPerview
