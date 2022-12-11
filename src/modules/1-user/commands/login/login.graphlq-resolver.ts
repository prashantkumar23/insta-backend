import { Args, Context, GqlExecutionContext, GraphQLExecutionContext, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { Res, UseGuards } from '@nestjs/common'

import { LoginCommand } from './login.command'
import { LoginRequest } from './login.request.dto'
import { LoginResponse } from '../../response/login.response.dto'
import { CongnitoAuthGuard } from '../../auth.guard'
import { User } from '../../user.type'
import { CurrentUser } from '../../currentuser.decorator'

@Resolver()
export class LoginGraphqlResolver {
    constructor(private readonly commandBus: CommandBus,
    ) { }

    @Query(() => User, { nullable: true })
    @UseGuards(CongnitoAuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user.userDetails;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Context() context: any,
        @Args('input') input: LoginRequest,
        @Res({ passthrough: true }) response: any
    ): Promise<LoginResponse> {

        try {
            const command = new LoginCommand(input)
            const response = await this.commandBus.execute(command)
            const cookieOptions = {
                sameSite: "None",
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                maxAge: response.AuthenticationResult.ExpiresIn * 1000, // 1 day,
                // domain: process.env.NODE_ENV === "production" ? "https://insta-frontend-gules.vercel.app" : "localhost"
            }
            // console.log("Cookie Options", cookieOptions)
            // console.log("Cookie *******")
            // context.res.cookie("test", "test")

            context.res.cookie(
                'Authorization',
                response.AuthenticationResult.AccessToken, cookieOptions);
            context.res.cookie(
                'Idtoken',
                response.AuthenticationResult.IdToken, cookieOptions);



            context.res.header('Authorization',
                response.AuthenticationResult.AccessToken)

            context.res.header(
                'Idtoken',
                response.AuthenticationResult.IdToken);

            // console.log("response", response)
            return { message: "Login Successfull!", isSuccess: true }
        } catch (err) {
            console.log(err)
            return { message: err.message, isSuccess: false }
        }

    }
}


/* 


                    // context.res.header['x-auth-token'] = '134646'
        // console.log(context.res["x-auth-token"])
        // console.log("Response",)

        // res.cookies("Authorization", new LoginResponse(resp).AuthenticationResult.IdToken)
        // context.res.cookie("Authorization", "Smaple", {maxAge: 900000, httpOnly: true})
        // console.log("REsp", resp);
        // context.res.header('Authorization', new LoginResponse(resp).AuthenticationResult.IdToken);
        // console.log("Ctx resp",context.res)
        // const ctx = GqlExecutionContext.create(this.context);
        // const response = ctx.getContext().response
        // response.setCookie("token", new LoginResponse(resp).AuthenticationResult.IdToken)
        // res.set("authToken", new LoginResponse(resp).AuthenticationResult.IdToken)
        // res.setHeader("authtoken", new LoginResponse(resp).AuthenticationResult.IdToken)

*/