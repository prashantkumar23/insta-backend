import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { Res, UseGuards } from '@nestjs/common'

import { RemoveFromFollowingCommand } from './removefromfollowing.command'
import { RemoveFromFollowingRequestDto } from './removefromfollowing.request.dto'
import { RemoveFromFollowingResponse } from '../../response/remove.from.following.response.dto'
import { CongnitoAuthGuard } from '../../auth.guard'


// const at = "eyJraWQiOiJ0VXVteFRqSHU0RHFOZCtvUUx3RGhRUEdzalNXVTdkTGs2dFp1a3Q1N0lzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0NmZhZDE5Yy1jY2U3LTQ4ZTQtYmNiMi1lMDhhYjA1NGJiMWUiLCJkZXZpY2Vfa2V5IjoidXMtd2VzdC0yX2EyNzlkODQxLTE4NjQtNDE3YS05MzRiLWMwZWQ0Mjg0MTZhZSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX04wME9kUlVHYSIsImNsaWVudF9pZCI6IjZnZnVoYTNqajR0a3E5am4zOG1sM3MwZWNwIiwib3JpZ2luX2p0aSI6ImRjYzJjZjlkLWVkMWMtNGFkMC04YzJhLTE0MzMzMDdjZDEwYiIsImV2ZW50X2lkIjoiYzRjZWVmMjgtNDk5MS00YjRlLWI2Y2UtZGVmOWY4N2M4NDYwIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY2NTg0MTczNCwiZXhwIjoxNjY1OTI4MTM0LCJpYXQiOjE2NjU4NDE3MzQsImp0aSI6IjMyZmM2NDgyLTEzMDMtNGM2MS04YTlkLWNjNTU5OTY0NGM5ZCIsInVzZXJuYW1lIjoicGsxMjMifQ.U1qlwx1K1TY_aOkrlUj7HtxFRx1wqH0LMjy7f_3Omdi7XOVsDwtKqXMPA1l2T6Iowin20sYW_QP0nzqaQKly9U-TS0sMQbewqg2sR7o67t8DuMH0Q8TRpr57zvIamujTtSmYx0I_r3zhlbKxFnY0FhLppimcAR0Gvroixczf5xhdEKtgo5Ixl558BweNADc7HoqzWlJVSBCNJkFSWgxBKgaTMsdIOGaHaFaNH8bYLGFyi4G_O1n7SbT1pKyer_Ya0CvuxOHHGLvjmdmWoaX0ofwvLA76eQcsVofbLVZeRjOYSRjEnVdGfStYbYiCHOy1tmGMLuj09e_kD3iirVPPCw"

@Resolver()
export class RemoveFromFollowingGraphqlResolver {
    constructor(private readonly commandBus: CommandBus,
    ) { }

    // @UseGuards(CongnitoAuthGuard)
    @Mutation(() => RemoveFromFollowingResponse)
    async removeFromFollowing(
        @Args('input') input: RemoveFromFollowingRequestDto,
    ): Promise<RemoveFromFollowingResponse> {
        try {
            const command = new RemoveFromFollowingCommand(input)
            const resp: any = await this.commandBus.execute(command)
            return { message: "Remove from following Successfull", isSuccess: true }
        } catch(err) {
            console.log("removeFromFollowing Resolver", err)
            return err
        }
    }
}