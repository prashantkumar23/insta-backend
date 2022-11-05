import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts/dist';
import { UserSchema } from '../../database/user.schema';
import { UserFactory } from '../../user.factory';
import { GetOtherUserDetailQuery } from './getotheruserdetail.query';

@QueryHandler(GetOtherUserDetailQuery)
export class GetOtherUserDetailQueryHandler implements IQueryHandler<GetOtherUserDetailQuery> {
    constructor(
        private readonly userFactory: UserFactory,
    ) {
    }

    async execute({ getOtherUserDetailRequest }: GetOtherUserDetailQuery): Promise<Result<UserSchema[], Error>> {
        try {
            const { username, userId } = getOtherUserDetailRequest
            const user = await this.userFactory.getOtherUserDetail(username, userId);
            return user
        } catch (err) {
            console.log(err)
            return err
        }


    }
}
