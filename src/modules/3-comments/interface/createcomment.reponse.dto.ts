export interface ICreateCommentResponse {
    _id: string;
    whoCommented: string;
    postId: string;
    comment: string;
    likes: number;
    wasLikeByMe: boolean
}