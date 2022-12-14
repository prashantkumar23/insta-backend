import {
  Args,
  Context,
  GqlExecutionContext,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { CommandBus } from "@nestjs/cqrs";
import { Res, UseGuards } from "@nestjs/common";

import { LoginCommand } from "./login.command";
import { LoginRequest } from "./login.request.dto";
import { LoginResponse } from "../../response/login.response.dto";
import { CongnitoAuthGuard } from "../../auth.guard";
import { User } from "../../user.type";
import { CurrentUser } from "../../currentuser.decorator";

@Resolver()
export class LoginGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => User, { nullable: true })
  @UseGuards(CongnitoAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user.userDetails;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Context() context: any,
    @Args("input") input: LoginRequest,
    @Res({ passthrough: true }) response: any
  ): Promise<LoginResponse> {
    try {
      const command = new LoginCommand(input);
      const response = await this.commandBus.execute(command);
      const cookieOptions = {
        sameSite: "Strict",
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: response.AuthenticationResult.ExpiresIn * 1000, // 1 day,
        domain: process.env.NODE_ENV === "production" ? ".railway.app" : "localhost"
      };
  
      context.res.cookie(
        "Authorization",
        response.AuthenticationResult.AccessToken,
        cookieOptions
      );
      context.res.cookie(
        "Idtoken",
        response.AuthenticationResult.IdToken,
        cookieOptions
      );

    //   context.res.header(
    //     "Set-Cookie",
    //     "mycookie=hello; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=99999999;"
    //   );
    //   context.res.header(
    //     "Set-Cookie",
    //     `Authorization=${response.AuthenticationResult.AccessToken}; Secure=${
    //       process.env.NODE_ENV === "production" ? true : false
    //     }; HttpOnly; SameSite=None; Path=/; Max-age=${response.AuthenticationResult.ExpiresIn * 1000}`
    //   );
    //   context.res.header(
    //     "Set-Cookie",
    //     `Idtoken=${response.AuthenticationResult.IdToken}; Secure=${
    //       process.env.NODE_ENV === "production" ? true : false
    //     }; HttpOnly; SameSite=None; Path=/; Max-age=${response.AuthenticationResult.ExpiresIn * 1000}`
    //   );

    //   context.res.header("Idtoken", response.AuthenticationResult.IdToken);

      // console.log("response", response)
      return { message: "Login Successfull!", isSuccess: true };
    } catch (err) {
      console.log(err);
      return { message: err.message, isSuccess: false };
    }
  }
}

