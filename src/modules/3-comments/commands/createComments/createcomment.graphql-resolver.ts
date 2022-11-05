import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { UseGuards } from '@nestjs/common'

import { CreateCommentCommand } from './createcomment.command'
import { CreateCommentRequest } from './createcomment.request.dto'
import { CongnitoAuthGuard } from '../../../1-user/auth.guard'
import { CurrentUser } from '../../../1-user/currentuser.decorator'
import { User } from '../../../1-user/user.type'
import { CreateCommentResponseGraphql } from './createcomment.response.dto'

@Resolver()
export class CreateCommentGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }


    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => CreateCommentResponseGraphql)
    async createComment(
        @Args('input') input: CreateCommentRequest,
        @CurrentUser() user: User
    ): Promise<CreateCommentResponseGraphql> {

        try {
            console.log("USer", user)
            const { postId, comment, wasLikeByMe } = input
            const commentData = {
                whoCommented: input.whoCommented,
                postId,
                comment,
                wasLikeByMe
            }

            const command = new CreateCommentCommand(commentData)

            const resp: any = await this.commandBus.execute(command)

            console.log("resp", resp)

            return resp
        } catch (err) {
            console.log(err)
            return err
        }
    }
}