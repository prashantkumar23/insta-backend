import { Context, Mutation, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { UseGuards } from '@nestjs/common'

import { LogoutCommand } from './logout.command'
import { LogoutResponse } from '../../response/logout.response.dto'
import { CongnitoAuthGuard } from '../../auth.guard'



@Resolver()
export class LogoutGraphqlResolver {
    constructor(private readonly commandBus: CommandBus,
    ) { }

    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => LogoutResponse)
    async logout(
        @Context() context: any,
    ): Promise<LogoutResponse> {
        try {
            
            const obj = {}
            if (context.req.headers.cookie) {
                const tokensNew = context.req.headers.cookie.split("; ")
                tokensNew.map((ele: string) => {
                    const key = ele.split("=")[0]
                    const value = ele.split("=")[1]

                    obj[key] = value;
                })
            }

            const accessToken = obj["Authorization"]
            const command = new LogoutCommand({ accessToken })
            await this.commandBus.execute(command)
            // console.log("Resp Logout", resp);
            context.res.clearCookie("Authorization")
            context.res.clearCookie("Idtoken")
            return { message: "Logout Successfull", isSuccess: true }
        } catch (err: any) {
            return { message: "Something went wrong", isSuccess: false }
        }
    }
}