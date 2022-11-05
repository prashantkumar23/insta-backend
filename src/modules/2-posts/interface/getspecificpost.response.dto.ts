export interface SpecificPost {
    _id: string;
    userId: {
        _id: string;
        name: string;
        username: string;
        pic: string;
    }
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
    commentIds: {
        _id: string;
        comment: string;
        whoCommented: {
            _id: string;
            name: string;
            username: string;
            pic: string;  
        }
    }[] | [],
    createdAt: string;
    wasLikeByMe: boolean;
    postUrl: string;
}

export interface IGetSpecificPostReponse {
    message: string;
    isSuccess: boolean;
    post: SpecificPost | null
}