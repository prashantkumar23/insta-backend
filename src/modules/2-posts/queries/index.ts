import { GetFeedPostQueryHandler } from './getfeedpost/getfeedpost.query.handler';
import { GetSpecificPostQueryHandler } from './getspecificpost/getspecificpost.query.handler';

export const PostQueryHandlers = [
    GetFeedPostQueryHandler,
    GetSpecificPostQueryHandler
];
