import {LikePostRequest} from './likepost.request'

export class LikePostCommand  {
    constructor(public readonly likePostRequest: LikePostRequest) {}
}