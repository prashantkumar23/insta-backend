import { Field, ObjectType } from '@nestjs/graphql';
import { IGetSpecificPostReponse } from '../../interface/getspecificpost.response.dto';


@ObjectType()
class SpecificPostUser {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    pic: string;
}

@ObjectType()
class SpecificPostComment {

    @Field()
    _id: string;

    @Field()
    comment: string;

    @Field(() => SpecificPostUser)
    whoCommented: SpecificPostUser

}

@ObjectType()
class SpecificPost {
    @Field()
    _id: string;

    @Field(() => SpecificPostUser)
    userId: SpecificPostUser

    @Field()
    imageUrl: string;

    @Field()
    caption: string;

    @Field()
    likes: number;

    @Field()
    comments: number;

    @Field(() => [SpecificPostComment] || [])
    commentIds: SpecificPostComment[] | [];

    @Field()
    createdAt: string;

    @Field()
    wasLikeByMe: boolean;

    @Field()
    postUrl: string;
}

@ObjectType()
export class GetSpecificPostResponse implements IGetSpecificPostReponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;

    @Field(() => SpecificPost || null)
    post: SpecificPost | null;
}
