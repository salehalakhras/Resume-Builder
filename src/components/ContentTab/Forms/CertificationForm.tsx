import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Certification, ResumeData } from '../../../types';
import { useSelector, useDispatch } from 'react-redux';

const CertificationForm = () => {

  const currentResume = useSelector((state: any) => state.resumes.currentResume);
  const resume = useSelector((state: any) => state.resumes.resumes[currentResume ?? 0]);
  const dispatch = useDispatch();

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
    };
    const updatedResume: ResumeData = {
      ...resume,
      certifications: [...resume.certifications, newCert],
    };
    dispatch({ type: 'resumes/updateResume', payload: updatedResume });
  };

  const removeCertification = (id: number) => {
    const updatedResume: ResumeData = {
      ...resume,
      certifications: resume.certifications.filter((cert: Certification) => cert.id !== id),
    };
    dispatch({ type: 'resumes/updateResume', payload: updatedResume });
  };

  const updateCertification = (id: number, field: string, value: string) => {
    const updatedResume: ResumeData = {
      ...resume,
      certifications: resume.certifications.map((cert: Certification) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    };
    dispatch({ type: 'resumes/updateResume', payload: updatedResume });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Button
          onClick={addCertification}
          size="sm"
          className="font-bold dark:bg-slate-200 dark:hover:bg-slate-300"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
      </div>
      {resume.certifications && resume.certifications.map((cert: Certification) => (
        <div key={cert.id} className="space-y-4 mb-6 p-4 border rounded">
          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeCertification(cert.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
          />
          <Input
            placeholder="Issuing Organization"
            value={cert.issuer}
            onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Issue Date (optional)"
              type="text"
              value={cert.date}
              onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
            <Input
              placeholder="Expiry Date (optional)"
              type="text"
              value={cert.expiryDate}
              onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
          </div>
        </div>
      ))}
    </Card>
  )
}

export default CertificationForm
