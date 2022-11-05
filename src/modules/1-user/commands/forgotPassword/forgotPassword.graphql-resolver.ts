import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { ConfirmCodeResponse } from '../../response/confirmcode,response.dto'
import { IConfirmCodeResponse } from '../../interfaces/confirmcode.response'
import { ForgotPasswordRequest } from './forgotpassword.request.dto'
import { ForgotPasswordCommand } from './forgotPassword.command'

@Resolver()
export class ForgotPasswordGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) { }

    //TODO
    @Mutation(() => ConfirmCodeResponse)
    async forgotPassword(@Args('input') input: ForgotPasswordRequest): Promise<any> {

        const command = new ForgotPasswordCommand(input)

        const resp: any = await this.commandBus.execute(command)

        console.log("Forgot Password", resp)


        return resp
    }
}