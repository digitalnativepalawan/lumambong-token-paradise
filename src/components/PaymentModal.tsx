
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CreditCard, Smartphone, DollarSign, X } from 'lucide-react';
import KYCModal from './KYCModal';
import QRCodePayment from './QRCodePayment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUnit?: any;
}

const PaymentModal = ({ isOpen, onClose, selectedUnit }: PaymentModalProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [investorPhone, setInvestorPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [showKYC, setShowKYC] = useState(false);
  const [showQRPayment, setShowQRPayment] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { user, userProfile, isKYCVerified } = useAuth();

  const generateReferenceCode = () => {
    return `LXL${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
  };

  const handleKYCComplete = () => {
    setShowKYC(false);
    toast({
      title: "KYC Submitted",
      description: "Your documents have been submitted for review. You can proceed with payment.",
    });
  };

  const handlePaymentSubmit = async () => {
    if (!investmentAmount || !investorName || !investorEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if KYC is required (for amounts over $1000 or if user profile indicates it)
    const amount = parseFloat(investmentAmount);
    if (amount > 1000 && !isKYCVerified) {
      setShowKYC(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const refCode = generateReferenceCode();
      setReferenceCode(refCode);

      // Create transaction record
      const { error } = await supabase
        .from('transactions')
        .insert({
          unit_id: selectedUnit?.id || 'general',
          amount_usd: amount,
          payment_method: paymentMethod,
          reference_code: refCode,
          investor_name: investorName,
          investor_email: investorEmail,
          investor_phone: investorPhone || null,
          status: 'pending',
          notes: `Investment in ${selectedUnit?.name || 'Luxe Lumambong unit'}`
        });

      if (error) throw error;

      toast({
        title: "Payment Initiated",
        description: `Transaction ${refCode} has been created. Please complete the payment.`,
      });

      setShowQRPayment(true);
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Payment Failed",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setInvestmentAmount('');
    setInvestorName('');
    setInvestorEmail('');
    setInvestorPhone('');
    setPaymentMethod('gcash');
    setShowQRPayment(false);
    setReferenceCode('');
    setShowKYC(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (showQRPayment) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Complete Your Payment</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <QRCodePayment
            amount={parseFloat(investmentAmount)}
            referenceCode={referenceCode}
            paymentMethod={paymentMethod}
          />
          
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowQRPayment(false)}
              className="flex-1"
            >
              Back to Form
            </Button>
            <Button 
              onClick={handleClose}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedUnit ? `Invest in ${selectedUnit.name}` : 'Investment Opportunity'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Investment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Investment Amount
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Investment Amount (USD) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min="100"
                    step="100"
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimum investment: $100 USD</p>
                </div>

                <div>
                  <Label htmlFor="investor-name">Full Name *</Label>
                  <Input
                    id="investor-name"
                    placeholder="Enter your full name"
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="investor-email">Email Address *</Label>
                  <Input
                    id="investor-email"
                    type="email"
                    placeholder="Enter your email"
                    value={investorEmail}
                    onChange={(e) => setInvestorEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="investor-phone">Phone Number (Optional)</Label>
                  <Input
                    id="investor-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={investorPhone}
                    onChange={(e) => setInvestorPhone(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="gcash">GCash</TabsTrigger>
                    <TabsTrigger value="paymaya">PayMaya</TabsTrigger>
                    <TabsTrigger value="coins_ph">Coins.ph</TabsTrigger>
                  </TabsList>

                  <TabsContent value="gcash" className="mt-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <Smartphone className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">GCash QR Payment</h4>
                        <p className="text-sm text-gray-600">
                          Pay instantly using your GCash mobile app
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="paymaya" className="mt-4">
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <Smartphone className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">PayMaya QR Payment</h4>
                        <p className="text-sm text-gray-600">
                          Pay instantly using your PayMaya mobile app
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="coins_ph" className="mt-4">
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <Smartphone className="w-8 h-8 text-orange-600" />
                      <div>
                        <h4 className="font-medium">Coins.ph QR Payment</h4>
                        <p className="text-sm text-gray-600">
                          Pay instantly using your Coins.ph mobile app
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* KYC Notice */}
            {parseFloat(investmentAmount) > 1000 && !isKYCVerified && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <p className="text-sm text-amber-800">
                    <strong>KYC Required:</strong> Investments over $1,000 USD require identity verification. 
                    You'll be prompted to upload your documents before payment.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handlePaymentSubmit}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={isSubmitting || !investmentAmount || !investorName || !investorEmail}
              >
                {isSubmitting ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* KYC Modal */}
      <KYCModal
        isOpen={showKYC}
        onClose={() => setShowKYC(false)}
        onComplete={handleKYCComplete}
        unit={selectedUnit}
        user={user}
      />
    </>
  );
};

export default PaymentModal;
