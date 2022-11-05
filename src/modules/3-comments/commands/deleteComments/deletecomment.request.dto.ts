import { ArgsType, Field, InputType } from '@nestjs/graphql'

import { DeleteComment } from '../../../../interface-adapters/interfaces/comment';


@ArgsType()
@InputType()
export class DeleteCommentRequest implements DeleteComment {

    @Field()
    readonly commentId: string;

    @Field()
    readonly postId: string;
}