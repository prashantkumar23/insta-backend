import { Field, ObjectType } from '@nestjs/graphql';
import { IGetUserRecommedationResponseGraphQL } from '../../interfaces/getusersrecommendation.response';

@ObjectType()
class UserRecommendation {
    @Field()
    _id: string;
    @Field()
    name: string;
    @Field()
    username: string;
    @Field()
    pic: string;
    @Field()
    numberOfPosts: number;

    @Field()
    numberOffollowings: number;
    @Field()
    numberOffollowers: number;

    @Field()
    followedByMe: boolean
}


@ObjectType()
export class GetOtherUserRecommendationResponse implements IGetUserRecommedationResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;

    @Field(() => [UserRecommendation] || null)
    users: UserRecommendation[] | null
}
