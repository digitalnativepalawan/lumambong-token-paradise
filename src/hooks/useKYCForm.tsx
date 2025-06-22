
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseKYCFormProps {
  user: any;
  unit?: any;
  onComplete: () => void;
  onClose: () => void;
}

export const useKYCForm = ({ user, unit, onComplete, onClose }: UseKYCFormProps) => {
  const [nationality, setNationality] = useState('');
  const [document, setDocument] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleFileChange = (file: File | null) => {
    if (file && !validateFile(file)) {
      return;
    }
    setDocument(file);
  };

  const validateForm = (): boolean => {
    if (!nationality || !document || !fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload a document",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const uploadDocument = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${unit?.id || 'general'}_kyc_${Date.now()}.${fileExt}`;
    
    const { data: fileData, error: uploadError } = await supabase.storage
      .from('kyc-docs')
      .upload(fileName, file);

    if (uploadError) throw uploadError;
    return fileName;
  };

  const updateUserProfile = async () => {
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        nationality: nationality,
        kyc_verified: false, // Admin needs to review
        updated_at: new Date().toISOString()
      });

    if (profileError) throw profileError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await uploadDocument(document!);
      await updateUserProfile();

      toast({
        title: "KYC Documents Submitted!",
        description: "Your documents have been uploaded for review. You'll be notified once verification is complete.",
      });

      onComplete();
      onClose();
    } catch (error) {
      console.error('Error submitting KYC:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit KYC documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = nationality && document && fullName && !isSubmitting;

  return {
    nationality,
    setNationality,
    document,
    handleFileChange,
    fullName,
    setFullName,
    isSubmitting,
    handleSubmit,
    isFormValid
  };
};
