import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
    IsEmail,
} from 'class-validator';

import { SendCode } from "../../../../interface-adapters/interfaces/auth";

@ArgsType()
@InputType()
export class SendCodeRequest implements SendCode {

    @Field()
    @IsEmail()
    readonly email: string;

}