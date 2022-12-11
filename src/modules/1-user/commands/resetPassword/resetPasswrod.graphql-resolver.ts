import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { ResetPasswordResponse } from '../../response/resetPassword.response.dto'
import { ResetPasswordRequest } from './resetPassword.request.dto'
import { ResetPasswordCommand } from './resetPassword.command'

@Resolver()
export class ResetPasswordGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) { }

    @Mutation(() => ResetPasswordResponse)
    async resetPassword(@Args('input') input: ResetPasswordRequest): Promise<ResetPasswordResponse> {

        const command = new ResetPasswordCommand(input)

        const resp = await this.commandBus.execute(command)

        if (resp) return { isSuccess: true, message: "Your Password is now reset. Please re-login again" }

        return { isSuccess: false, message: "Something went wrong!" }
    }
}