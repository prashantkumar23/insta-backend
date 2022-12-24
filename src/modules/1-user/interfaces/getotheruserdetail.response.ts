export interface IOtherUserDetailReponseGraphQL {
    _id: string;
    name: string;
    email: string;
    email_verified: boolean;
    pic: string;
    username: string;
    numberOfPosts: number;
    numberOffollowings: number;
    numberOffollowers: number;
    followedByMe: boolean
}

export interface IGetOtherUserDetailResponseGraphQL {
    message: string;
    isSuccess: boolean;
    user: IOtherUserDetailReponseGraphQL | null;
} 