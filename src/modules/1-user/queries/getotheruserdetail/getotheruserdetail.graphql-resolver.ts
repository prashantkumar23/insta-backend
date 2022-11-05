import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CongnitoAuthGuard } from '../../auth.guard';

import { GetOtherUserDetailQuery } from './getotheruserdetail.query';
import { GetOtherUserDetail } from './getotheruserdetail.request';
import { GetOtherUserDetailResponse } from './getotheruserdetail.response';


@Resolver()
export class GetOtherUserDetailGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  // @(CongnitoAuthGuard)
  @Query(() => GetOtherUserDetailResponse)
  async getOtherUserDetail(
    @Args('input') input: GetOtherUserDetail,
  ): Promise<GetOtherUserDetailResponse> {
    const query = new GetOtherUserDetailQuery(input);
    const resp = await this.queryBus.execute(query)

    return { message: "getOtherUserDetail", isSuccess: true }
    // return users.map(user => new UserResponse(user));
  }
}
