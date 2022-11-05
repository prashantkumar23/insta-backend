import { Field, ObjectType } from '@nestjs/graphql';
import { ILikePostResponse } from '../../interface/like.post.reponse.dto';

@ObjectType()
export class LikePostResponse implements ILikePostResponse {
    @Field()
    isSuccess: boolean
}
