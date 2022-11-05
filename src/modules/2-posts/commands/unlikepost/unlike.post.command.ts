import {UnLikePostRequest} from './unlikepost.request'

export class UnlikePostCommand  {
    constructor(public readonly unlikePostRequest: UnLikePostRequest) {}
}