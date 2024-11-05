import React, { useState } from 'react';
import ReviewsSection from './Review';
import CommentsSection from './Comments';
import { Course } from '@/types/Course';
import { Review } from '@/types/Review';
import { Comment } from '@/types/Comment';
 
const TabContent: React.FC<{ 
    activeTab: string;
    course: Course;
  }> = ({ activeTab, course }) => {
    const [reviews, setReviews] = useState<Review[]>(course.reviews || []);
    const [comments, setComments] = useState<Comment[]>(course.comments || []);

    const handleReviewUpdate = (updatedReview: Review) => {
      // If the review already exists, update it, otherwise add new
      const updatedReviews = reviews.some(r => r._id === updatedReview._id)
        ? reviews.map(r => r._id === updatedReview._id ? updatedReview : r)
        : [...reviews, updatedReview];
      
      setReviews(updatedReviews);
    };

    const handleReviewDelete = (reviewId: string) => {
      const filteredReviews = reviews.filter(r => r._id !== reviewId);
      setReviews(filteredReviews);
    };

    const handleCommentUpdate = (updatedComment: Comment) => {
      // If the comment already exists, update it, otherwise add new
      const updatedComments = comments.some(c => c._id === updatedComment._id)
        ? comments.map(c => c._id === updatedComment._id ? updatedComment : c)
        : [...comments, updatedComment];
      
      setComments(updatedComments);
    };

    const handleCommentDelete = (commentId: string) => {
      const filteredComments = comments.filter(c => c._id !== commentId);
      setComments(filteredComments);
    };

    switch (activeTab) {
      case 'overview':
        return (
          <div className="text-gray-600">
            <h3 className="text-lg font-bold mb-2">About this course</h3>
            <p>{course.description}</p>
          </div>
        );
      case 'reviews':
        return (
          <ReviewsSection 
            reviews={reviews} 
            onReviewUpdate={handleReviewUpdate}
            onReviewDelete={handleReviewDelete}
          />
        );
      case 'comments':
        return (
          <CommentsSection 
            comments={comments} 
            onCommentUpdate={handleCommentUpdate}
            onCommentDelete={handleCommentDelete}
          />
        );
      default:
        return null;
    }
};

export default TabContent;