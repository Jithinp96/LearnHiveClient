export interface Review {
    _id: string;
    userId: {
        _id: string;
        name: string;
        profileImage?: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
    helpful: number;
}