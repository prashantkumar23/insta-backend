export interface IOtherUserDetailReponseGraphQL {
    _id: string;
    name: string;
    email: string;
    email_verified: boolean;
    pic: string;
    username: string;
    numberOfPosts: number;
    numberOfFollowings: number;
    numberOfFollowers: number;
}

export interface IGetOtherUserDetailResponseGraphQL {
    message: string;
    isSuccess: boolean;
    user: IOtherUserDetailReponseGraphQL | null;
} 