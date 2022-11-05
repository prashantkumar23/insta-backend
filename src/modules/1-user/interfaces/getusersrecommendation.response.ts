interface UserRecommendation {
    _id: string;
    name: string;
    username: string;
    pic: string;
    numberOfPosts: number,
    numberOffollowings: number,
    numberOffollowers: number,
    followedByMe: boolean
}

export interface IGetUserRecommedationResponseGraphQL {
    message: string;
    isSuccess: boolean;
    users: UserRecommendation[] | null;
} 