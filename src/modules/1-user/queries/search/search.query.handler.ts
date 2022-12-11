import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts/dist';
import { UserSchema } from '../../database/user.schema';
import { UserFactory } from '../../user.factory';
import { SearchQuery } from './search.query';

@QueryHandler(SearchQuery)
export class SearchQueryHandler implements IQueryHandler<SearchQuery> {
    constructor(
        private readonly userFactory: UserFactory,
    ) {
    }

    async execute({ searchRequest }: SearchQuery): Promise<Result<UserSchema[], Error>> {
        const { searchTerm } = searchRequest
        return await this.userFactory.search(searchTerm);
    }
}
