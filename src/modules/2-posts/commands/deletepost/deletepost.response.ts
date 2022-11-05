import { Field, ObjectType } from '@nestjs/graphql';
import { IDeletePostResponse } from '../../interface/delete.post.response.dto';

@ObjectType()
export class DeletePostResponse implements IDeletePostResponse {
    @Field()
    isSuccess: boolean

    @Field()
    message: string
}
