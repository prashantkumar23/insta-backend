import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';

import { GetUserPostRequest } from "../../../../interface-adapters/interfaces/user";


@ObjectType()
@InputType()
export class GetUserPost implements GetUserPostRequest {
    @Field()
    @Length(50)
    username: string;
}