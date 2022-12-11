import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../auth.service';
import { UserFactory } from '../../user.factory';
import { SendCodeCommand } from "./sendCode.command"

@CommandHandler(SendCodeCommand)
export class SendCodeHandler
    implements ICommandHandler<SendCodeCommand> {
    constructor(
        private readonly auth: AuthService,
        // private readonly eventPublisher: EventPublisher,
        private readonly userFactory: UserFactory
    ) { }

    async execute({ sendCodeRequest }: SendCodeCommand): Promise<any> {
        const user: any = await this.userFactory.findUserWithEmail({ email: sendCodeRequest.email })
        if (!user) {
            return { isSuccess: false, message: "User doesn't exist with that email", username: null }
        }
        const res = await this.auth.sendCode({ username: user.username })

        if (res) return { isSuccess: true, message: "A security code has been sent to your mail", username: user.username }
        return { isSuccess: false, message: "Not able to sent the code to the mail", username: null }
    }
}
