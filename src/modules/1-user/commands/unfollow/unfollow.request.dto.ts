import {ArgsType, Field, InputType} from '@nestjs/graphql'

import { UnfollowRequest } from "../../../../interface-adapters/interfaces/user";

@ArgsType()
@InputType()
export class UnfollowRequestDTO implements UnfollowRequest {
    @Field()
    readonly whoToUnfollow: string;

    @Field()
    readonly username: string
}