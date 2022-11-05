export interface FeedPost {
    id: string;
    imageUrl: string;
    likes: number;
    comments: number;
    createdAt: string;
    user: {
        id: string;
        name: string;
        username: string;
        pic: string;
    }
}

export interface IGetFeedPostResponse {
    message: string;
    isSuccess: boolean;
    posts: FeedPost[] | []
    count: number
}