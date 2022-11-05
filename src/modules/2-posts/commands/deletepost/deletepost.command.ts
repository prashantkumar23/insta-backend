import {DeletePostRequest} from './deletepost.request'

export class DeletePostCommand  {
    constructor(public readonly deletePostRequest: DeletePostRequest) {}
}