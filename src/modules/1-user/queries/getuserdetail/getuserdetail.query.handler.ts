import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts/dist';
import { UserSchema } from '../../database/user.schema';
import { UserFactory } from '../../user.factory';
import { GetUserDetailQuery } from './getuserdetail.query';

@QueryHandler(GetUserDetailQuery)
export class GetUserDetailQueryHandler implements IQueryHandler<GetUserDetailQuery> {
    constructor(
        private readonly userFactory: UserFactory,
    ) {
    }

    async execute({ getUserDetailRequest }: GetUserDetailQuery): Promise<Result<UserSchema[], Error>> {
        try {
            const { username } = getUserDetailRequest
            let user = await this.userFactory.getUserDetail(username);

            user = {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                pic: user.pic,
                email_verified: user.email_verfied,
                numberOfPosts: user.numberOfPosts,
                numberOfFollowings: user.numberOffollowings,
                numberOfFollowers: user.numberOffollowers,
                followedByMe: user.followedByMe
            }   
            return user
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
