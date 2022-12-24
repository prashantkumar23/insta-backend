import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { UseGuards } from '@nestjs/common'

import { LikePostCommand } from './like.post.command'
import { LikePostRequest } from './likepost.request'
import { CongnitoAuthGuard } from '../../../1-user/auth.guard'
import { LikePostResponse } from './like.post.reponse'

@Resolver()
export class LikePostGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }


    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => LikePostResponse)
    async likePost(
        @Args('input') input: LikePostRequest,
        ): Promise<LikePostResponse> {

        try {

            const command = new LikePostCommand(input)

            const resp: any = await this.commandBus.execute(command)


            return { isSuccess: true }
        } catch (err) {
            console.log(err)
            return { isSuccess: false }
        }
    }
}