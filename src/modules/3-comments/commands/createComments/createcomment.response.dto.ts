import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ICreateCommentResponse } from "../../interface/createcomment.reponse.dto";


@ObjectType()
export class CreateCommentResponseGraphql implements ICreateCommentResponse {
    @Field()
    readonly _id: string

    @Field()
    readonly whoCommented: string;

    @Field()
    readonly postId: string;

    @Field()
    readonly comment: string

    @Field()
    readonly likes: number

    @Field()
    readonly wasLikeByMe: boolean
}