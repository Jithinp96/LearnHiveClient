import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Play, Star, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { fetchCoursesDetailsAPI } from '@/api/studentAPI/studentAPI';
import TabContent from './TabContent';
import { Course } from '@/types/Course';
import Loader from '@/components/ui/Loader';

const CourseViewer: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState<Course | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetchCoursesDetailsAPI(id ?? '');
        setCourse(response?.data);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      }
    };
    fetchCourseDetails();
  }, [id]);

  if (!course || !course.videos.length) {
    return <Loader message="Loading Course Details" />;
  }

  const activeVideo = course.videos[activeVideoIndex];
  const averageRating = course.reviews.length 
    ? (course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length).toFixed(1)
    : 'No ratings';

  const handleViewProfileClick = () => {
    navigate(`/tutorprofile/${course?.tutorId?._id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Section - Video and Course Info */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Video Player Section */}
        <Card className="mb-6 overflow-hidden">
          <div className="relative aspect-video bg-gray-900">
            <video
              key={activeVideo._id}
              src={activeVideo.url}
              className="w-full h-full"
              controls
              playsInline
            />
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{activeVideo.title}</h2>
          </CardContent>
        </Card>

        {/* Course Info */}
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{course.shortDescription}</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-lg">{averageRating}</span>
              <span className="text-gray-600">({course.reviews.length} ratings)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-5 h-5" />
              <span>{course.videos.length} lessons</span>
            </div>
          </div>

          {/* Tutor Information */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={course.tutorId?.profileImage}
                    alt={course.tutorId?.name || 'Tutor'}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-100"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-purple-600 font-medium mb-1">Course Tutor</p>
                  <h3 className="text-xl font-semibold text-gray-900">{course.tutorId?.name || 'Unknown Tutor'}</h3>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="ml-auto hover:bg-purple-50"
                  onClick={handleViewProfileClick}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex gap-8">
            {['Overview', 'Reviews', 'Comments'].map((tab) => (
              <button
                key={tab}
                className={`pb-4 px-2 font-medium transition-colors
                  ${activeTab === tab.toLowerCase() 
                    ? 'border-b-2 border-purple-600 text-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <TabContent activeTab={activeTab} course={course} />
      </div>

      {/* Right Section - Course Content */}
      <div className="w-96 bg-white border-l shadow-lg overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
        </div>
        
        {/* Sections */}
        <div>
          <button
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedSection(expandedSection === 'videos' ? null : 'videos')}
          >
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-purple-600">{`${course.videos.length} lessons`}</div>
              <Separator orientation="vertical" className="h-4" />
              <h3 className="font-medium text-gray-900">{course.title}</h3>
            </div>
            {expandedSection === 'videos' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {/* Video List */}
          {expandedSection === 'videos' && (
            <div className="bg-gray-50">
              {course.videos.map((video, index) => (
                <button
                  key={video._id}
                  onClick={() => setActiveVideoIndex(index)}
                  className={`w-full p-4 flex items-center gap-4 border-t transition-colors
                    ${activeVideoIndex === index 
                      ? 'bg-purple-50 hover:bg-purple-100' 
                      : 'hover:bg-gray-100'}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {activeVideoIndex === index ? (
                        <div className="w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-100" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="text-sm text-left font-medium text-gray-900">{video.title}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;