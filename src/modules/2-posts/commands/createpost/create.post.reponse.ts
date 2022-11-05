import { Field, ObjectType } from '@nestjs/graphql';
import { ICreatePostResponse } from '../../interface/create.post.response.dto';

@ObjectType()
export class CreatePostResponse implements ICreatePostResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean
}
