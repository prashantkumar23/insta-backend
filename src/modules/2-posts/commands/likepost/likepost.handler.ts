import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from '../../../1-user/user.factory';

import { PostFactory } from '../../post.factory';
import { LikePostCommand } from "./like.post.command"

@CommandHandler(LikePostCommand)
export class LikePostHandler
    implements ICommandHandler<LikePostCommand> {
    constructor(
        // private readonly eventPublisher: EventPublisher,
        private readonly postFactory: PostFactory,
        // private readonly userFactory : UserFactory
    ) { }

    async execute({ likePostRequest }: LikePostCommand): Promise<any> {
        try {
            const { postId, userId } = likePostRequest;
            const post = await this.postFactory.updateLikeCount(postId, userId)

            console.log("Respo" ,post)
            return post
        } catch (err) {
            return err

        }

    }
}
