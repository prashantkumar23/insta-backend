import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from '../../user.factory';
import { FollowCommand } from "./follow.command"

@CommandHandler(FollowCommand)
export class FollowHandler
  implements ICommandHandler<FollowCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userFactory: UserFactory
  ) { }

  async execute({ followRequest }: FollowCommand): Promise<any> {
    const {username, whoToFollow} = followRequest
    const resp = await this.userFactory.follow(username, whoToFollow)
    // const { username } = confirmCodeRequest

    // this.eventPublisher.mergeObjectContext(
    //   await this.userFactory.update(username, true)
    // )
    return resp
  }
}
