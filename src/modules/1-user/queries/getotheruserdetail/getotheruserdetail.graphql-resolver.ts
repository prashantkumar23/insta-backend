import { UseGuards } from '@nestjs/common';
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

  @UseGuards(CongnitoAuthGuard)
  @Query(() => GetOtherUserDetailResponse, { nullable: true })
  async getOtherUserDetail(
    @Args('input') input: GetOtherUserDetail,
  ): Promise<GetOtherUserDetailResponse> {
    try {
      const query = new GetOtherUserDetailQuery(input);
      const resp = await this.queryBus.execute(query)

      return { message: "", isSuccess: true, user: resp }
    } catch (err) {
      console.log("Error in other user detail", err)
      return { message: "Error", isSuccess: true, user: null }
    }
    // return users.map(user => new UserResponse(user));
  }
}
