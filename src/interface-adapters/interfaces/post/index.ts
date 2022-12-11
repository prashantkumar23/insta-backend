import { Upload } from "graphql-upload";

export interface CreatePost {
    readonly username: string;
    readonly userId: string;
    readonly file: Upload;
    readonly caption: string;
}

export interface CreatePostToMongo {
    readonly userId: string;
    readonly imageUrl: string | string[]
    readonly caption: string;
    readonly s3bucketObjectIds: string[];
    readonly postUrl: string
}

export interface LikePost {
    readonly postId: string;
    readonly userId: string;
}

export interface UnlikePost {
    readonly postId: string;
    readonly userId: string;
}

export interface DeletePost {
    readonly postId: string;
    readonly s3bucketObjectIds: string[];
}

export interface GetFeedPost {
    readonly userId: string;
    readonly limit: number;
    readonly skip: number;
}

export interface GetUserPost {
    readonly username: string;
    readonly limit: number;
    readonly skip: number;
}

export interface GetSpecificPost {
    readonly postId: string;
    readonly userId: string;
}