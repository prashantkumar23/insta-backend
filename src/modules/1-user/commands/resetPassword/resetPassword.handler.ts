import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthService } from '../../auth.service';
import { UserFactory } from '../../user.factory';
import { ResetPasswordCommand } from "./resetPassword.command"

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordeHandler
    implements ICommandHandler<ResetPasswordCommand> {
    constructor(
        private readonly auth: AuthService,
        private readonly eventPublisher: EventPublisher,
        private readonly userFactory: UserFactory
    ) { }

    async execute({ resetPasswordRequest }: ResetPasswordCommand): Promise<boolean> {
        return await this.auth.resetPassword(resetPasswordRequest)
    }
}
