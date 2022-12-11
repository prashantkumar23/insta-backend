export interface UserPost {
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

export interface IGetUserPostResponse {
    message: string;
    isSuccess: boolean;
    posts: UserPost[] | []
    count: number
}