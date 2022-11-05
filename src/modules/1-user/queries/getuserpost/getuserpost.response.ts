import { Field, ObjectType } from '@nestjs/graphql';
import { IGetUserPostResponseGraphQL } from '../../interfaces/getuserpost.response';

@ObjectType()
export class GetUserPostResponse implements IGetUserPostResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
