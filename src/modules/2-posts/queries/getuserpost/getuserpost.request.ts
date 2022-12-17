import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
    IsNumber,
    Length,
} from 'class-validator';

import { GetUserPostRequest } from "../../../../interface-adapters/interfaces/user";


@ObjectType()
@InputType()
export class GetUserPost implements GetUserPostRequest {
    @Field()
    @Length(50)
    username: string;

    @Field()
    @IsNumber()
    limit: number;

    @Field()
    @IsNumber()
    skip: number;
}