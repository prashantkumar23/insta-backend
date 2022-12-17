import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts/dist';
import { PostFactory } from '../../post.factory';
import { GetSpecificPostQuery } from './getspecificpost.query';

@QueryHandler(GetSpecificPostQuery)
export class GetSpecificPostQueryHandler implements IQueryHandler<GetSpecificPostQuery> {
    constructor(
        private readonly postFactory: PostFactory,
    ) {
    }

    async execute({getSpecificPostRequest}: GetSpecificPostQuery): Promise<Result<any, Error>> {
        const {postId, userId} = getSpecificPostRequest
        const post = await this.postFactory.getSpecificPost(postId, userId);
        return post
    }
}
