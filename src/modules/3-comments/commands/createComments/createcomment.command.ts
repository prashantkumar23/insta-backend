import { CreateCommentRequest } from './createcomment.request.dto'

export class CreateCommentCommand {
    constructor(public readonly createCommentRequestRequest: CreateCommentRequest) { }
}