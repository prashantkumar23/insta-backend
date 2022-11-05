import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { ConfirmCodeResponse } from '../../response/confirmcode,response.dto'
import { IConfirmCodeResponse } from '../../interfaces/confirmcode.response'
import { ResetPasswordRequest } from './resetPassword.request.dto'
import { ResetPasswordCommand } from './resetPassword.command'

@Resolver()
export class ResetPasswordGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) { }

    //TODO
    @Mutation(() => ConfirmCodeResponse)
    async resetPassword(@Args('input') input: ResetPasswordRequest): Promise<any> {

        const command = new ResetPasswordCommand(input)

        const resp: any = await this.commandBus.execute(command)

        console.log("Reset Password", resp)

        return resp
    }
}