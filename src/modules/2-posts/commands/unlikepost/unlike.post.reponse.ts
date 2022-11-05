import { Field, ObjectType } from '@nestjs/graphql';
import { IUnLikePostResponse } from '../../interface/unlike.post,response.dto';

@ObjectType()
export class UnlikePostResponse implements IUnLikePostResponse {
    @Field()
    isSuccess: boolean
}
