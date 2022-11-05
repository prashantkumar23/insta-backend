import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { UseGuards } from '@nestjs/common'

import { DeletePostCommand } from './deletepost.command'
import { DeletePostRequest } from './deletepost.request'
import { CongnitoAuthGuard } from '../../../1-user/auth.guard'
import { DeletePostResponse } from './deletepost.response'

@Resolver()
export class DeletePostGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }


    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => DeletePostResponse)
    async deletePost(
        @Args('input') input: DeletePostRequest,
        ): Promise<DeletePostResponse> {

        try {

            const command = new DeletePostCommand(input)

            const resp: any = await this.commandBus.execute(command)

            console.log("resp", resp)

            return { isSuccess: true , message: "Successfully Deleted"}
        } catch (err) {
            console.log(err)
            return { isSuccess: false,  message: "Unuccessfull" }
        }
    }
}