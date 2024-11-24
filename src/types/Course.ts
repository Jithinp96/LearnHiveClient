import { Comment } from "./Comment";
import { Review } from "./Review";
import { Video } from "./Video";

export interface Course {
    _id: string;
    tutorId: { 
        _id: string; 
        name: string;
        profileImage: string;
    };
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    duration: number;
    category: { 
        _id: string; 
        name: string 
    };
    videos: Video[];
    level: string;
    tags: string[];
    thumbnailUrl: string;
    reviews: Review[];
    comments: Comment[];
    purchaseCount: number;
}