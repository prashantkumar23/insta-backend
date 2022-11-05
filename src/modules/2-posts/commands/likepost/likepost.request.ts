import { Field, InputType, ObjectType } from '@nestjs/graphql'

import { LikePost } from "../../../../interface-adapters/interfaces/post";


@ObjectType()
@InputType()
export class LikePostRequest implements LikePost {
    @Field()
    readonly postId: string;

    @Field()
    readonly userId: string;
}