import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from '../../user.factory';
import { UnfollowCommand } from "./unfollow.command"

@CommandHandler(UnfollowCommand)
export class UnfollowHandler
  implements ICommandHandler<UnfollowCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userFactory: UserFactory
  ) { }

  async execute({ unfollowRequest }: UnfollowCommand): Promise<any> {
    const {username, whoToUnfollow} = unfollowRequest
    const resp = await this.userFactory.unfollow(username, whoToUnfollow)
    // const { username } = confirmCodeRequest

    console.log("excute unfollow", resp)

    // this.eventPublisher.mergeObjectContext(
    //   await this.userFactory.update(username, true)
    // )
    return resp
  }
}
