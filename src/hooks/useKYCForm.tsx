
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface KYCFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: 'ph' | 'foreign';
  address: string;
  city: string;
  postalCode: string;
  country: string;
  idType: 'passport' | 'drivers_license' | 'national_id';
  idNumber: string;
  sourceOfFunds: string;
  investmentExperience: 'none' | 'limited' | 'moderate' | 'extensive';
  riskTolerance: 'low' | 'medium' | 'high';
}

export const useKYCForm = () => {
  const [formData, setFormData] = useState<KYCFormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: 'ph',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    idType: 'passport',
    idNumber: '',
    sourceOfFunds: '',
    investmentExperience: 'none',
    riskTolerance: 'medium',
  });

  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateFormData = (updates: Partial<KYCFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleDocumentUpload = (files: File[]) => {
    setUploadedDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const submitKYCForm = async () => {
    setIsSubmitting(true);
    
    try {
      // Mock KYC submission for frontend
      console.log('Mock KYC submission:', {
        formData,
        documents: uploadedDocuments.map(f => f.name)
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "KYC Submitted Successfully",
        description: "Your KYC application has been submitted and is under review.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting KYC:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your KYC. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateFormData,
    uploadedDocuments,
    handleDocumentUpload,
    removeDocument,
    submitKYCForm,
    isSubmitting,
  };
};
