import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Review } from '@/types/Review';
import { addReviewAPI, updateReviewAPI, deleteReviewAPI } from '@/api/studentAPI/studentAPI';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ReviewsSectionProps {
  reviews: Review[];
  onReviewUpdate?: (updatedReview: Review) => void;
  onReviewDelete?: (reviewId: string) => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  reviews, 
  onReviewUpdate = () => {}, 
  onReviewDelete = () => {} 
}) => {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const { id: courseId } = useParams<{ id: string }>();

  const handleSubmitReview = async () => {
    try {
      if (!courseId) {
        toast.error('Course ID is missing');
        return;
      }

      if (editingReview) {
        // Update existing review
        const updatedReview = await updateReviewAPI(courseId, editingReview._id, {
          rating,
          comment: newReview
        });
        onReviewUpdate(updatedReview);
        toast.success('Review updated successfully');
      } else {
        // Add new review
        const createdReview = await addReviewAPI(courseId, {
          rating,
          comment: newReview
        });
        onReviewUpdate(createdReview);
        toast.success('Review added successfully');
      }

      // Reset form
      setNewReview('');
      setRating(0);
      setEditingReview(null);
    } catch (error) {
      toast.error('Failed to submit review');
      console.error(error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      if (!courseId) {
        toast.error('Course ID is missing');
        return;
      }

      await deleteReviewAPI(courseId, reviewId);
      onReviewDelete(reviewId);
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error('Failed to delete review');
      console.error(error);
    }
  };

  const startEditingReview = (review: Review) => {
    setEditingReview(review);
    setNewReview(review.comment);
    setRating(review.rating);
  };

  return (
    <div className="space-y-6">
      {/* Add Review Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {editingReview ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <Textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Share your experience with this course..."
          className="mb-4"
          rows={4}
        />
        <div className="flex space-x-2">
          <Button 
            onClick={handleSubmitReview}
            disabled={!rating || !newReview.trim()}
          >
            {editingReview ? 'Update Review' : 'Submit Review'}
          </Button>
          {editingReview && (
            <Button 
              variant="outline"
              onClick={() => {
                setEditingReview(null);
                setNewReview('');
                setRating(0);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border-b pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.userId.profileImage} />
                  <AvatarFallback>{review.userId.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.userId.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful}</span>
                </Button>
                {/* Add edit and delete buttons */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => startEditingReview(review)}
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDeleteReview(review._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="mt-3 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;