import React, { useEffect, useState } from 'react';
import { Plus, Trash2, GripVertical, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createAssessmentAPI } from '@/api/assessmentAPI/assessmentAPI';
import { fetchTutorCoursesAPI } from '@/api/tutorAPI/tutorAxios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';

interface Course {
  _id: string;
  title: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  marks: number;
}

const CreateAssessment = () => {
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: '',
    duration: 0,
    passingScore: 0,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);

  const { tutorInfo } = useSelector((state: RootState) => state.tutor);
  
  if(!tutorInfo) {
    toast.error("Unable to find details. Please login again!")
    return
  }

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const tutorCourses = await fetchTutorCoursesAPI(tutorInfo._id);
        setCourses(tutorCourses.data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };
    
    loadCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const assessmentData = {
        ...formData,
        questions: questions.map(q => ({
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
          marks: q.marks
        }))
      };

      const response = await createAssessmentAPI(assessmentData);
      if(response?.status===201) {
        toast.success("Assessment created successfuly!");
        navigate('/tutor/assessment');
      } else {
        toast.error("Failed to create assessment. Please try again!");
      }
    } catch (error) {
      console.error('Failed to create assessment:', error);
    }
  };

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      marks: 1,
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionId(newQuestion.id);
  };

  const updateQuestion = (questionId: string, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
    if (currentQuestionId === questionId) {
      setCurrentQuestionId(null);
    }
  };

  const totalQuestions = questions.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Assessment</h1>
        <p className="text-gray-600 mt-1">Add details and questions for your new assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Assessment Details</h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Course
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assessment Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.passingScore}
                  onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) })}
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Questions</h2>
            <div className="text-sm text-gray-600">
              Total Questions: {totalQuestions} | Total Marks: {totalQuestions}
            </div>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No questions added yet. Click the button below to add your first question.</p>
            </div>
          ) : (
            <div className="space-y-6 mb-6">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className={`border rounded-lg p-4 ${
                    currentQuestionId === question.id ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">Question {index + 1}</span>
                      <span className="text-sm text-gray-500">(1 mark)</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      rows={2}
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      placeholder="Enter your question"
                      required
                    />

                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctOption === optionIndex}
                            onChange={() => updateQuestion(question.id, 'correctOption', optionIndex)}
                            required
                          />
                          <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                            value={option}
                            onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
            onClick={addNewQuestion}
          >
            <Plus className="w-5 h-5 mx-auto" />
            <span className="block mt-1">Add New Question</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Assessment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssessment;