import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';

import { UpdateProfileImageToMongo } from "../../../../interface-adapters/interfaces/user";

@ArgsType()
@InputType()
export class UpdateProfileImageToMongoRequest implements UpdateProfileImageToMongo {

    @Field()
    @Length(50)
    readonly pic: string;

    @Field()
    @Length(50)
    readonly userId: string;
}