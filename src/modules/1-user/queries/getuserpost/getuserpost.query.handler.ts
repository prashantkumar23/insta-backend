import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts/dist';
import { UserSchema } from '../../database/user.schema';
import { UserFactory } from '../../user.factory';
import { GetUserPostQuery } from './getuserpost.query';

@QueryHandler(GetUserPostQuery)
export class GetUserPostQueryHandler implements IQueryHandler<GetUserPostQuery> {
    constructor(
        private readonly userFactory: UserFactory,
    ) {
    }

    async execute({ getUserPostRequest }: GetUserPostQuery): Promise<Result<UserSchema[], Error>> {
        try {
            const { username } = getUserPostRequest
            const user = await this.userFactory.getUserPost(username);
            return user
        } catch (err) {
            console.log(err)
            return err
        }


    }
}
