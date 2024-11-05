export interface Comment {
    _id: string;
    userId: {
        _id: string;
        name: string;
        profileImage?: string;
    };
    content: string;
    createdAt: string;
    likes: number;
}