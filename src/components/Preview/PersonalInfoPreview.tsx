import { PersonalInformation } from '@/types'
import { Github, Linkedin, Globe } from 'lucide-react'

const PersonalInfoPreview = ({ personalInformation }: { personalInformation: PersonalInformation }) => {

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-semibold">
                    {personalInformation.fullName || "Your Name"}
                </h1>
                <p className="text-gray-800">{personalInformation.title}</p>
                <p className="text-gray-600 text-sm">
                    {[
                        personalInformation.email,
                        personalInformation.phone,
                        personalInformation.location,
                    ]
                        .filter(Boolean)
                        .join(" • ")}
                </p>
                <p className="text-gray-600 text-sm italic gap-2 flex items-center justify-center">
                    {personalInformation.github && (
                        <>
                            <Github className="w-4 h-4 inline-block"></Github>
                            <a
                                href={"https://github.com/" + personalInformation.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {personalInformation.github}
                            </a>
                        </>

                    )}

                    {personalInformation.linkedin && (
                        <>
                            <Linkedin className="w-4 h-4 inline-block"></Linkedin>
                            <a
                                href={personalInformation.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {personalInformation.linkedin}
                            </a>

                        </>

                    )}
                    {personalInformation.website && (
                        <>
                            <Globe className="w-4 h-4 inline-block"></Globe>
                            <a
                                href={personalInformation.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {personalInformation.website}
                            </a>
                        </>

                    )}
                </p>
            </div>

            {personalInformation.summary && (
                <div>
                    <h2 className="text-xl uppercase font-bold border-b border-slate-600  mb-2 mt-2">
                        Summary
                    </h2>
                    <p className="text-wrap">{personalInformation.summary}</p>
                </div>
            )}
        </>
    )
}

export default PersonalInfoPreview
