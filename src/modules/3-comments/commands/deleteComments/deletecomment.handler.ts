import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostFactory } from '../../../2-posts/post.factory';

import { CommentFactory } from '../../comment.factory';
import { DeleteCommentCommand } from "./deletecomment.command"

@CommandHandler(DeleteCommentCommand)
export class DeleteCommenttHandler
    implements ICommandHandler<DeleteCommentCommand> {
    constructor(
        // private readonly eventPublisher: EventPublisher,
        private readonly commentFactory: CommentFactory,
        private readonly postFactory : PostFactory
    ) { }

    async execute({ deleteCommentRequest }: DeleteCommentCommand): Promise<any> {
        try {
            const { postId, commentId } = deleteCommentRequest;
            const res = await this.commentFactory.delete(commentId)
            if(res) {
                await this.postFactory.updatePostAfterDeleteComment(postId, commentId)
            }
            return res
        } catch(err) {
            console.log("Delete Comment Handler execute", err)
            return err
        }
    }
}
