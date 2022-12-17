import { Upload } from "graphql-upload";

export interface IUser {
    readonly _id: string;
    readonly name: string;
    readonly username: string;
    readonly pic: string;
    readonly email: string;
    readonly email_verfied: boolean;
    readonly numberOfPosts: number;
    readonly numberOffollowers: number;
    readonly numberOffollowings: number;
    readonly followedByMe: boolean;
}

export interface FollowRequest {
    readonly whoToFollow: string;
    readonly username: string;
}

export interface UnfollowRequest {
    readonly whoToUnfollow: string;
    readonly username: string;
}

export interface SearchRequest {
    readonly searchTerm: string;
}

export interface GetUserDetailRequest {
    readonly username: string;
}

export interface GetOtherUserDetailRequest {
    readonly username: string;
    readonly userId: string;
    // readonly otheruserId: string;
}

export interface GetUserPostRequest {
    readonly username: string;
    readonly limit: number;
    readonly skip: number;
}

export interface RemoveFromFollowingRequest {
    readonly userId: string;
    readonly whoToRemove: string;
}

export interface GetUserRecommendationRequest {
    readonly limit: number
    readonly userId: string;
}

export interface UpdateProfileImage {
    readonly username: string;
    readonly userId: string;
    readonly file: Upload;
}


export interface UpdateProfileImageToMongo {
    readonly pic: string;
    readonly userId: string;
}