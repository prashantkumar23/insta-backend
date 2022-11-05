import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { UseGuards } from '@nestjs/common'

import { DeleteCommentCommand } from './deletecomment.command'
import { DeleteCommentRequest } from './deletecomment.request.dto'
import { CongnitoAuthGuard } from '../../../1-user/auth.guard'
import { DeleteCommentResponseGraphql } from './deletecomment.response.dto'

@Resolver()
export class DeleteCommentGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }


    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => DeleteCommentResponseGraphql)
    async deleteComment(
        @Args('input') input: DeleteCommentRequest,
    ): Promise<DeleteCommentResponseGraphql> {

        try {

            const command = new DeleteCommentCommand(input)

            const resp: any = await this.commandBus.execute(command)

            console.log("resp", resp)

            return { message: "Comment Deleted Successfully" }
        } catch (err) {
            console.log(err)
            return { message: "Comment Deletion Failed" }
        }
    }
}