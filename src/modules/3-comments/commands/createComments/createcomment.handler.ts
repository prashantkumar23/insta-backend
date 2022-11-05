import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import { PostFactory } from '../../../2-posts/post.factory';
// import { PostCreatedEvent } from '../../events/postcreated/event';

import { CommentFactory } from '../../comment.factory';
import { CreateCommentCommand } from "./createcomment.command"

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
    implements ICommandHandler<CreateCommentCommand> {
    constructor(
        // private readonly eventPublisher: EventPublisher,
        private readonly commentFactory: CommentFactory,
        private readonly postFactory: PostFactory
        // private readonly userFactory : UserFactory
    ) { }

    async execute({ createCommentRequestRequest }: CreateCommentCommand): Promise<any> {
        const { postId, whoCommented, comment, wasLikeByMe } = createCommentRequestRequest;
        console.log("Hanlder", postId, whoCommented)
        const commentResp = await this.commentFactory.create(postId, whoCommented, comment, wasLikeByMe)
        if (commentResp) {
            await this.postFactory.updatePostAfterAddComment(postId, commentResp.getId())
        }
        return commentResp
    }
}
