import {ArgsType, Field, InputType} from '@nestjs/graphql'

import { FollowRequest } from "../../../../interface-adapters/interfaces/user";

@ArgsType()
@InputType()
export class FollowRequestDTO implements FollowRequest {
    @Field()
    readonly whoToFollow: string;

    @Field()
    readonly username: string
}