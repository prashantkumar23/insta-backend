import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { PostFactory } from '../../post.factory';
import { DeletePostCommand } from "./deletepost.command"

@CommandHandler(DeletePostCommand)
export class DeletePostHandler
    implements ICommandHandler<DeletePostCommand> {
    constructor(
        // private readonly eventPublisher: EventPublisher,
        private readonly postFactory: PostFactory,
        // private readonly userFactory : UserFactory
    ) { }

    async execute({ deletePostRequest }: DeletePostCommand): Promise<any> {
        try {
            const { postId, s3bucketObjectIds } = deletePostRequest;
            const post = await this.postFactory.deletePost(postId)

            console.log("Respo" ,post)
            return post
        } catch (err) {
            return err

        }

    }
}
