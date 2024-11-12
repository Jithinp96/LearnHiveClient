import React, { useState } from 'react';
// import { ThumbsUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from '@/types/Comment';

import { addCommentAPI, updateCommentAPI, deleteCommentAPI } from '@/api/studentAPI/studentAPI';

interface CommentsSectionProps {
  comments: Comment[];
  onCommentUpdate?: (updatedComment: Comment) => void;
  onCommentDelete?: (commentId: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ 
  comments,
  onCommentUpdate = () => {},
  onCommentDelete = () => {}
}) => {
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const { id: courseId } = useParams<{ id: string }>();
    
    const handleSubmitComment = async() => {
      try {
        if (!courseId) {
          toast.error('Course ID is missing');
          return;
        }
        if (editingComment) {
          // Update existing Comment
          const updatedComment = await updateCommentAPI(courseId, editingComment._id, {
            content: newComment
          });
          onCommentUpdate(updatedComment);
          toast.success('Comment updated successfully');
        } else {
          // Add new Comment
          const createdComment = await addCommentAPI(courseId, {
            content: newComment
          });
          onCommentUpdate(createdComment);
          toast.success('Comment added successfully');
        }
        // Reset form
        setNewComment('');
        setEditingComment(null);
      } catch (error) {
        toast.error('Failed to submit comment');
        console.error(error);
      }
    };

    const handleDeleteComment = async (commentId: string) => {
      try {
        if (!courseId) {
          toast.error('Course ID is missing');
          return;
        }
  
        await deleteCommentAPI(courseId, commentId);
        onCommentDelete(commentId);
        toast.success('Comment deleted successfully');
      } catch (error) {
        toast.error('Failed to delete Comment');
        console.error(error);
      }
    };
  
    // const startEditingComment = (comment: Comment) => {
    //   setEditingComment(comment);
    //   setNewComment(comment.content);
    // };
  
    return (
      <div className="space-y-6">
        {/* Add Comment Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="mb-4"
            rows={3}
          />
          <div className="flex space-x-2">
          <Button 
            onClick={handleSubmitComment}
            disabled={ !newComment.trim() }
          >
            {editingComment ? 'Update Comment' : 'Submit Comment'}
          </Button>
          {editingComment && (
            <Button 
              variant="outline"
              onClick={() => {
                setEditingComment(null);
                setNewComment('');
              }}
            >
              Cancel
            </Button>
          )}
        </div>
        </div>
  
        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={comment.userId.profileImage} />
                    <AvatarFallback>{comment.userId.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment.userId.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </Button> */}
                  {/* Add edit and delete buttons */}
                  {/* <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startEditingComment(comment)}
                  >
                    Edit
                  </Button> */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default CommentsSection