import { Args, Query, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'


import { SignUpCommand } from './signup.command'
import { SignUpRequest } from './signup.request.dto'
import { SignUpResponse } from '../../response/signup.response.dto'
import { ISignUpResponse } from '../../interfaces/signup.reponse'


@Resolver()
export class SignUpGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) { }

    @Query(() => String)
    async helloWorld() {
        return "Hello World!"
    }

    @Mutation(() => SignUpResponse)
    async signup(@Args('input') input: SignUpRequest): Promise<SignUpResponse> {

        const command = new SignUpCommand(input)

        const resp: ISignUpResponse = await this.commandBus.execute(command)

        console.log("ISignUpResponse", resp)

        return resp
    }
}