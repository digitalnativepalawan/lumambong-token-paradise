
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CreditCard, DollarSign, Percent } from 'lucide-react';
import QRCodePayment from './QRCodePayment';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUnit: any;
}

const PaymentModal = ({ isOpen, onClose, selectedUnit }: PaymentModalProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentType, setInvestmentType] = useState<'percentage' | 'amount'>('amount');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'bank' | 'gcash'>('crypto');
  const [nationality, setNationality] = useState<'ph' | 'foreign'>('ph');
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Mock transaction for frontend
      const mockTransaction = {
        unit_id: selectedUnit?.id || 'unit-1',
        investment_amount_usd: parseFloat(investmentAmount),
        payment_method: paymentMethod,
        nationality,
        status: 'pending'
      };

      console.log('Mock transaction created:', mockTransaction);

      if (paymentMethod === 'crypto') {
        setShowQR(true);
      } else {
        toast({
          title: "Investment Submitted",
          description: `Your ${paymentMethod} payment of $${investmentAmount} has been submitted for processing.`,
        });
        onClose();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const maxPercentage = nationality === 'ph' ? 60 : 40;
  const unitPrice = selectedUnit?.price_usd || 450000;

  if (showQR) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
          </DialogHeader>
          <QRCodePayment
            amount={parseFloat(investmentAmount)}
            onPaymentComplete={() => {
              toast({
                title: "Payment Confirmed",
                description: "Your cryptocurrency payment has been received and is being processed.",
              });
              onClose();
              setShowQR(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Invest in {selectedUnit?.name || 'Selected Unit'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Select value={nationality} onValueChange={(value: 'ph' | 'foreign') => setNationality(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ph">🇵🇭 Filipino</SelectItem>
                    <SelectItem value="foreign">🌍 Foreign</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 mt-1">
                  Max ownership: {maxPercentage}% for {nationality === 'ph' ? 'Filipino' : 'foreign'} investors
                </p>
              </div>

              <div>
                <Label>Investment Type</Label>
                <RadioGroup value={investmentType} onValueChange={(value: 'percentage' | 'amount') => setInvestmentType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amount" id="amount" />
                    <Label htmlFor="amount" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Fixed Amount
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage" className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Percentage of Unit
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="investment-amount">
                  {investmentType === 'percentage' ? 'Percentage (%)' : 'Investment Amount (USD)'}
                </Label>
                <Input
                  id="investment-amount"
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder={investmentType === 'percentage' ? '10' : '45000'}
                  required
                  min="1"
                  max={investmentType === 'percentage' ? maxPercentage : unitPrice}
                />
                {investmentType === 'percentage' && investmentAmount && (
                  <p className="text-sm text-gray-600 mt-1">
                    Equivalent to: ${((parseFloat(investmentAmount) / 100) * unitPrice).toLocaleString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(value: 'crypto' | 'bank' | 'gcash') => setPaymentMethod(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Cryptocurrency (USDT/BTC/ETH)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Bank Transfer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gcash" id="gcash" />
                  <Label htmlFor="gcash" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    GCash
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing || !investmentAmount} className="flex-1">
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
