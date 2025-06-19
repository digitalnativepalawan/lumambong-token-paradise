
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QRCodePaymentProps {
  amount: number;
  referenceCode: string;
  paymentMethod: string;
}

const QRCodePayment = ({ amount, referenceCode, paymentMethod }: QRCodePaymentProps) => {
  // Generate QR code data based on payment method
  const generateQRData = () => {
    const baseData = {
      amount: amount,
      reference: referenceCode,
      merchant: "Luxe Lumambong Investment"
    };

    switch (paymentMethod) {
      case 'gcash':
        return `gcash://pay?amount=${amount}&reference=${referenceCode}&merchant=LuxeLumambong`;
      case 'paymaya':
        return `paymaya://pay?amount=${amount}&reference=${referenceCode}&merchant=LuxeLumambong`;
      case 'coins_ph':
        return `coins://pay?amount=${amount}&reference=${referenceCode}&merchant=LuxeLumambong`;
      default:
        return JSON.stringify(baseData);
    }
  };

  const qrData = generateQRData();

  // For demo purposes, we'll show a placeholder QR code
  // In production, you'd use a QR code library like qrcode.js
  const QRCodePlaceholder = () => (
    <div className="w-64 h-64 bg-white border-2 border-gray-300 flex items-center justify-center mx-auto">
      <div className="text-center p-4">
        <div className="grid grid-cols-8 gap-1 mb-4">
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-600">QR Code</p>
        <p className="text-xs text-gray-500 mt-1">
          Scan with your {paymentMethod.replace('_', ' ').toUpperCase()} app
        </p>
      </div>
    </div>
  );

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
          name: 'QR Payment',
          color: 'bg-gray-600',
          instructions: 'Scan the QR code with your payment app'
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
        <QRCodePlaceholder />
        
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
              <li>1. Open your {paymentInfo.name} mobile app</li>
              <li>2. Tap "Scan QR" or "Pay QR"</li>
              <li>3. Point your camera at the QR code above</li>
              <li>4. Confirm the amount and reference code</li>
              <li>5. Complete the payment</li>
            </ol>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-xs text-amber-800">
              <strong>Important:</strong> Please save the reference code for your records. 
              Payment confirmation may take 5-10 minutes to process.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodePayment;
