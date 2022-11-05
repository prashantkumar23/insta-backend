import {ArgsType, Field, InputType} from '@nestjs/graphql'
import {
    IsEmail,
    Length,
    MaxLength,
    MinLength,
} from 'class-validator';

import { ConfirmCode } from "../../../../interface-adapters/interfaces/auth";

@ArgsType()
@InputType()
export class ConfirmCodeRequest implements ConfirmCode {


    @Length(6)
    @IsEmail()
    @Field()
    readonly code: string;

    @MaxLength(350)
    @MinLength(3)
    @Field()
    readonly username: string;


}