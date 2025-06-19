
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, Shield } from 'lucide-react';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  unit?: any;
  user: any;
}

const KYCModal = ({ isOpen, onClose, onComplete, unit, user }: KYCModalProps) => {
  const [nationality, setNationality] = useState('');
  const [document, setDocument] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setDocument(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationality || !document || !fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload a document",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload document to Supabase storage
      const fileExt = document.name.split('.').pop();
      const fileName = `${user.id}/${unit?.id || 'general'}_kyc_${Date.now()}.${fileExt}`;
      
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('kyc-docs')
        .upload(fileName, document);

      if (uploadError) throw uploadError;

      // Update or insert user profile
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

  const getDocumentLabel = () => {
    if (nationality === 'ph') {
      return "Upload Philippine ID (Passport, Driver's License, or UMID)";
    } else if (nationality === 'foreign') {
      return "Upload Passport";
    }
    return "Upload Identity Document";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Verify Your Identity
          </DialogTitle>
          {unit && (
            <p className="text-sm text-gray-600">
              For investment in {unit.name}
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full legal name"
              required
            />
          </div>

          <div>
            <Label htmlFor="nationality">Nationality *</Label>
            <select
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Nationality</option>
              <option value="ph">🇵🇭 Filipino</option>
              <option value="foreign">🌍 Foreign National</option>
            </select>
          </div>

          {nationality && (
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
          )}

          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-xs text-amber-800">
              <strong>Important:</strong> Your documents will be reviewed by our compliance team. 
              KYC verification is required for all investments per Philippine regulations.
            </p>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!nationality || !document || !fullName || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Verification'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KYCModal;
