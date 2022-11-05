import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';
import { GraphQLUpload, Upload } from 'graphql-upload';

import { CreatePost } from "../../../../interface-adapters/interfaces/post";


@ObjectType()
@InputType()
export class CreatePostFromUserRequest implements CreatePost {
    @Field()
    readonly userId: string;

    @Field()
    readonly username: string;

    @Field()
    @Length(2200)
    readonly caption: string;

    @Field(() => GraphQLUpload)
    readonly file: Upload;

}