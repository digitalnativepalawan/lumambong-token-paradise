
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { useKYCForm } from '@/hooks/useKYCForm';
import DocumentUpload from '@/components/kyc/DocumentUpload';
import NationalitySelector from '@/components/kyc/NationalitySelector';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  unit?: any;
  user: any;
}

const KYCModal = ({ isOpen, onClose, onComplete, unit, user }: KYCModalProps) => {
  const {
    nationality,
    setNationality,
    document,
    handleFileChange,
    fullName,
    setFullName,
    isSubmitting,
    handleSubmit,
    isFormValid
  } = useKYCForm({ user, unit, onComplete, onClose });

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

          <NationalitySelector 
            nationality={nationality}
            onNationalityChange={setNationality}
          />

          <DocumentUpload
            nationality={nationality}
            document={document}
            onFileChange={handleFileChange}
          />

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
              disabled={!isFormValid}
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
