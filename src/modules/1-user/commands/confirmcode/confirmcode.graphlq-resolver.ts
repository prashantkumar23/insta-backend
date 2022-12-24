import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { ConfirmCodeCommand } from './confirmcode.command'
import { ConfirmCodeRequest } from './confirmcode.request.dto'
import { ConfirmCodeResponse } from '../../response/confirmCode.response.dto'
// import { IConfirmCodeResponse } from '../../interfaces/confirmCode.response'

export interface IConfirmCodeResponse {
    message: string;
    isSuccess: boolean;
}

@Resolver()
export class ConfirmCodeGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) { }

    @Mutation(() => ConfirmCodeResponse)
    async confirmCode(@Args('input') input: ConfirmCodeRequest): Promise<ConfirmCodeResponse> {

        const command = new ConfirmCodeCommand(input)

        const resp: IConfirmCodeResponse = await this.commandBus.execute(command)


        return { message: resp.toString(), isSuccess: true }
    }
}