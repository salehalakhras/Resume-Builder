
import { useSelector } from 'react-redux';
import PreviewSection from '../PreviewSection'
import { generatePDF } from '../generatePDF';

const Customization = () => {
  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const doc = generatePDF(resume)

  return (
    <div>
            <div className="flex flex-col lg:flex-row gap-8 p-6 bg-slate-200 dark:bg-slate-900">
            <div className="w-full lg:w-1/2 space-y-6">
            </div>
            <button onClick={() => doc.save(`${resume.name}.pdf`)}>
              DD
            </button>
            <PreviewSection></PreviewSection>
            </div>

    </div>
  )
}

export default Customization
