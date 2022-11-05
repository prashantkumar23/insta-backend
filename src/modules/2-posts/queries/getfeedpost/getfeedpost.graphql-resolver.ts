import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GetFeedPostQuery } from './getfeedpost.query';
import { GetFeedPostRequest } from './getfeedpost.request';
import { GetFeedPostResponse } from './getfeedpost.response';


@Resolver()
export class GetFeedPostGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  @Query(() => GetFeedPostResponse)
  async getFeedPost(
    @Args('input') input: GetFeedPostRequest,
  ): Promise<GetFeedPostResponse> {
    try {
      const query = new GetFeedPostQuery(input);
      const res = await this.queryBus.execute(query)

      return { message: "", isSuccess: true, posts: res.posts, count: res.count }

    } catch (err) {
      return { message: err.message, isSuccess: false, posts: [], count: 0 }
    }
  }
}
