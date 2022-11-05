import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {  Result } from 'oxide.ts/dist';
import { UserSchema } from '../../database/user.schema';
import { UserFactory } from '../../user.factory';
import { GetUserRecommendationQuery } from './getusersrecommendation.query';

@QueryHandler(GetUserRecommendationQuery)
export class GetUserRecommendationQueryHandler implements IQueryHandler<GetUserRecommendationQuery> {
    constructor(
        private readonly userFactory: UserFactory,
    ) {
    }

    async execute({ getUserRecommendationRequest }: GetUserRecommendationQuery): Promise<Result<UserSchema[], Error>> {
        try {
            const { limit, userId } = getUserRecommendationRequest
            const user = await this.userFactory.getUserRecommendation(limit, userId);
            return user
        } catch (err) {
            console.log(err)
            return err
        }
    }
}
