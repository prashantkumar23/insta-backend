import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SearchQuery } from './search.query';
import { Search } from './search.request';
import { SearchResponse } from './search.response';


@Resolver()
export class SearchGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
    ) {}

  @Query(() => SearchResponse)
  async search(
    @Args('input') input: Search,
  ): Promise<SearchResponse> {
    const query = new SearchQuery(input);
    const resp = await this.queryBus.execute(query)

    console.log("POSTS", resp)
    return {message: "Hey", isSuccess: true}
    // return users.map(user => new UserResponse(user));
  }
}
