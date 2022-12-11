import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { SendCodeResponse } from '../../response/sendCode.response.dto'
import { SendCodeRequest } from './sendCode.request.dto'
import { SendCodeCommand } from './sendCode.command'
import { ISendCodeResponse } from '../../interfaces/sendCode.response'

@Resolver()
export class SendCodeGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) { }

    @Mutation(() => SendCodeResponse)
    async sendCode(@Args('input') input: SendCodeRequest): Promise<any> {

        const command = new SendCodeCommand(input)

        const resp: ISendCodeResponse = await this.commandBus.execute(command)

        return resp;
    }
}