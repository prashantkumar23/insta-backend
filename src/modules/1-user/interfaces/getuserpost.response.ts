interface UserPost {
    _id: string;
    imageUrl: string;
}

export interface IGetUserPostResponseGraphQL {
    message: string;
    isSuccess: boolean;
    posts: UserPost[] | [];
    count: number;
} 