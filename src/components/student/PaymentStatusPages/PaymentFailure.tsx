import { XCircle, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PaymentFailure = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Failed
          </h1>
          
          <p className="text-gray-600 mb-6">
            We're sorry, but your payment could not be processed. Please try again or contact support.
          </p>
          
          <div className="text-left w-full bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Error Code: <span className="font-medium">ERR_PAYMENT_DECLINED</span>
            </p>
            <p className="text-sm text-gray-600">
              Please check your payment details and ensure you have sufficient funds.
            </p>
          </div>
          
          <div className="flex gap-4 w-full">
            <Button 
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            
            <Button 
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailure;