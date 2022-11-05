
  
// comes from user end (as request)
export interface CreateComment {
    readonly whoCommented: string;
    readonly postId: string;
    readonly comment: string;
    readonly wasLikeByMe: boolean;
}

export interface DeleteComment {
    readonly commentId: string;
    readonly postId: string;
}