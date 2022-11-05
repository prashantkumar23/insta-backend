import { ArgsType, Field, InputType } from '@nestjs/graphql'

import { Login } from "../../../../interface-adapters/interfaces/auth";

@ArgsType()
@InputType()
export class LoginRequest implements Login {


    @Field()
    readonly username: string;

    @Field()
    readonly password: string;


}