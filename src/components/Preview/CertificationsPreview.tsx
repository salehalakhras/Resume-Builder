import { Certification } from "@/types"

const CertificationsPreview = ({ certifications }: { certifications: Certification[] }) => {
    return (
        <>
            {certifications.length > 0 && (
                <div>
                    <h2 className="text-xl uppercase font-bold border-b border-slate-600">
                        Certifications
                    </h2>
                    {certifications.map((cert: Certification) => (
                        <div key={cert.id} className="">
                            <div className="flex justify-between">
                                <strong>{cert.name}</strong>
                                <span>{cert.issuer}</span>
                            </div>
                            <div className="text-gray-600">{cert.date}</div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default CertificationsPreview
