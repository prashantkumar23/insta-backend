import { ArgsType, Field, InputType } from '@nestjs/graphql'

import { Logout } from "../../../../interface-adapters/interfaces/auth";

@ArgsType()
@InputType()
export class LogoutRequest implements Logout {
    @Field()
    readonly accessToken: string;
}