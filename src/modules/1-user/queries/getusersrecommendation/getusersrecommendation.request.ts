import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { GetUserRecommendationRequest } from "../../../../interface-adapters/interfaces/user";


@ObjectType()
@InputType()
export class GetUserRecommendation implements GetUserRecommendationRequest {
    @Field()
    limit: number;

    @Field()
    userId: string;
}