import { ArgsType, Field, InputType } from '@nestjs/graphql'

import { RemoveFromFollowingRequest } from "../../../../interface-adapters/interfaces/user";

@ArgsType()
@InputType()
export class RemoveFromFollowingRequestDto implements RemoveFromFollowingRequest {
    @Field()
    readonly userId: string;

    @Field()
    readonly whoToRemove: string;
}