import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { CongnitoAuthGuard } from '../../auth.guard';
import { CurrentUser } from '../../currentuser.decorator';
import { User } from '../../user.type';

import { GetUserDetailQuery } from './getuserdetail.query';
// import { GetUserDetail } from './getuserdetail.request';
import { GetUserDetailResponse } from './getuserdetail.response';


@Resolver()
export class GetUserDetailGraphqlResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  @UseGuards(CongnitoAuthGuard)
  @Query(() => GetUserDetailResponse, {nullable: true})
  async getUserDetail(
    @CurrentUser() user: User
  ): Promise<GetUserDetailResponse> {
    try {
      if(!user.userDetails) {
        return { message: "Unauthorized", isSuccess: false, user: null }
      }

      const query = new GetUserDetailQuery({username: user.userDetails.username});
      const userDetail = await this.queryBus.execute(query)
      
      return { message: "User Details", isSuccess: true, user: userDetail }
    } catch(err) {
      console.log("Err", err)
      return { message: err.message, isSuccess: false, user: null }
    }
  }
}
