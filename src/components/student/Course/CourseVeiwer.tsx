import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Play, Clock, Users, Star } from 'lucide-react';
import { fetchCoursesDetailsAPI } from '@/api/studentAPI/studentAPI';

interface Video {
  _id: string;
  title: string;
  duration: number;
  url: string;
  isCompleted?: boolean;
}

interface Course {
  _id: string;
  tutorId: { _id: string; name: string };
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number;
  category: { _id: string; name: string };
  videos: Video[];
  level: string;
  tags: string[];
  thumbnailUrl: string;
  reviews: any[];
  purchaseCount: number;
}

const CourseViewer: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState<Course | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

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
    return <div>Loading...</div>;
  }

  const activeVideo = course.videos[activeVideoIndex];

  return (
    <div className="flex h-screen bg-white">
      {/* Left Section - Video and Course Info */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Video Player Section */}
        <div className="relative aspect-video bg-gray-900 rounded-lg mb-6">
          <video
            key={activeVideo._id} // Important: Forces video reload when source changes
            src={activeVideo.url}
            className="w-full h-full rounded-lg"
            controls
            playsInline
          />
        </div>

        {/* Current Video Title */}
        <h2 className="text-xl font-bold mb-2">{activeVideo.title}</h2>

        {/* Course Info */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.shortDescription}</p>
          <div className="flex items-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold">{course.reviews.length ? '4.7' : 'No ratings'}</span>
              <span>({course.reviews.length} ratings)</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-4">
          <div className="flex gap-8">
            {['Overview', 'Reviews', 'Comments'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 px-1 ${activeTab === tab.toLowerCase() ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="text-gray-600">
            <h3 className="text-lg font-bold mb-2">About this course</h3>
            <p>{course.description}</p>
          </div>
        )}
      </div>

      {/* Right Section - Course Content */}
      <div className="w-96 border-l overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Course content</h2>
        </div>
        
        {/* Sections */}
        <div className="border-b">
          <button
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            onClick={() => setExpandedSection(expandedSection === 'videos' ? null : 'videos')}
          >
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">{`${course.videos.length} lessons`}</div>
              <h3 className="font-medium">{course.title}</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{Math.floor(course.duration / 60)} hr {course.duration % 60} min</span>
              {expandedSection === 'videos' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>
          
          {/* Video List */}
          {expandedSection === 'videos' && (
            <div className="bg-gray-50">
              {course.videos.map((video, index) => (
                <button
                  key={video._id}
                  onClick={() => setActiveVideoIndex(index)}
                  className={`w-full p-4 flex items-center gap-4 border-t hover:bg-gray-100 ${
                    activeVideoIndex === index ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {activeVideoIndex === index ? (
                        <div className="w-4 h-4 rounded-full bg-purple-600" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span className="text-sm text-left">{video.title}</span>
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