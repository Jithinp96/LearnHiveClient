import React, { useEffect, useState } from 'react';
import { Clock, Book, CheckCircle, ArrowRight } from 'lucide-react';
import { fetchAssessmentForStudentAPI } from '@/api/assessmentAPI/assessmentAPI';
import { useNavigate } from 'react-router-dom';

interface CourseId {
    title: string
}

interface Assessment {
  _id: string;
  title: string;
  courseId: CourseId;
  description: string;
  duration: number;
  questions: [];
  passingScore: number;
  status: 'not-started' | 'completed' | 'in-progress';
  dueDate?: string;
}

const AssessmentCard: React.FC<{ 
  assessment: Assessment, 
  onButtonClick: (assessment: Assessment) => void 
}> = ({ assessment, onButtonClick }) => {
  const getStatusColor = (status: Assessment['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: Assessment['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <div
      key={assessment._id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-gray-500">Course: {assessment.courseId.title}</p>
          <h2 className="text-xl font-semibold text-gray-900">
            {assessment.title}
          </h2>
          <p className="text-gray-600">{assessment.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            assessment.status
          )}`}
        >
          {getStatusText(assessment.status)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          <span>{assessment.duration} mins</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Book className="w-5 h-5 mr-2" />
          <span>{assessment.questions.length} questions</span>
        </div>
        <div className="flex items-center text-gray-600">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>Pass: {assessment.passingScore}%</span>
        </div>
      </div>

      {assessment.dueDate && (
        <div className="mt-4 text-sm text-gray-500">
          Due by: {new Date(assessment.dueDate).toLocaleDateString()}
        </div>
      )}

      <button
        onClick={() => onButtonClick(assessment)}
        className="mt-4 w-full flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {assessment.status === 'completed' ? 'View Results' : 'Start Assessment'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

const StudentAssessmentList: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAssessmentList = async () => {
      try {
        const studentAssessments = await fetchAssessmentForStudentAPI();
        console.log("studentAssessments: ", studentAssessments?.data);
        
        setAssessments(studentAssessments?.data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };
    
    loadAssessmentList();
  }, []);

  const handleButtonClick = (assessment: Assessment) => {
    if (assessment.status === 'completed') {
      navigate(`/results/${assessment._id}`);
    } else {
      navigate(`/assessment-guidelines/${assessment._id}`);
    }
  };

  // Filter assessments based on active tab
  const filteredAssessments = assessments.filter(assessment => 
    activeTab === 'pending' 
      ? assessment.status !== 'completed' 
      : assessment.status === 'completed'
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
        <div className="bg-gray-100 rounded-md p-1 flex">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'pending' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pending Assessments
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'completed' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Completed Assessments
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAssessments.length > 0 ? (
          filteredAssessments.map((assessment) => (
            <AssessmentCard 
              key={assessment._id} 
              assessment={assessment} 
              onButtonClick={handleButtonClick} 
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            {activeTab === 'pending' 
              ? 'No pending assessments available.' 
              : 'No completed assessments yet.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssessmentList;