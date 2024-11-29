import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  IndianRupee,
  Clock, 
  Tag, 
  Book, 
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui//Alert";
import ConfirmActionDialog from '../ui/ConfirmationBox';
import { approveCourseAPI, getCourseDetails, toggleBlockCourseAPI } from '@/api/adminAPI/adminAPI';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

interface Comment {
  _id: string;
  text: string;
  userId: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
}

interface Course {
  _id: string;
  tutorId: {
    _id: string;
    name: string;
  };
  title: string;
  description: string;
  shortDescription: string;
  tags: string[];
  category: {
    _id: string;
    name: string;
  };
  price: number;
  offerPercentage: number;
  purchaseCount: number;
  level: string;
  duration: number;
  thumbnailUrl: string;
  isBlocked: boolean;
  isApproved: boolean;
  isListed: boolean;
  videos: Video[];
  reviews: Review[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

const AdminCourseDetails: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { courseId } = useParams<{ courseId: string }>();

  if(!courseId) {
    toast.error("Course details missing!")
    return
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseDetails(courseId!);
        if (response?.status === 200) {
          setCourse(response.data);
        } else {
          setError('Failed to fetch course details');
        }
      } catch (err) {
        setError('An error occurred while fetching course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleApproveCourse = async () => {
    try {
      const response = await approveCourseAPI(courseId);
      if (response?.status === 200) {
        setCourse(prev => prev ? { ...prev, isApproved: true, isListed: true } : null);
        toast.success("Course approved successfully")
      } else {
        toast.error("Failed to approve course")
      }
    } catch (error) {
      setError('Failed to approve course');
    }
  };

  const handleToggleBlock = async () => {
    try {
      const response = await toggleBlockCourseAPI(courseId, !course?.isBlocked, !course?.isListed);
      if (response?.status === 200) {
        setCourse(prev => prev ? { ...prev, isBlocked: !prev.isBlocked, isListed: !prev.isListed } : null);
        toast.success("Course status changed successfully")
      } else {
        toast.error("Failed to change course status. Please try again!")
      }
    } catch (error) {
      setError('Failed to update block status');
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!course) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>Course not found</AlertDescription>
      </Alert>
    );
  }

  const statusIndicator = (isTrue: boolean, positiveLabel: string) => {
    const label = isTrue ? positiveLabel : `Not ${positiveLabel.toLowerCase()}`;
    return (
      <div className="flex items-center space-x-2">
        {isTrue ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
        <span className={`font-medium ${isTrue ? 'text-green-700' : 'text-red-700'}`}>
          {label}
        </span>
      </div>
    );
  };

  const renderStatusWithAction = (
    isTrue: boolean,
    positiveLabel: string,
    showAction: boolean,
    actionConfig: {
      onClick: () => void;
      buttonText: string;
      icon: keyof typeof import('lucide-react');
      title: string;
      description: string;
      variant?: 'default' | 'destructive' | 'outline';
    }
  ) => (
    <div className="space-y-3">
      {statusIndicator(isTrue, positiveLabel)}
      {showAction && (
        <ConfirmActionDialog
          onConfirm={actionConfig.onClick}
          triggerElement={{
            type: 'button',
            content: actionConfig.buttonText,
            iconName: actionConfig.icon
          }}
          title={actionConfig.title}
          description={actionConfig.description}
          variant={actionConfig.variant}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600">{course.shortDescription}</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
                <CardHeader className="pb-2">
                <CardTitle className="text-lg">Approval Status</CardTitle>
                </CardHeader>
                <CardContent>
                {renderStatusWithAction(
                    course?.isApproved || false,
                    'Approved',
                    !course?.isApproved,
                    {
                    onClick: handleApproveCourse,
                    buttonText: 'Approve Course',
                    icon: 'ShieldCheck',
                    title: 'Approve Course',
                    description: 'Are you sure you want to approve this course? This will make the course available for review.',
                    variant: 'default'
                    }
                )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                <CardTitle className="text-lg">Listing Status</CardTitle>
                </CardHeader>
                <CardContent>
                {statusIndicator(course.isListed, 'Listed')}
                </CardContent>
            </Card>

            <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Block Status</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStatusWithAction(
                !course?.isBlocked,
                'Active',
                true,
                {
                  onClick: handleToggleBlock,
                  buttonText: course?.isBlocked ? 'Unblock Course' : 'Block Course',
                  icon: course?.isBlocked ? 'ShieldCheck' : 'Ban',
                  title: course?.isBlocked ? 'Unblock Course' : 'Block Course',
                  description: course?.isBlocked 
                    ? 'Are you sure you want to unblock this course? This will make the course available again.'
                    : 'Are you sure you want to block this course? This will prevent access to the course.',
                  variant: course?.isBlocked ? 'default' : 'destructive'
                }
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle>Course Thumbnail</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={course.thumbnailUrl} 
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{course.description}</p>
              </CardContent>
            </Card>

            {/* Videos */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>{course.videos.length} videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.videos.map((video, index) => (
                    <div key={video._id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Video className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">Video {index + 1}: {video.title}</h3>
                      </div>
                      <p className="text-gray-600 ml-7 mb-2">{video.description}</p>
                      <div className="ml-7">
                        <a 
                          href={video.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          View Video
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Meta Info */}
          <div className="space-y-6">
            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Book className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium capitalize">{course.level}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration} hours</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">₹{course.price}</span>
                  </div>

                  {/* <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Enrolled:</span>
                    <span className="font-medium">{course.purchaseCount} students</span>
                  </div> */}

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tutor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Tutor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{course.tutorId.name}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium">{course.tutorId._id}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {course.category.name}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetails;