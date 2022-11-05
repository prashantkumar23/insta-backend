import {DeleteCommentRequest} from './deletecomment.request.dto'

export class DeleteCommentCommand  {
    constructor(public readonly deleteCommentRequest: DeleteCommentRequest) {}
}