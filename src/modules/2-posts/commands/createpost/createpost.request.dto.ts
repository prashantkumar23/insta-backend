import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';
import { Schema } from 'mongoose';

import { CreatePostToMongo } from "../../../../interface-adapters/interfaces/post";

@ArgsType()
@InputType()
export class CreatePostRequestToMongo implements CreatePostToMongo {

    @Field()
    @Length(50)
    readonly userId: string;

    @Field()
    @Length(2200)
    readonly caption: string;

    @Field()
    readonly imageUrl: string | string[];


    @Field(() => [String])
    readonly s3bucketObjectIds: string[]

    @Field()
    readonly postUrl: string
}