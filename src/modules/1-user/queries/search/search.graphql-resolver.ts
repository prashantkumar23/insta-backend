import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CongnitoAuthGuard } from '../../auth.guard';

import { SearchQuery } from './search.query';
import { Search } from './search.request';
import { SearchResponse } from './search.response';


@Resolver()
export class SearchGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  @UseGuards(CongnitoAuthGuard)
  @Query(() => SearchResponse)
  async search(
    @Args('input') input: Search,
  ): Promise<SearchResponse> {
    const query = new SearchQuery(input);
    const resp = await this.queryBus.execute(query)

    // console.log("POSTS", resp)
    return { message: "", isSuccess: true, searchResult: JSON.stringify(resp) }
  }
}
