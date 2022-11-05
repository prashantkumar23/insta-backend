import { GetOtherUserDetailQueryHandler } from './getotheruserdetail/getotheruserdetail.query.handler';
import { GetUserDetailQueryHandler } from './getuserdetail/getuserdetail.query.handler';
import { GetUserPostQueryHandler } from './getuserpost/getuserpost.query.handler';
import { GetUserRecommendationQueryHandler } from './getusersrecommendation/getusersrecommendation.query.handler';
import { SearchQueryHandler } from './search/search.query.handler';

export const UserQueryHandlers = [
    SearchQueryHandler,
    GetUserDetailQueryHandler,
    GetUserPostQueryHandler,
    GetOtherUserDetailQueryHandler,
    GetUserRecommendationQueryHandler
];
