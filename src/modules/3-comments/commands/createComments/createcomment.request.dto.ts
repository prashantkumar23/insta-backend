import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Length } from "class-validator";

import { CreateComment } from "../../../../interface-adapters/interfaces/comment";

@InputType()
export class CreateCommentRequest implements CreateComment {
    @Field()
    readonly postId: string;

    @Field()
    readonly whoCommented: string;

    @Field()
    @Length(500)
    readonly comment: string

    @Field()
    readonly wasLikeByMe: boolean

}