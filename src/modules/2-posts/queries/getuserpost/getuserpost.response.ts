import { Field, ObjectType } from '@nestjs/graphql';
import { IGetUserPostResponseGraphQL } from '../../../1-user/interfaces/getuserpost.response';


@ObjectType()
export class UserPost {
    @Field()
    _id: string

    @Field()
    imageUrl: string
}

@ObjectType()
export class GetUserPostResponse implements IGetUserPostResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;

    @Field(() => [UserPost] || [])
    posts: UserPost[] | []

    @Field()
    count: number
}
