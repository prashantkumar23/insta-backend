import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthService } from '../../auth.service';
import { UserFactory } from '../../user.factory';
import { ConfirmCodeCommand } from "./confirmcode.command"

@CommandHandler(ConfirmCodeCommand)
export class ConfirmCodeHandler
  implements ICommandHandler<ConfirmCodeCommand> {
  constructor(
    private readonly auth: AuthService,
    private readonly eventPublisher: EventPublisher,
    private readonly userFactory: UserFactory
  ) { }

  async execute({ confirmCodeRequest }: ConfirmCodeCommand): Promise<CognitoIdentityServiceProvider.Types.ConfirmSignUpResponse | AWSError> {
    const resp = await this.auth.confirmSignup(confirmCodeRequest)
    const { username } = confirmCodeRequest

    console.log("excute confirm c ode", resp)

    this.eventPublisher.mergeObjectContext(
      await this.userFactory.update(username, true)
    )

    /* 
    
    [1] updatedEntityDocument {
[1]   _id: new ObjectId("62e8cd87478edfbd7350c637"),
[1]   name: 'Prashant Kumar',
[1]   email: 'blackhole.gamma@gmail.com',
[1]   username: 'prashantjdrew',
[1]   email_verfied: true
[1] }
    
    */

    // console.log("User in confirm code handler", user)
    // user.commit();
    // const user = this.eventPublisher.mergeObjectContext(
    //   await this.userFactory.create(name, username, email, password),
    // );
    return resp
    // user.commit();
  }
}
