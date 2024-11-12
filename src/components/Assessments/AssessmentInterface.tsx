import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Timer, CheckCircle } from 'lucide-react';
import { fetchAssessmentByIdAPI, submitAssessmentAPI } from '@/api/assessmentAPI/assessmentAPI';
import toast from 'react-hot-toast';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctOption: number;
}

interface AssessmentData {
  _id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  passingScore: number;
}

const AssessmentInterface: React.FC = () => {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const { assessmentId } = useParams<{ assessmentId: string }>();

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const response = await fetchAssessmentByIdAPI(assessmentId!);
        setAssessment(response?.data);
        setTimeLeft(response?.data.duration * 60);
      } catch (error) {
        setError('Failed to load assessment');
      }
    };

    loadAssessment();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
    console.log("selectedAnswers: ", selectedAnswers);
    
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isAllQuestionsAnswered = (): boolean => {
    return assessment?.questions.every((q) => selectedAnswers[q._id] !== undefined) ?? false;
  };

  const handleSubmit = async () => {
    if (!assessment || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await submitAssessmentAPI(assessment._id, selectedAnswers);
      if(response?.status === 200) {
        const { data } = response;
        toast.success("Assessment submitted successfully!");
        navigate('/assessment-complete', { state: { assessment: data } });
      } else {
        toast.error("Failed to submit assessment. Please try again!")
      } 
    } catch (error) {
      setError('Failed to submit assessment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!assessment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{assessment.title}</h1>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span className="font-mono text-xl">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-2">{assessment.description}</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {assessment.questions.map((question, questionIndex) => (
          <Card key={question._id} className="w-full">
            <CardContent className="p-6">
              <div className="font-medium mb-4">
                {questionIndex + 1}. {question.question}
              </div>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      id={`${question._id}-${optionIndex}`}
                      name={question._id}
                      className="w-4 h-4"
                      checked={selectedAnswers[question._id] === optionIndex}
                      onChange={() => handleOptionSelect(question._id, optionIndex)}
                    />
                    <label
                      htmlFor={`${question._id}-${optionIndex}`}
                      className="flex-grow p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 bg-white p-4 shadow-lg rounded-t-lg">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle className={`w-5 h-5 ${isAllQuestionsAnswered() ? 'text-green-500' : 'text-gray-300'}`} />
            <span>{isAllQuestionsAnswered() ? 'All questions answered' : 'Answer all questions to continue'}</span>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!isAllQuestionsAnswered() || isSubmitting}
            className="px-6"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentInterface;