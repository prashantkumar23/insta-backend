import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { UserFactory } from '../../../1-user/user.factory';

import { PostFactory } from '../../post.factory';
import { UnlikePostCommand } from "./unlike.post.command"

@CommandHandler(UnlikePostCommand)
export class UnlikePostHandler
    implements ICommandHandler<UnlikePostCommand> {
    constructor(
        // private readonly eventPublisher: EventPublisher,
        private readonly postFactory: PostFactory,
        // private readonly userFactory : UserFactory
    ) { }

    async execute({ unlikePostRequest }: UnlikePostCommand): Promise<any> {
        const { postId, userId } = unlikePostRequest;
        try {
            const post = await this.postFactory.updateUnlikeCount(postId, userId)
            return post
        } catch (err) {
            return err
        }

    }
}
