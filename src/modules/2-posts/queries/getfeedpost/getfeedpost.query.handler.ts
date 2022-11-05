import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts/dist';
import { PostFactory } from '../../post.factory';
import { GetFeedPostQuery } from './getfeedpost.query';

@QueryHandler(GetFeedPostQuery)
export class GetFeedPostQueryHandler implements IQueryHandler<GetFeedPostQuery> {
    constructor(
        private readonly postFactory: PostFactory,
    ) {
    }

    async execute({ getFeedPostRequest }: GetFeedPostQuery): Promise<Result<any, Error>> {
        const { userId, limit, skip } = getFeedPostRequest
        const res = await this.postFactory.getFeedPost(userId, limit, skip);
        return res
    }
}
