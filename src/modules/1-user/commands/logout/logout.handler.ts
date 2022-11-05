import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthService } from '../../auth.service';
import { LogoutCommand } from "./logout.command"

@CommandHandler(LogoutCommand)
export class LogoutHandler
    implements ICommandHandler<LogoutCommand> {
    constructor(
        private readonly auth: AuthService,
    ) { }

    async execute({ logoutRequest: {accessToken} }: LogoutCommand): Promise<AWSError | CognitoIdentityServiceProvider.GlobalSignOutResponse> {
        const resp = await this.auth.logout({AccessToken: accessToken})
        return resp
    }
}
