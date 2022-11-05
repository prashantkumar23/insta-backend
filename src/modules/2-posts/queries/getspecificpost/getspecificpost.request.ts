import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';

import { GetSpecificPost } from "../../../../interface-adapters/interfaces/post";

@ObjectType()
@InputType()
export class GetSpecificPostRequest implements GetSpecificPost {
    @Field()
    @Length(12)
    postId: string;

    @Field()
    @Length(12)
    userId: string;
}