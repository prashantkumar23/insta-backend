import { Field, InputType, ObjectType } from '@nestjs/graphql'

import { DeletePost } from "../../../../interface-adapters/interfaces/post";


@ObjectType()
@InputType()
export class DeletePostRequest implements DeletePost {
    @Field()
    readonly postId: string;

    @Field(() => [String])
    readonly s3bucketObjectIds: string[]
}