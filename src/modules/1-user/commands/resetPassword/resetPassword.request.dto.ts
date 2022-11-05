import { ArgsType, Field, InputType } from '@nestjs/graphql'

import { ResetPassword } from "../../../../interface-adapters/interfaces/auth";

@ArgsType()
@InputType()
export class ResetPasswordRequest implements ResetPassword {

    @Field()
    readonly username: string;

    @Field()
    readonly code: string;

    @Field()
    readonly newPassword: string;

}