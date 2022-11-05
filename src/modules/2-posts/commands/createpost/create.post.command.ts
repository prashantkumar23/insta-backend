import {CreatePostRequestToMongo} from './createpost.request.dto'

export class CreatePostCommand  {
    constructor(public readonly createPostRequestRequest: CreatePostRequestToMongo) {}
}