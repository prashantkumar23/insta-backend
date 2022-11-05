import {  Field, InputType, ObjectType } from '@nestjs/graphql'
import {
    IsNumber,
    IsString,
    Length,
    MaxLength,
} from 'class-validator';

import { GetFeedPost } from "../../../../interface-adapters/interfaces/post";


@ObjectType()
@InputType()
export class GetFeedPostRequest implements GetFeedPost {
    @Field()
    @IsString()
    @MaxLength(12)
    userId: string

    @Field()
    @IsNumber()
    limit: number

    @Field()
    @IsNumber()
    skip: number
}