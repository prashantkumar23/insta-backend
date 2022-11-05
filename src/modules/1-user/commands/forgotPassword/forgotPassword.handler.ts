import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthService } from '../../auth.service';
import { UserFactory } from '../../user.factory';
import { ForgotPasswordCommand } from "./forgotPassword.command"

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordeHandler
    implements ICommandHandler<ForgotPasswordCommand> {
    constructor(
        private readonly auth: AuthService,
        private readonly eventPublisher: EventPublisher,
        private readonly userFactory: UserFactory
    ) { }

    async execute({ forgotPasswordRequest }: ForgotPasswordCommand): Promise<CognitoIdentityServiceProvider.Types.ForgotPasswordResponse | AWSError> {
        const resp = await this.auth.forgotPassword(forgotPasswordRequest)

        console.log("Forgot Password Resp", resp)

        return resp
    }
}
