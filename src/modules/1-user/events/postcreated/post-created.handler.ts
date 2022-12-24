import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserFactory } from '../../user.factory';
import { PostCreatedEvent } from './post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  constructor(
    private userFactory: UserFactory,
    private eventPublisher: EventPublisher
  ) { }
  async handle({ username, postId }: PostCreatedEvent): Promise<void> {
    this.eventPublisher.mergeObjectContext(
      await this.userFactory.updateNumberOfPostsAndIds(username, postId)
    )
    // console.log('Post Created Event:', username, postId);
    // console.log("POST creatd event in user", resp)
    // return resp
  }
}
