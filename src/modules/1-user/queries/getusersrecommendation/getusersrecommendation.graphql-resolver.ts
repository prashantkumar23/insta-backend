import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CongnitoAuthGuard } from '../../auth.guard';

import { GetUserRecommendationQuery } from './getusersrecommendation.query';
import { GetUserRecommendation } from './getusersrecommendation.request';
import { GetOtherUserRecommendationResponse } from './getusersrecommendation.response';


@Resolver()
export class GetUserRecommendationGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  // @Auth(CongnitoAuthGuard)
  @Query(() => GetOtherUserRecommendationResponse)
  async getUserRecommendation(
    @Args('input') input: GetUserRecommendation,
  ): Promise<GetOtherUserRecommendationResponse> {
    try {
      const query = new GetUserRecommendationQuery(input);
      const res = await this.queryBus.execute(query)
      return { message: "", isSuccess: true, users: res }
    } catch (err) {
      return { message: err.message, isSuccess: false, users: null }
    }

  }
}
