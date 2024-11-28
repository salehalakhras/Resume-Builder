import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Certification } from '../types';

const CertificationForm = ({ certifications, setCertifications } : { certifications: Certification[], setCertifications: React.Dispatch<React.SetStateAction<Certification[]>> }) => {

    const addCertification = () => {
        setCertifications([...certifications, { id: Date.now(), name: '', issuer: '', date: '', expiryDate: '' }]);
      };
    
      const updateCertification = (id: number, field: keyof Certification, value: string) => {
        setCertifications(
          certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
        );
      };
    
      const removeCertification = (id: number) => {
        setCertifications(certifications.filter((cert) => cert.id !== id));
      }

  return (
    <Card className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Certifications</h2>
      <Button
        onClick={addCertification}
        size="sm"
        className="font-bold"
      >
        <Plus className="w-4 h-4 mr-2" /> Add Certification
      </Button>
    </div>
    {certifications.map((cert) => (
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
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Issue Date"
            type="date"
            value={cert.date}
            onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
          />
          <Input
            placeholder="Expiry Date (optional)"
            type="date"
            value={cert.expiryDate}
            onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
          />
        </div>
      </div>
    ))}
  </Card>
  )
}

export default CertificationForm
