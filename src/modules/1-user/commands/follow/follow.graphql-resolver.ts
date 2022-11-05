import {Args, Mutation, Resolver} from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { FollowCommand } from './follow.command'
import { FollowRequestDTO } from './follow.request.dto'
import { FollowResponse } from '../../response/follow.respone.dto'
import { IFollowResponseGraphQL } from '../../interfaces/follow.response'

@Resolver()
export class FollowGraphqlResolver {
    constructor(private readonly commandBus: CommandBus) {}

    @Mutation(() => FollowResponse)
    async follow(@Args('input') input: FollowRequestDTO): Promise<FollowResponse> {
        
        const command =  new FollowCommand(input)

        const resp: IFollowResponseGraphQL = await this.commandBus.execute(command)

        console.log("IFollowResponseGraphQL", resp)

        return {message: "Followed!", isSuccess: true}
    }
}