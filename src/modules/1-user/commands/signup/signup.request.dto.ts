import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
    IsEmail,
    MaxLength,
    MinLength,
} from 'class-validator';

import { SignUp } from "../../../../interface-adapters/interfaces/auth";

@ArgsType()
@InputType()
export class SignUpRequest implements SignUp {
    @MaxLength(50)
    @MinLength(3)
    @Field()
    readonly name: string;

    @MaxLength(350)
    @MinLength(5)
    @IsEmail()
    @Field()
    readonly email: string;

    @MaxLength(350)
    @MinLength(3)
    @Field()
    readonly username: string;


    @MaxLength(30)
    @MinLength(3)
    @Field()
    readonly password: string;


}