import { Skill } from '@/types'

const SkillsPreview = ({ skills }: { skills: Skill[] }) => {
    return (
        <>
            {skills.length > 0 && (
                <div>
                    <h2 className="text-xl uppercase font-bold border-b border-slate-600 mb-2">Skills</h2>
                    <ul className="grid grid-cols-2">
                        {skills.map((skill: Skill) => (
                            <li key={skill.id} className="text-sm">
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default SkillsPreview
