import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';

import { GetOtherUserDetailRequest } from "../../../../interface-adapters/interfaces/user";


@ObjectType()
@InputType()
export class GetOtherUserDetail implements GetOtherUserDetailRequest {
    @Field()
    @Length(50)
    username: string;

    @Field()
    @Length(50)
    userId: string;
}