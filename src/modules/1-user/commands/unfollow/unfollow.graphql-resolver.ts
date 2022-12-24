import {Args, Mutation, Resolver} from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { UnfollowCommand } from './unfollow.command'
import { UnfollowRequestDTO } from './unfollow.request.dto'
import { UnfollowResponse } from '../../response/unfollow.response.dto'
import { IUnfollowResponseGraphQL } from '../../interfaces/unfollow.response'

@Resolver()
export class UnfollowGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) {}

    @Mutation(() => UnfollowResponse)
    async unfollow(@Args('input') input: UnfollowRequestDTO): Promise<UnfollowResponse> {
        
        const command =  new UnfollowCommand(input)

        const resp: IUnfollowResponseGraphQL = await this.commandBus.execute(command)

        return {message: "Unfollowed!", isSuccess: true}
    }
}