import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LucideIcon, Award, BarChart2, Clock } from 'lucide-react';
import { fetchAssessmentResultAPI } from '@/api/assessmentAPI/assessmentAPI';
import Loader from '@/components/ui/Loader';

interface AssessmentResultProps {
  assessment: {
    assessmentId: string;
    createdAt: string;
    responses: any[];
    score: number;
    status: string;
    studentId: string;
    submittedDate: string;
    totalQuestions: number;
    timeAllowed: number;
    timeTaken: number;
  };
}

const AssessmentResult: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [assessment, setAssessment] = useState<AssessmentResultProps['assessment']>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssessmentResult = async () => {
      try {
        const response = await fetchAssessmentResultAPI(assessmentId!);
        console.log("Assessment result response: ", response);
        
        setAssessment(response?.data);
      } catch (error) {
        console.error('Failed to load assessment:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAssessmentResult();
  }, [assessmentId]);

  const handleGoBack = () => {
    navigate('/assessments');
  };

  const renderIcon = (Icon: LucideIcon, label: string) => (
    <div className="flex items-center">
      <Icon className="mr-2" size={20} />
      <span>{label}</span>
    </div>
  );

  if (loading) return <Loader />;
  if (!assessment) return <p>Assessment result not found.</p>;

  const { score, totalQuestions, timeAllowed, timeTaken } = assessment;

  return (
    <Card className="w-full max-w-xl mx-auto mt-12 bg-white border-gray-200">
      <CardHeader className="bg-blue-500 text-white p-6">
        <CardTitle>Assessment Result</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {renderIcon(Award, `Score: ${score}/${totalQuestions}`)}
              {renderIcon(BarChart2, `${((score / totalQuestions) * 100).toFixed(2)}%`)}
            </div>
            <Progress value={(score / totalQuestions) * 100} className="w-1/2" />
          </div>

          <div className="flex items-center justify-between">
            {renderIcon(Clock, `Time Taken: ${timeTaken} mins`)}
            {renderIcon(Clock, `Time Allowed: ${timeAllowed} mins`)}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleGoBack}>Go Back</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentResult;