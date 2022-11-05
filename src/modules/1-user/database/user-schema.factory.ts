import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntitySchemaFactory } from '../../../infrastructure/database/entity-schema.factory';

import { User } from '../User';
import { UserSchema } from './user.schema';

@Injectable()
export class UserSchemaFactory
  implements EntitySchemaFactory<UserSchema, User> {
  create(user: User): UserSchema {
    return {
      _id: new ObjectId(user.getId()),
      name: user.getName(),
      email: user.getEmail(),
      username: user.getUsername(),
      pic: user.getPic(),
      email_verfied: user.getEmailVerification(),
      numberOfPosts: user.getNumberOfPosts(),
      numberOffollowings: user.getNumberOfFollowings(),
      numberOffollowers: user.getNumberOfFollowers(),
      followersList: user.getFollowersList(),
      followingList: user.getFollowingList(),
      followedByMe: user.getFollowedByMe(),
      postIds: user.getPostIds()
    };
  }

  createFromSchema(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toHexString(),
      userSchema.name,
      userSchema.email,
      userSchema.username,
      userSchema.pic,
      userSchema.email_verfied,
      userSchema.numberOfPosts,
      userSchema.numberOffollowers,
      userSchema.numberOffollowings,
      userSchema.followersList,
      userSchema.followingList,
      userSchema.followedByMe,
      userSchema.postIds
    );
  }
}
