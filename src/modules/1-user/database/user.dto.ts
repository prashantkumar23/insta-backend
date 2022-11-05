import { ObjectId} from 'mongodb';
import { PostSchema } from '../../2-posts/database/post.schema';
import { UserSchema } from './user.schema';

export class UserDto {
  readonly _id: ObjectId;
  readonly name: string;
  readonly username: string;
  readonly pic: string;
  readonly email: string;
  readonly email_verfied: boolean;
  readonly numberOfPosts: number;
  readonly numberOffollowers: number;
  readonly numberOffollowings: number;
  readonly followersList: UserSchema[] | [];
  readonly followingList: UserSchema[] | [];
  readonly followedByMe: boolean;
  readonly postIds: PostSchema[] | []
}
