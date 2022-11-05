import { Field, ObjectType } from '@nestjs/graphql';
import { IRemoveFromFollowingResponseGraphQL } from '../interfaces/removefromfollowing.response';

@ObjectType()
export class RemoveFromFollowingResponse implements IRemoveFromFollowingResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
