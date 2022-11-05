export interface IUserDetailReponseGraphQL {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
    pic: string;
    username: string;
    numberOfPosts: number;
    numberOfFollowings: number;
    numberOfFollowers: number;
}

export interface IGetUserDetailResponseGraphQL {
    message: string;
    isSuccess: boolean;
    user: IUserDetailReponseGraphQL | null;
} 