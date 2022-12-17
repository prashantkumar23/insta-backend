import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import mongoose, { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { UserSchema } from '../../modules/1-user/database/user.schema';
import { EntityRepository } from './entity.repository';

import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> extends EntityRepository<TSchema, TEntity> {

  // ************ General **********************

  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ _id: new ObjectId(id) } as FilterQuery<TSchema>);
  }


  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndReplace(
      { _id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }

  async search(searchTerm: string): Promise<any> {
    try {
      const res = await this.searchFunc({ searchTerm });
      return res
    } catch (err) {
      console.log("Search", err)
      return err
    }
  }



  // **************************** User ******************************

  async findOneAndUpdateByUsername(username: string, email_verfied: boolean): Promise<any> {
    try {
      const res = await this.findOneAndUpdate(
        { username: username } as FilterQuery<TSchema>,
        { email_verfied: email_verfied } as UpdateQuery<TSchema>
      );
      return res
    } catch (err) {
      console.log("findOneAndUpdateByUsername", err)
      return err
    }
  }

  async findOneAndUpdateNumberOfPostsAndIds(username: string, postId: string): Promise<any> {
    try {
      const res = await this.findOneAndUpdate(
        { username: username } as FilterQuery<TSchema>,
        //@ts-ignore
        { $inc: { numberOfPosts: 1 }, $push: { postIds: postId } }
      );
      return res
    } catch (err) {
      console.log("findOneAndUpdateNumberOfPostsAndIds", err)
      return err
    }
  }


  async follow(username: string, whoToFollow: string): Promise<any> {
    try {
      const res = await this.followandUnfollowUpdate(
        { _id: new ObjectId(username) },
        //@ts-ignore
        { $push: { followingList: whoToFollow }, $inc: { numberOffollowings: 1 } },
        { _id: new ObjectId(whoToFollow) },
        { $push: { followersList: username }, $inc: { numberOffollowers: 1 } }
      )
      return res
    } catch (err) {
      console.log("follow", err)
      return
    }
  }


  async unfollow(id: string, whoToUnfollow: string): Promise<any> {
    try {
      const res = await this.followandUnfollowUpdate(
        { _id: new ObjectId(id) },
        //@ts-ignore
        { $pull: { followingList: new ObjectId(whoToUnfollow) }, $inc: { numberOffollowings: -1 } },
        { _id: new ObjectId(whoToUnfollow) },
        { $pull: { followersList: new ObjectId(id) }, $inc: { numberOffollowers: -1 } }
      )

      // const t = await this.findOneAndUpdate({ _id: new ObjectId(id) },
      //   //@ts-ignore
      //   { $pull: { followingList: new ObjectId(whoToUnfollow) }, $inc: { numberOffollowings: -1 } })

      // // const s = await this.findOneAndUpdate({ _id: new ObjectId(whoToUnfollow) },
      // //   //@ts-ignore
      // //   { $pull: { followersList: new ObjectId(id) }, $inc: { numberOffollowers: -1 } }
      // // )

      // console.log("T S", t, )
      return res
    } catch (err) {
      console.log("unfollow", err)
      return err
    }
  }

  // ********************** TODO: Mot Working. Need Debugging
  async removeFromFollowing(userId: string, whoToRemove: string): Promise<any> {
    try {
      const res = await this.followandUnfollowUpdate(
        { _id: new ObjectId(userId) },
        //@ts-ignore
        { $pull: { followersList: whoToRemove }, $inc: { numberOffollowings: -1 } },
        { _id: new ObjectId(whoToRemove) },
        { $pull: { followingList: userId }, $inc: { numberOffollowers: -1 } }
      )
      console.log("rrremoveFromFollowing Res", res)
      return res
    } catch (err) {
      console.log("removeFromFollowing", err)
      return err
    }
  }

  async checkUserExists(username: string, updateFilterQuery?: mongoose.UpdateQuery<TSchema>, email?: string): Promise<any> {
    try {
      const res = await this.findOne<UserSchema>(
        {
          $or: [
            { "username": { $eq: username.trim() } },
            { "email": { $eq: email.trim() } },
          ]
        },
        updateFilterQuery
      )
      // console.log("res", res)
      return res
    } catch (err) {
      console.log("getUserDetail", err)
      return err
    }
  }


  async getUserDetail(username: string, updateFilterQuery?: mongoose.UpdateQuery<TSchema>): Promise<any> {
    try {
      const res = await this.findOne<UserSchema>(
        {
          username
        },
        updateFilterQuery
      )
      // console.log("res", res)
      return res
    } catch (err) {
      console.log("getUserDetail", err)
      return err
    }
  }

  // ********************** TODO: Find Better way to query it
  async getOtherUserDetail(username: string, userId: string): Promise<any> {
    try {

      let res: any = await this.findOne(
        { username } as FilterQuery<TSchema>,
        { postIds: 0 }
      )

      if (!res) return {}
      // res = { ...res }
      // const found = res.followingList.find((ele) => ele.toString() === userId)

      // if (found) {
      //   return { ...res, followedByMe: true }
      // }

      // return { ...res, followedByMe: false }
      return res
    } catch (err) {
      console.log("getOtherUserDetail", err)
      return err
    }

    /*


    findOne({
      _id: new ObjectId(userId)
    }, {
      $in : { followingList: new ObjectId(userId) }
    })

    db.users.aggregate[
      {
        $match: {_id: new ObjectId(userId)}
      },
      {
        $in : { followingList: new ObjectId(userId) }
      }
    ]

    */
  }

  async getUserRecommendation(limit: number, userId: string): Promise<any> {
    try {
      console.log("User Id", userId)
      const res = await this.find(
        {
          _id: { $ne: new ObjectId(userId) },
          // followersList: { $nin: new ObjectId(userId) }
        },
        { postIds: 0,followingList: 0, email_verfied: 0, email: 0 },
        limit
      )

      const users = res.map((user) => {
        //@ts-ignore
        if(user.followersList) {
          //@ts-ignore
            const found = user.followersList.find((ele) => ele.toString() === userId) ? true : false;
            return {
              ...user,
              followedByMe: found
            }  
        }

        return user;
      })


      // console.log("getUserRecommendation", users)
      return users;
    } catch (err) {
      console.log("getUserRecommendation", err)
      return err
        ;
    }
  }


  async updateProfileImage(userId: string, pic: string): Promise<any> {
    try {
      const res = await this.findOneAndUpdate({ _id: new ObjectId(userId) }, { "$set": { pic: pic } })
      return res;
    } catch (err) {
      return err
        ;
    }
  }

  // *********************** POST **********************************

  async getFeedPost(userId: string, limit: number, skip: number): Promise<any> {
    try {
      const res = await this.getFeedPosts(userId, limit, skip)
      return res;
    } catch (err) {
      // console.log("getFeedPost", err)
      return err
    }
  }

  async findOneAndDeletePost(postId: string): Promise<any> {
    try {
      const res = await this.delete({ _id: new ObjectId(postId) })
      return res
    } catch (err) {
      console.log("findOneAndDeletePost", err)
      return err
    }
  }


  async updateLikeCount(postId: string, userId: string): Promise<any> {
    try {
      const res = await this.findOneAndUpdate({ _id: new ObjectId(postId) }, {
        $inc: { "likes": 1 },
        //@ts-ignore
        $push: { "likeIds": new ObjectId(userId) }
      })
      return res;
    } catch (err) {
      console.log("UpdateLikeCount", err)
      return err
    }
  }

  async updateUnikeCount(postId: string, userId: string): Promise<any> {
    try {
      const res = await this.findOneAndUpdate({ _id: new ObjectId(postId) }, {
        $inc: { "likes": -1 },
        //@ts-ignore
        $pull: { "likeIds": new ObjectId(userId) }
      })
      return res;
    } catch (err) {
      console.log("UpdateUnlikeCount", err)
      return err
    }
  }


  async updatePostAfterAddComment(postId: string, commentId: string): Promise<any> {
    try {
      // @ts-ignore
      const res = await this.findOneAndUpdate({ _id: new ObjectId(postId) }, {
        // @ts-ignore
        $push: { commentIds: new ObjectId(commentId) },
        $inc: { "comments": 1 }
      })
      return res;
    } catch (err) {
      console.log("updatePostAfterAddComment", err)
      return err
    }
  }

  async updatePostAfterDeleteComment(postId: string, commentId: string) {
    try {
      // @ts-ignore
      const res = await this.findOneAndUpdate({ _id: new ObjectId(postId) }, {
        // @ts-ignore
        $pull: { commentIds: new ObjectId(commentId) },
        $inc: { "comments": -1 }

      })
      // console.log("updatePostAfterDeleteComment", res);
      return res
    } catch (err) {
      console.log("updatePostAfterDeleteComment", err)
      return err
    }
  }

  async getSpecificPost(postId: string, userId: string) {
    try {
      const res = await this.getSpecificPostById(postId, userId)
      return res
    } catch (err) {
      console.log("getSpecificPost", err)
      return err
    }
  }

  async getUserPost(userId: string, limit: number, skip: number) {
    try {
      const res = await this.getUserPostByUsername(userId, limit, skip)
      return res
    } catch (err) {
      console.log("getUserPost", err)
      return err
    }
  }
}

