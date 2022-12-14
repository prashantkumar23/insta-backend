import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CongnitoAuthGuard } from '../../../1-user/auth.guard';

import { GetSpecificPostQuery } from './getspecificpost.query';
import { GetSpecificPostRequest } from './getspecificpost.request';
import { GetSpecificPostResponse } from './getspecificpost.response';


@Resolver()
export class GetSpecificPostGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  @UseGuards(CongnitoAuthGuard)
  @Query(() => GetSpecificPostResponse)
  async getSpecificPost(
    @Args('input') input: GetSpecificPostRequest,
  ): Promise<GetSpecificPostResponse> {
    try {
      const query = new GetSpecificPostQuery(input);
      const res = await this.queryBus.execute(query)

      return { message: "", isSuccess: true, post: res }
    } catch (err) {
      console.log("getSpecificPost Err", err)
      return { message: err.message, isSuccess: false, post: null }
    }

    // return users.map(user => new UserResponse(user));
  }
}
