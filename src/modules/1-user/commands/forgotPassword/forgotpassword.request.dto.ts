import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
    IsEmail,
} from 'class-validator';

import { ForgotPassword } from "../../../../interface-adapters/interfaces/auth";

@ArgsType()
@InputType()
export class ForgotPasswordRequest implements ForgotPassword {

    @Field()
    readonly username: string;

}