import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const SubmissionFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/assessment-list');
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-12 bg-red-50 border-red-400">
        <CardHeader className="bg-red-600 text-white p-6">
            <div className="flex items-center justify-center">
                <XCircle className="mr-4" size={32} />
                <CardTitle>Assessment Not Passed</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
                <p className="text-center text-red-600 font-medium">
                    You did not meet the passing criteria for this assessment.
                </p>
                <p className="text-center">
                    You can review the assessment materials and try again.
                </p>
            </div>
            <div className="mt-6 flex justify-center">
                <Button onClick={handleGoBack}>
                    Back to Assessments
                </Button>
            </div>
        </CardContent>
    </Card>
  );
};

export default SubmissionFailed;