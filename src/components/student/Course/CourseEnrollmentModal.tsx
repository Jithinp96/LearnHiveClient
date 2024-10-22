import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, User, Clock, Video, ChartBarStacked, CircleCheckBig } from 'lucide-react';

const CourseEnrollmentModal = ({ 
    course, 
    onEnroll 
}: { 
    course: any;
    onEnroll: () => void;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-gray-900 text-white py-6 rounded-lg hover:bg-gray-800 transition duration-300">
                    Enroll Now
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Confirm Enrollment
                    </DialogTitle>
                    <DialogDescription>
                        Review your course details before proceeding to payment
                    </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="ml-1 text-sm text-yellow-400">{course.rating}</span>
                            </div>
                        </div>

                        <img 
                            src={course.thumbnailUrl || '/api/placeholder/600/400'} 
                            alt="Course thumbnail" 
                            className="w-full h-40 object-cover rounded-lg"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <User className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-sm text-gray-600">
                                    {course.tutorId?.name || 'Instructor Name'}
                                </span>
                            </div>
                        <div className="flex items-center">
                            <ChartBarStacked className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">
                                {course.category.name}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">
                                {course.duration} Hours
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Video className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">
                                {course.videos?.length || 0} Videos
                            </span>
                        </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold">Course Price:</span>
                                <span className="text-xl font-bold">
                                    {course.price === 0 ? 'FREE' : `₹${course.price}`}
                                </span>
                            </div>
                            
                            <Button 
                                onClick={onEnroll}
                                className="w-full bg-blue-600 text-white py-6 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Pay Now
                            </Button>
                        </div>

                        <div className="flex items-center justify-center text-sm text-gray-500">
                            <CircleCheckBig className="w-4 h-4 mr-1" />
                            Full Lifetime Access
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseEnrollmentModal;