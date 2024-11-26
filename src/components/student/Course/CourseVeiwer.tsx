import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Play, Star, Clock, BookOpen, ChevronDown, ChevronUp, MessageCircle, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { fetchCoursesViewerAPI, updateCourseProgressAPI } from '@/api/studentAPI/studentAPI';
import TabContent from './TabContent';
import { Course } from '@/types/Course';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';
import { Video } from '@/types/Video';

const CourseViewer: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState<Course | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressUpdateTimeout = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetchCoursesViewerAPI(id ?? '');
        setCourse(response?.data);
        
        if (response?.data?.progress?.lastWatchedVideo) {
          const lastWatchedIndex = response.data.videos.findIndex(
            (video: Video) => video._id === response.data.progress?.lastWatchedVideo
          );
          if (lastWatchedIndex !== -1) {
            setActiveVideoIndex(lastWatchedIndex);
          }
        }
      } catch (error) {
        console.error('Failed to fetch course details:', error);
        toast.error("Failed to load course details. Please try again.");
      }
    };
    fetchCourseDetails();
  }, [id]);

  const isVideoCompleted = (videoId: string) => {
    return course?.progress?.completedVideos.includes(videoId) ?? false;
  };

  const updateProgress = async (videoId: string) => {
    if (!course || isUpdatingProgress) return;

    try {
      setIsUpdatingProgress(true);
      await updateCourseProgressAPI(course._id, videoId);
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast.error("Failed to update course progress. Please try again.");
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || !course?.videos[activeVideoIndex]) return;

    const video = videoRef.current;
    const currentTime = video.currentTime;
    const duration = video.duration;
    
    if (progressUpdateTimeout.current) {
      clearTimeout(progressUpdateTimeout.current);
    }

    if (currentTime / duration >= 0.9) {
      progressUpdateTimeout.current = setTimeout(() => {
        updateProgress(course.videos[activeVideoIndex]._id);
      }, 1000);
    }
  };

  const handleVideoEnded = () => {
    if (!course?.videos[activeVideoIndex]) return;
    updateProgress(course.videos[activeVideoIndex]._id);
  };

  if (!course || !course.videos.length) {
    return <Loader message="Loading Course Details" />;
  }

  const activeVideo = course.videos[activeVideoIndex];
  const averageRating = course.reviews.length 
    ? (course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length).toFixed(1)
    : 'No ratings';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Video Player */}
        <Card className="overflow-hidden shadow-lg">
          <div className="relative aspect-video bg-gray-900">
            <video
              ref={videoRef}
              key={activeVideo._id}
              src={activeVideo.url}
              className="w-full h-full"
              controls
              playsInline
              controlsList="nodownload" 
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
            />
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{activeVideo.title}</h2>
            {course?.progress && (
              <div className="mt-4 space-y-2">
                <Progress value={course.progress.progressPercentage} className="h-2" />
                <p className="text-sm text-gray-600">
                  {course.progress.progressPercentage.toFixed(0)}% complete
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Course Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                {averageRating} ({course.reviews.length})
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Clock className="w-4 h-4 mr-1" />
                {Math.floor(course.duration / 60)}h {course.duration % 60}m
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <BookOpen className="w-4 h-4 mr-1" />
                {course.videos.length} lessons
              </Badge>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{course.shortDescription}</p>
          </div>

          {/* Tutor Card */}
          <Card className="bg-white shadow-md">
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
                  <Badge variant="secondary" className="mb-2">Course Tutor</Badge>
                  <h3 className="text-xl font-semibold text-gray-900">{course.tutorId?.name || 'Unknown Tutor'}</h3>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="ml-auto hover:bg-purple-50"
                  onClick={() => navigate(`/tutorprofile/${course?.tutorId?._id}`)}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Comments
              </TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <TabContent activeTab={activeTab} course={course} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sidebar */}
      <Card className="w-96 shadow-lg overflow-hidden">
        <CardHeader className="p-6 bg-white">
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="space-y-1">
            <button
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedSection(expandedSection === 'videos' ? null : 'videos')}
            >
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{course.videos.length} lessons</Badge>
                <h3 className="font-medium text-gray-900">{course.title}</h3>
              </div>
              {expandedSection === 'videos' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {expandedSection === 'videos' && (
              <div className="bg-gray-50">
                {course?.videos.map((video, index) => (
                  <button
                    key={video._id}
                    onClick={() => setActiveVideoIndex(index)}
                    className={`w-full p-4 flex items-center gap-4 border-t transition-colors
                      ${activeVideoIndex === index ? 'bg-purple-50 hover:bg-purple-100' : 'hover:bg-gray-100'}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {isVideoCompleted(video._id) ? (
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : activeVideoIndex === index ? (
                          <div className="w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-100" />
                        ) : (
                          <Play className="w-4 h-4 text-gray-600" />
                        )}
                        <span className="text-sm text-left font-medium text-gray-900">
                          {video.title}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default CourseViewer;