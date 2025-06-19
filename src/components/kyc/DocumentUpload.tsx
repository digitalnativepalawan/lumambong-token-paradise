
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, FileText } from 'lucide-react';

interface DocumentUploadProps {
  nationality: string;
  document: File | null;
  onFileChange: (file: File | null) => void;
}

const DocumentUpload = ({ nationality, document, onFileChange }: DocumentUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  const getDocumentLabel = () => {
    if (nationality === 'ph') {
      return "Upload Philippine ID (Passport, Driver's License, or UMID)";
    } else if (nationality === 'foreign') {
      return "Upload Passport";
    }
    return "Upload Identity Document";
  };

  if (!nationality) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {getDocumentLabel()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          
          {nationality === 'ph' && (
            <p className="text-xs text-gray-500">
              Accepted: Passport, Driver's License, UMID, or other government-issued ID
            </p>
          )}
          
          {nationality === 'foreign' && (
            <p className="text-xs text-gray-500">
              Foreign nationals must provide a valid passport
            </p>
          )}

          {document && (
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
              <Upload className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">{document.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
