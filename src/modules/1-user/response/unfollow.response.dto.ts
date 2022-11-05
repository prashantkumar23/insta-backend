import { Field, ObjectType } from '@nestjs/graphql';
import { IUnfollowResponseGraphQL } from '../interfaces/unfollow.response';

@ObjectType()
export class UnfollowResponse implements IUnfollowResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
