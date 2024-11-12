import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SubmissionSuccessProps {
  assessment: {
    score: number;
    _id: string;
  };
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ assessment }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/assessments');
  };

  const handleViewResult = () => {
    navigate(`/assessment-result/${assessment._id}`);
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-12 bg-green-50 border-green-400">
        <CardHeader className="bg-green-600 text-white p-6">
            <div className="flex items-center justify-center">
                <CheckCircle className="mr-4" size={32} />
                <CardTitle>Assessment Submitted Successfully</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
                <p>Your assessment has been successfully submitted.</p>
                <div className="text-center">
                    <p className="font-medium">Your score:</p>
                    <p className="text-green-600 font-bold text-2xl">{assessment.score}</p>
                </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
                <Button variant="secondary" onClick={handleGoBack}>
                    Go Back
                </Button>
                <Button onClick={handleViewResult}>View Result</Button>
            </div>
        </CardContent>
    </Card>
  );
};

export default SubmissionSuccess;