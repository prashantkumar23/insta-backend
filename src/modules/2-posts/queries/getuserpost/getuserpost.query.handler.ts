import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts/dist';
import { PostSchema } from '../../database/post.schema';
import { PostFactory } from '../../post.factory';
import { GetUserPostQuery } from './getuserpost.query';

@QueryHandler(GetUserPostQuery)
export class GetUserPostQueryHandler implements IQueryHandler<GetUserPostQuery> {
    constructor(
        private readonly postFactory: PostFactory,
    ) {
    }

    async execute({ getUserPostRequest }: GetUserPostQuery): Promise<Result<PostSchema[], Error>> {
        try {
            const { username, limit, skip } = getUserPostRequest
            const posts = await this.postFactory.getUserPost(username, limit, skip);
            return posts
        } catch (err) {
            console.log(err)
            return err
        }
    }
}
