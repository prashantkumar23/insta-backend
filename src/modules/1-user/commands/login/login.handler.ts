import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AWSError } from 'aws-sdk';
import { AuthService } from '../../auth.service';
import { ILoginResponse } from '../../interfaces/login.response.dto';
import { LoginCommand } from "./login.command"

@CommandHandler(LoginCommand)
export class LoginHandler
    implements ICommandHandler<LoginCommand> {
    constructor(
        private readonly auth: AuthService,
    ) { }

    async execute({ loginRequest }: LoginCommand): Promise<ILoginResponse | AWSError> {
        let loginResponse
        try {
            loginResponse = await this.auth.login(loginRequest)
            return loginResponse
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
