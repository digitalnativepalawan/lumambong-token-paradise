import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Smartphone, CreditCard, QrCode, Shield, AlertTriangle } from 'lucide-react';
import KYCModal from './KYCModal';
import { useAuth } from '@/hooks/useAuth';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUnit?: any;
}

const PaymentModal = ({ isOpen, onClose, selectedUnit }: PaymentModalProps) => {
  const { user, userProfile, isKYCVerified } = useAuth();
  const [showKYC, setShowKYC] = useState(false);
  const [formData, setFormData] = useState({
    investor_name: '',
    investor_email: '',
    investor_phone: '',
    amount: selectedUnit?.token_price_usd || 450,
    percentage: 1.0
  });
  const [paymentMethod, setPaymentMethod] = useState<'qr_ph' | 'credit_card' | 'coins_ph'>('qr_ph');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const generateReferenceCode = () => {
    const unitNumber = selectedUnit?.id?.slice(-1) || '1';
    const timestamp = Date.now().toString().slice(-6);
    return `INVEST-${unitNumber}-${timestamp}`;
  };

  const handleKYCComplete = () => {
    setShowKYC(false);
    toast({
      title: "KYC Submitted",
      description: "Your documents are being reviewed. You can proceed with payment setup.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make an investment.",
        variant: "destructive"
      });
      return;
    }

    if (!isKYCVerified) {
      setShowKYC(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const referenceCode = generateReferenceCode();
      
      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          unit_id: selectedUnit?.id || 'default',
          amount_usd: formData.amount,
          payment_method: paymentMethod,
          reference_code: referenceCode,
          investor_name: formData.investor_name,
          investor_email: formData.investor_email,
          investor_phone: formData.investor_phone,
          status: 'pending',
          notes: `Payment initiated via ${paymentMethod.replace('_', ' ').toUpperCase()}`
        });

      if (transactionError) throw transactionError;

      // Create investor record (this will check ownership quotas)
      const { error: investorError } = await supabase
        .from('investors')
        .insert({
          user_id: user.id,
          unit_id: selectedUnit?.id || 'default',
          percentage: formData.percentage,
          nationality: userProfile?.nationality || 'ph',
          investment_amount_usd: formData.amount
        });

      if (investorError) throw investorError;

      toast({
        title: "Investment Initiated!",
        description: `Reference: ${referenceCode}. You will be contacted shortly to complete the payment.`,
      });

      // Reset form and close modal
      setFormData({
        investor_name: '',
        investor_email: '',
        investor_phone: '',
        amount: selectedUnit?.token_price_usd || 450,
        percentage: 1.0
      });
      onClose();
    } catch (error: any) {
      console.error('Error creating investment:', error);
      
      let errorMessage = "Failed to initiate investment. Please try again.";
      
      if (error.message?.includes('quota exceeded')) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="w-6 h-6 text-emerald-600" />
              Invest in {selectedUnit?.name || 'Luxe Lumambong'}
            </DialogTitle>
          </DialogHeader>

          {!user && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Authentication Required</p>
                  <p className="text-sm text-red-600">Please log in to make an investment.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {user && !isKYCVerified && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4 flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-600" />
                <div className="flex-1">
                  <p className="font-medium text-amber-800">KYC Verification Required</p>
                  <p className="text-sm text-amber-600">Complete identity verification to proceed with investment.</p>
                </div>
                <Button 
                  onClick={() => setShowKYC(true)}
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Verify Now
                </Button>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Investor Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="investor_name">Full Name *</Label>
                <Input
                  id="investor_name"
                  value={formData.investor_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, investor_name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                  disabled={!user || !isKYCVerified}
                />
              </div>
              <div>
                <Label htmlFor="investor_email">Email Address *</Label>
                <Input
                  id="investor_email"
                  type="email"
                  value={formData.investor_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, investor_email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  disabled={!user || !isKYCVerified}
                />
              </div>
              <div>
                <Label htmlFor="investor_phone">Phone Number *</Label>
                <Input
                  id="investor_phone"
                  value={formData.investor_phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, investor_phone: e.target.value }))}
                  placeholder="+63 9xx xxx xxxx"
                  required
                  disabled={!user || !isKYCVerified}
                />
              </div>
              <div>
                <Label htmlFor="percentage">Ownership Percentage *</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={formData.percentage}
                  onChange={(e) => {
                    const percentage = Number(e.target.value);
                    setFormData(prev => ({ 
                      ...prev, 
                      percentage,
                      amount: percentage * (selectedUnit?.token_price_usd || 450)
                    }));
                  }}
                  placeholder="1.0"
                  required
                  disabled={!user || !isKYCVerified}
                />
              </div>
              <div>
                <Label htmlFor="amount">Investment Amount (USD) *</Label>
                <Input
                  id="amount"
                  type="number"
                  min="450"
                  step="450"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  placeholder="450"
                  required
                  disabled={!user || !isKYCVerified}
                />
              </div>
            </div>

            {/* Payment Methods */}
            {user && isKYCVerified && (
              <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="qr_ph" className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    QR Ph
                  </TabsTrigger>
                  <TabsTrigger value="credit_card" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Credit Card
                  </TabsTrigger>
                  <TabsTrigger value="coins_ph" className="flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Coins.ph
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="qr_ph">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        Pay via QR Ph (GCash/PayMaya)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">QR Code will be provided</p>
                            <p className="text-xs text-gray-400">after form submission</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Scan the QR code with your GCash or PayMaya app
                      </p>
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-emerald-800">
                          Reference: INVEST-{selectedUnit?.id?.slice(-1) || '1'}-XXXXXX
                        </p>
                        <p className="text-xs text-emerald-600 mt-1">
                          Use this reference when making payment
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="credit_card">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                        Credit Card Payment (Handheld Terminal)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Manual Process:</h4>
                        <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
                          <li>Submit this form to register your investment intent</li>
                          <li>Our team will contact you to arrange payment</li>
                          <li>Payment will be processed using our handheld terminal</li>
                          <li>You can tap/swipe/dip your card when we meet</li>
                          <li>Transaction will be marked as paid in our system</li>
                        </ol>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm text-amber-800">
                          <strong>Note:</strong> Credit card payments require in-person processing. 
                          We'll coordinate a meeting location convenient for you.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="coins_ph">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-yellow-600" />
                        Coins.ph Payment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          Coins.ph payment details will be provided after form submission.
                          You'll receive instructions via email on how to complete the payment.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={isSubmitting || !user || !isKYCVerified}
              >
                {isSubmitting ? 'Processing...' : 'Initiate Investment'}
              </Button>
            </div>

            {/* Legal Disclaimer */}
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
              <p>
                By submitting this form, you acknowledge that this is an investment opportunity 
                subject to Philippine property law and foreign ownership regulations. 
                Your information will be used to process your investment and contact you regarding payment completion.
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
