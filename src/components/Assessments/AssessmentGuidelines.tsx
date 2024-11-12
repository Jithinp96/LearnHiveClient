import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Book, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { fetchAssessmentByIdAPI } from '@/api/assessmentAPI/assessmentAPI';

interface Assessment {
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
}

const AssessmentGuidelines: React.FC = () => {
    const navigate = useNavigate();
    const { assessmentId } = useParams<{ assessmentId: string }>();
    const [assessment, setAssessment] = useState<Assessment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAssessment = async () => {
            try {
                const response = await fetchAssessmentByIdAPI(assessmentId!);
                setAssessment(response?.data);
            } catch (error) {
                console.error('Failed to load assessment:', error);
                setError('Failed to load assessment');
            } finally {
                setLoading(false);
            }
        };
        
        loadAssessment();
    }, [assessmentId]);

    if (loading) return <p>Loading assessment details...</p>;
    if (error) return <p>{error}</p>;
    if (!assessment) return <p>Assessment not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{assessment.title}</h1>
                        <p className="text-gray-600 mt-2">{assessment.description}</p>
                    </div>
                    <AlertCircle className="w-12 h-12 text-yellow-500" />
                </div>

                <div className="mt-8 grid grid-cols-3 gap-6">
                    <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{assessment.duration} minutes</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Book className="w-5 h-5 mr-2" />
                        <span>{assessment.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Pass: {assessment.passingScore}%</span>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    {/* Instructions */}
                    <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-900">Time Limit</h3>
                            <p className="text-gray-600">
                                You have {assessment.duration} minutes to complete this assessment. The timer will start as soon as you begin.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-900">Passing Score</h3>
                            <p className="text-gray-600">
                                You need to score at least {assessment.passingScore}% to pass this assessment.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-900">Question Navigation</h3>
                            <p className="text-gray-600">
                                You can navigate between questions, review, and change your answers before submitting.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-900">Attempt Limit</h3>
                            <p className="text-gray-600">
                                You have 1 attempt to complete this assessment. Your score will be final.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Start Assessment Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={() => navigate(`/start-assessment/${assessmentId}`)}
                        className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Start Assessment
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentGuidelines;