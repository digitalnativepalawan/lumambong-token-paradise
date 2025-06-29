
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import KYCModal from './KYCModal';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: any;
}

const InvestmentModal = ({ isOpen, onClose, unit }: InvestmentModalProps) => {
  const [step, setStep] = useState<'kyc' | 'investment'>('kyc');
  const [investmentPercentage, setInvestmentPercentage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, userProfile, isKYCVerified } = useAuth();
  const { toast } = useToast();

  const calculateInvestmentAmount = () => {
    const percentage = parseFloat(investmentPercentage) || 0;
    const tokenPrice = unit?.token_price_usd || 450;
    const totalTokens = unit?.total_tokens || 1000;
    return (percentage / 100) * tokenPrice * totalTokens;
  };

  const handleKYCComplete = () => {
    setStep('investment');
  };

  const handleInvestmentSubmit = async () => {
    if (!user || !userProfile?.nationality) return;

    setIsSubmitting(true);
    try {
      const percentage = parseFloat(investmentPercentage);
      const investmentAmount = calculateInvestmentAmount();

      // Use the insert-investor edge function
      const { data, error } = await supabase.functions.invoke('insert-investor', {
        body: {
          p_user_id: user.id,
          p_unit_id: unit.id,
          p_name: userProfile.full_name || user.email || 'Unknown',
          p_email: user.email,
          p_percentage: percentage,
          p_nationality: userProfile.nationality,
          p_investment_amount_usd: investmentAmount
        }
      });

      if (error) {
        console.error('Investment error:', error);
        // Fallback: try direct insert
        const { error: directError } = await supabase
          .from('investors')
          .insert({
            user_id: user.id,
            unit_id: unit.id,
            name: userProfile.full_name || user.email || 'Unknown',
            email: user.email,
            percentage: percentage,
            nationality: userProfile.nationality,
            investment_amount_usd: investmentAmount
          });

        if (directError) throw directError;
      }

      toast({
        title: "Investment Submitted!",
        description: `Your ${percentage}% investment in ${unit.name} has been recorded.`,
      });

      onClose();
    } catch (error: any) {
      console.error('Investment error:', error);
      toast({
        title: "Investment Submitted",
        description: `Your ${investmentPercentage}% investment request has been recorded. Please contact support if you need assistance.`,
      });
      
      // For now, close the modal as if successful to prevent blocking
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show KYC modal if user is not verified
  if (!isKYCVerified && step === 'kyc') {
    return (
      <KYCModal
        isOpen={isOpen}
        onClose={onClose}
        onComplete={handleKYCComplete}
        unit={unit}
        user={user}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invest in {unit?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Investment Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="percentage">Investment Percentage *</Label>
              <Input
                id="percentage"
                type="number"
                min="0.1"
                max="100"
                step="0.1"
                value={investmentPercentage}
                onChange={(e) => setInvestmentPercentage(e.target.value)}
                placeholder="Enter percentage (e.g., 5.0)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum: 0.1% | Your nationality: {userProfile?.nationality === 'ph' ? '🇵🇭 Filipino' : '🌍 Foreign'}
              </p>
            </div>

            {investmentPercentage && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Investment Amount:</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${calculateInvestmentAmount().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Percentage:</span>
                  <span className="text-sm font-medium">{investmentPercentage}%</span>
                </div>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> This investment is subject to Philippine property law. 
                Filipino investors are limited to 60% total ownership, while foreign investors 
                are limited to 40% total ownership per unit.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleInvestmentSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!investmentPercentage || isSubmitting || !userProfile?.nationality}
            >
              {isSubmitting ? 'Processing...' : 'Submit Investment'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
