import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts/dist';
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
            let user = await this.userFactory.getOtherUserDetail(username, userId);
            
            user = {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                pic: user.pic,
                email_verified: user.email_verfied,
                numberOfPosts: user.numberOfPosts,
                // needs to interchange data because of a bug
                numberOffollowings: user.numberOffollowers,
                numberOffollowers: user.numberOffollowings,
                followedByMe: user.followedByMe
            }

            return user
        } catch (err) {
            console.log(err)
            return err
        }


    }
}
