import React, { useEffect, useState } from 'react';
import { Clock, Book, CheckCircle, ArrowRight, Plus, Calendar } from 'lucide-react';
import { fetchAssessmentByTutorAPI } from '@/api/assessmentAPI/assessmentAPI';

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  createdAt: string;
  courseTitle: string;
  studentsCompleted: number;
  totalStudents: number;
  averageScore?: number;
}

const TutorAssessmentList:React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  useEffect(() => {
    const loadAssessmentList = async () => {
      try {
        const tutorAssessments = await fetchAssessmentByTutorAPI();
        console.log("tutorAssessments: ", tutorAssessments?.data);
        
        setAssessments(tutorAssessments?.data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };
    
    loadAssessmentList();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Assessments</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your course assessments</p>
        </div>
        
        <div className="flex gap-4">
            {/* <select className="bg-white border border-gray-300 rounded-md px-4 py-2">
                <option value="all">All Courses</option>
                <option value="javascript">Advanced JavaScript</option>
                <option value="react">React Masterclass</option>
            </select> */}
            
            <a href='/tutor/create-assessment'>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assessment
                </button>
            </a>
        </div>
      </div>

      <div className="grid gap-6">
        {assessments.map((assessment: any) => (
          <div
            key={assessment.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">
                  Course: {assessment.courseId.title}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {assessment.title}
                </h2>
                <p className="text-gray-600">{assessment.description}</p>
              </div>
              {/* <div className="flex items-center gap-4">
                <button className="text-blue-600 hover:text-blue-700">
                  Edit
                </button>
                <button className="text-gray-600 hover:text-gray-700">
                  Delete
                </button>
              </div> */}
            </div>

            <div className="mt-6 grid grid-cols-4 gap-4">
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
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Created: {new Date(assessment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>
                    {assessment.studentsCompleted}/{assessment.totalStudents} completed
                  </span>
                </div> */}
                {assessment.averageScore && (
                  <div className="text-gray-600">
                    Average Score: <span className="font-medium">{assessment.averageScore}%</span>
                  </div>
                )}
              </div>
              
              {/* <div className="flex gap-3">
                <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  View Responses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorAssessmentList;