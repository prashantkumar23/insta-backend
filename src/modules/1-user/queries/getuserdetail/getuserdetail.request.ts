import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';

import { GetUserDetailRequest } from "../../../../interface-adapters/interfaces/user";


@ObjectType()
@InputType()
export class GetUserDetail implements GetUserDetailRequest {
    @Field()
    @Length(50)
    username: string;
}