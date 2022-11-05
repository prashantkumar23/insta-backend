import {Args, Mutation, Resolver} from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { ConfirmCodeCommand } from './confirmcode.command'
import { ConfirmCodeRequest } from './confirmcode.request.dto'
import { ConfirmCodeResponse } from '../../response/confirmcode,response.dto'
import { IConfirmCodeResponse } from '../../interfaces/confirmcode.response'

@Resolver()
export class ConfirmCodeGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) {}

    @Mutation(() => ConfirmCodeResponse)
    async confirmCode(@Args('input') input: ConfirmCodeRequest): Promise<ConfirmCodeResponse> {
        
        const command =  new ConfirmCodeCommand(input)

        const resp: IConfirmCodeResponse = await this.commandBus.execute(command)

        console.log("IConfirmCodeResponse", resp)

        return {message: resp.toString()}
    }
}