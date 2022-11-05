import { Field, InputType, ObjectType } from '@nestjs/graphql'

import { UnlikePost } from "../../../../interface-adapters/interfaces/post";


@ObjectType()
@InputType()
export class UnLikePostRequest implements UnlikePost {
    
    @Field()
    readonly postId: string;

    @Field()
    readonly userId: string;
}