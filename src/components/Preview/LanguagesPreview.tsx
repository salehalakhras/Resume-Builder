import { Language } from '@/types'

const LanguagesPreview = ({ languages }: { languages: Language[] }) => {
    return (
        <>
            {languages.length > 0 && (
                <div>
                    <h2 className="text-xl uppercase font-bold border-b border-slate-600 mb-2">Languages</h2>
                    <ul className="grid grid-cols-2">
                        {languages.map((lang: Language) => (
                            <li key={lang.id} className="text-sm">
                                {lang.name} - {lang.proficiency}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default LanguagesPreview
