import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { UseGuards } from '@nestjs/common'

import { UnlikePostCommand } from './unlike.post.command'
import { UnLikePostRequest } from './unlikepost.request'
import { CongnitoAuthGuard } from '../../../1-user/auth.guard'
import { UnlikePostResponse } from './unlike.post.reponse'

@Resolver()
export class UnikePostGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }


    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => UnlikePostResponse)
    async unlikePost(
        @Args('input') input: UnLikePostRequest,
    ): Promise<UnlikePostResponse> {

        try {

            const command = new UnlikePostCommand(input)

            const resp: any = await this.commandBus.execute(command)


            return { isSuccess: true }
        } catch (err) {
            return { isSuccess: false }
        }
    }
}