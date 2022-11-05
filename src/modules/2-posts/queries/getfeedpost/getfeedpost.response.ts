import { Field, ObjectType } from '@nestjs/graphql';
import { IGetFeedPostResponse } from '../../interface/get.feed.post.response.dto';

@ObjectType()
export class PostUser {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    pic: string;
}


@ObjectType()
export class FeedPost {
    @Field()
    id: string

    @Field()
    caption: string

    @Field()
    imageUrl: string

    @Field()
    likes: number

    @Field()
    comments: number;

    @Field()
    createdAt: string;

    @Field(() => PostUser)
    user: PostUser

    @Field()
    wasLikeByMe: boolean;
}


@ObjectType()
export class GetFeedPostResponse implements IGetFeedPostResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;

    @Field(() => [FeedPost] || [])
    posts: FeedPost[] | []

    @Field()
    count: number
}
