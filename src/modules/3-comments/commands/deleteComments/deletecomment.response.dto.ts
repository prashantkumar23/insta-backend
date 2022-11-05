import { Field, ObjectType } from "@nestjs/graphql";
import { IDeleteCommentResponse } from "../../interface/deletecomment.reponse.dto";


@ObjectType()
export class DeleteCommentResponseGraphql implements IDeleteCommentResponse {
    @Field()
    readonly message: string
}