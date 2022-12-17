import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CongnitoAuthGuard } from '../../../1-user/auth.guard';

import { GetUserPostQuery } from './getuserpost.query';
import { GetUserPost } from './getuserpost.request';
import { GetUserPostResponse } from './getuserpost.response';


@Resolver()
export class GetUserPostGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  @UseGuards(CongnitoAuthGuard)
  @Query(() => GetUserPostResponse)
  async getUserPost(
    @Args('input') input: GetUserPost,
  ): Promise<GetUserPostResponse> {
    try {
      const query = new GetUserPostQuery(input);
      const resp = await this.queryBus.execute(query)
      return { message: "", isSuccess: true, posts: resp, count: 5 }
    } catch (err) {
      return { message: "Error", isSuccess: false, posts: [], count: 0 }
    }

  }
}
