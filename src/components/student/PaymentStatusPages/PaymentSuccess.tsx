import { Check, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
          
          <div className="flex gap-4 w-full">  
            <Button 
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;