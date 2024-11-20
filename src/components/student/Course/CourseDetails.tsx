import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, User, Clock, Video, ChevronUp, ChevronDown, ChartBarStacked, CircleCheckBig } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

import CourseEnrollmentModal from './CourseEnrollmentModal';
import { createCoursePaymentIntentAPI } from '@/api/studentAPI/studentAPI';
import { fetchCoursesDetailsAPI } from '@/api/studentAPI/studentAPI';


interface Tutor {
  name: string,
  _id: string
}

interface Category {
  name: string
}

interface Video {
  title: string;
  description: string;
  videoUrl: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: Category
  videos: Video[];
  thumbnailUrl: string;
  level: string
  rating: number;
  price: number;
  tutorId: Tutor;
  duration: number;
  updatedAt: Date
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedVideos, setExpandedVideos] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetchCoursesDetailsAPI(id??'');
        setCourse(response?.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Failed to load course details. Please try again later.');
      }
    };

    fetchCourse();
  }, [id]);

  const toggleVideo = (index: number) => {
    setExpandedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleEnroll = async () => {
    if (!course) return;
    try {
      const stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripe = await loadStripe(stripe_key);
      
      const session = await createCoursePaymentIntentAPI(course);
      stripe?.redirectToCheckout({
        sessionId: session.id,
      });

    } catch (error) {
      console.log(error);
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Content */}
          <div className="md:w-2/3">
            {/* Top Content */}
            <div className="bg-gray-500 p-6 mb-8 h-48 rounded-lg">
              <h1 className="text-4xl font-bold text-slate-200 mb-4">{course?.title || 'Course Title'}</h1>
              <p className="text-slate-300 mb-4">{course?.shortDescription || 'Course description.'}</p>
              <p className="text-slate-300 mb-4">Last Updated: {course?.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'Updated Time.'}</p>
            </div>
            {/* Main Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 mb-4">{course?.description || 'Course description.'}</p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Content</h2>
              {course.videos && course.videos.length > 0 ? (
                course.videos.map((video, videoIndex) => (
                  <div key={videoIndex} className="mb-4">
                    <button 
                      onClick={() => toggleVideo(videoIndex)}
                      className="flex justify-between items-center w-full text-left bg-white rounded-lg shadow-sm p-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">{`Video ${videoIndex + 1}. ${video.title}`}</h3>
                      {expandedVideos.has(videoIndex) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedVideos.has(videoIndex) && (
                      <div className="mt-2 bg-white rounded-lg shadow-sm p-4">
                        <p className="text-gray-700">{video.description}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No videos available for this course yet.</p>
              )}
            </div>
          </div>
          {/* Right Panel */}
          <div className="md:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src={course?.thumbnailUrl || '/api/placeholder/600/400'} alt="Course thumbnail" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1 text-yellow-400">{course.rating || 'No rating yet'}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-4">{course?.price === 0 ? 'FREE' : `₹${course?.price}`}</div>
                  <CourseEnrollmentModal 
                    course={course} 
                    onEnroll={handleEnroll}
                  />
                  <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">Created by:</span>
                    <a
                      href={`/tutorprofile/${course?.tutorId?._id}`}
                      className="ml-auto font-medium text-blue-600 hover:underline"
                    >
                      {course?.tutorId?.name || 'Instructor Name'}
                    </a>
                  </div>
                    <div className="flex items-center">
                      <ChartBarStacked  className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">Category</span>
                      <span className="ml-auto font-medium">{course?.category.name || 'Category Name'}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">Duration</span>
                      <span className="ml-auto font-medium">{course?.duration || 'N/A'} Hours</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">Lessons</span>
                      <span className="ml-auto font-medium">{course?.videos?.length || 0} Videos</span>
                    </div>
                    <div className="flex items-center">
                      <CircleCheckBig className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">Full Lifetime Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;