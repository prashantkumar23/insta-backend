import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Args } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { CurrentUser } from '../../../1-user/currentuser.decorator';

// import { PostCreatedEvent } from '../../../1-user/events/postcreated/post-created.event';
import { UserFactory } from '../../../1-user/user.factory';
import { User } from '../../../1-user/user.type';
import { PostFactory } from '../../post.factory';
import { CreatePostCommand } from "./create.post.command"

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
    implements ICommandHandler<CreatePostCommand> {

        constructor(
        // private readonly eventPublisher: EventPublisher,
        private readonly postFactory: PostFactory,
  
    ) { }

    async execute({ createPostRequestRequest }: CreatePostCommand): Promise<any> {
        const { userId, caption, imageUrl, s3bucketObjectIds, postUrl } = createPostRequestRequest;
        let wasLikeByMe = false;
        const post = await this.postFactory.create(userId, caption, imageUrl, s3bucketObjectIds, postUrl, wasLikeByMe)
  

        // this.eventPublisher.mergeObjectContext(
        //   await this.userFactory.updateNumberOfPosts(username, incrementValue)
        // )
        // post.apply(new PostCreatedEvent(username, post.getId()))
        return post
    }
}
