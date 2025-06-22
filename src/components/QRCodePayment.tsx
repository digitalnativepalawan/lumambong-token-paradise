
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface QRCodePaymentProps {
  amount: number;
  referenceCode?: string;
  paymentMethod?: string;
  onPaymentComplete?: () => void;
}

const QRCodePayment = ({ amount, referenceCode = 'REF-' + Date.now(), paymentMethod = 'crypto', onPaymentComplete }: QRCodePaymentProps) => {
  const getPaymentMethodInfo = () => {
    switch (paymentMethod) {
      case 'gcash':
        return {
          name: 'GCash',
          color: 'bg-blue-600',
          instructions: 'Open your GCash app and scan the QR code'
        };
      case 'paymaya':
        return {
          name: 'PayMaya',
          color: 'bg-green-600',
          instructions: 'Open your PayMaya app and scan the QR code'
        };
      case 'coins_ph':
        return {
          name: 'Coins.ph',
          color: 'bg-orange-600',
          instructions: 'Open your Coins.ph app and scan the QR code'
        };
      default:
        return {
          name: 'Crypto Payment',
          color: 'bg-gray-600',
          instructions: 'Scan the QR code with your crypto wallet'
        };
    }
  };

  const paymentInfo = getPaymentMethodInfo();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge className={`${paymentInfo.color} text-white`}>
            {paymentInfo.name}
          </Badge>
        </div>
        <CardTitle>Scan to Pay</CardTitle>
        <p className="text-2xl font-bold text-emerald-600">
          ${amount.toLocaleString()} USD
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
            <img 
              src="/lovable-uploads/d2c11454-3569-4892-b9b9-561db319c843.png" 
              alt="Binga Beach Payment QR Code"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              {paymentInfo.instructions}
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Reference Code:</p>
              <p className="font-mono text-sm font-semibold">{referenceCode}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Payment Instructions:</h4>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Open your {paymentInfo.name} app</li>
              <li>2. Tap "Scan QR" or "Pay QR"</li>
              <li>3. Point your camera at the QR code above</li>
              <li>4. Enter the amount: ${amount.toLocaleString()} USD</li>
              <li>5. Add reference code: {referenceCode}</li>
              <li>6. Complete the payment</li>
            </ol>
          </div>

          {onPaymentComplete && (
            <Button 
              onClick={onPaymentComplete}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              I've Completed Payment
            </Button>
          )}

          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-xs text-amber-800">
              <strong>Important:</strong> Please save the reference code for your records. 
              Payment confirmation may take 5-10 minutes to process. Make sure to include the reference code in your payment.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodePayment;
