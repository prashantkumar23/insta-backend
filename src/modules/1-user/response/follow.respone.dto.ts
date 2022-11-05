import { Field, ObjectType } from '@nestjs/graphql';
import { IFollowResponseGraphQL } from '../interfaces/follow.response';

@ObjectType()
export class FollowResponse implements IFollowResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
