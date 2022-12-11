import { Field, ObjectType } from '@nestjs/graphql';
import { IGetOtherUserDetailResponseGraphQL, IOtherUserDetailReponseGraphQL } from '../../interfaces/getotheruserdetail.response';

@ObjectType()
export class OtherUserDetail implements IOtherUserDetailReponseGraphQL {
    @Field({nullable: true})
    _id: string;

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    username: string;

    @Field({nullable: true})
    pic: string;

    @Field({nullable: true})
    email: string;

    @Field({nullable: true})
    email_verified: boolean;

    @Field({nullable: true})
    numberOfPosts: number;

    @Field({nullable: true})
    numberOfFollowers: number;

    @Field({nullable: true})
    numberOfFollowings: number
}

@ObjectType()
export class GetOtherUserDetailResponse implements IGetOtherUserDetailResponseGraphQL {

    @Field(() => OtherUserDetail, { nullable: true })
    user: OtherUserDetail

    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
