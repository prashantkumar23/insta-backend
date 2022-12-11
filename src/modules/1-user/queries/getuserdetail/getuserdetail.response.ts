import { Field, ObjectType } from '@nestjs/graphql';
import { IGetUserDetailResponseGraphQL, IUserDetailReponseGraphQL } from '../../interfaces/getuserdetail.response';


@ObjectType()
export class UserDetail implements IUserDetailReponseGraphQL {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    pic: string;

    @Field()
    email: string;

    @Field()
    email_verified: boolean;

    @Field()
    numberOfPosts: number;

    @Field()
    numberOfFollowers: number;

    @Field()
    numberOfFollowings: number
}

@ObjectType()
export class GetUserDetailResponse implements IGetUserDetailResponseGraphQL {

    @Field(() => UserDetail, {nullable: true})
    user: UserDetail

    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
