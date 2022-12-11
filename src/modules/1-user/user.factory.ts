import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntityFactory } from '../../infrastructure/database/entity.factory';


import { User } from './User';
import { UserEntityRepository } from './database/user-entity.repository';
import { UserSchema } from './database/user.schema';
import { PostSchema } from '../2-posts/database/post.schema';
import mongoose from 'mongoose';
// import { UserCreatedEvent } from './events/user-created.event';

// import { UserUpdatedEvent } from './events/user.updated.event';

@Injectable()
export class UserFactory implements EntityFactory<User> {
    constructor(
        private readonly userEntityRepository: UserEntityRepository,
    ) { }

    async create(
        name: string,
        email: string,
        username: string,
        pic: string,
        email_verfied: boolean,
        numberOfPosts: number,
        numberOfFollowings: number,
        numberOfFollowers: number,
        followersList: UserSchema[] | [],
        followingsList: UserSchema[] | [],
        followedByMe: boolean,
        postIds: PostSchema[] | []
    ): Promise<User> {
        const user = new User(
            new ObjectId().toHexString(),
            name,
            email,
            username,
            pic,
            email_verfied,
            numberOfPosts,
            numberOfFollowings,
            numberOfFollowers,
            followersList,
            followingsList,
            followedByMe,
            postIds
        );
        await this.userEntityRepository.create(user);
        // user.apply(new UserCreatedEvent(user.getId()));
        return user;
    }

    async update(
        username: string,
        email_verfied: boolean
    ): Promise<any> {
        const user = await this.userEntityRepository.findOneAndUpdateByUsername(username, email_verfied);
        console.log("User in update", user)
        // user.apply(new UserUpdatedEvent())
        return user;
    }

    async findUserWithUsernameOrEmail({ username, email }: { username: string, email: string }): Promise<boolean> {
        const existingUser = await this.userEntityRepository.findOne({
            $or: [
                { "username": { $eq: username.trim() } },
                { "email": { $eq: email.trim() } },
            ]
        })
        if (existingUser) return true;
        return false;
    }

    async findUserWithEmail({ email }: { email: string }): Promise<any> {
        const existingUser = await this.userEntityRepository.findOne({ email })

        if (existingUser) return existingUser
        return null
    }

    async updateNumberOfPostsAndIds(
        username: string,
        postId: string
    ): Promise<any> {
        const user = await this.userEntityRepository.findOneAndUpdateNumberOfPostsAndIds(username, postId);
        // console.log("User in update", user)
        // user.apply(new UserUpdatedEvent())
        return user;
    }


    async follow(username: string, whoToFollow: string): Promise<any> {
        const user = await this.userEntityRepository.follow(username, whoToFollow)
        return user;
    }


    async unfollow(username: string, whoToUnfollow: string): Promise<any> {
        const user = await this.userEntityRepository.unfollow(username, whoToUnfollow)
        return user;
    }

    async removeFromFollowing(userId: string, whoToRemove: string): Promise<any> {
        const res = await this.userEntityRepository.removeFromFollowing(userId, whoToRemove)
        return res
    }

    async search(searchTerm: string) {
        const searchResults = await this.userEntityRepository.search(searchTerm);
        return searchResults
    }

    async getUserDetail(username: string, updateFilterQuery?: mongoose.UpdateQuery<UserSchema>, email?: string): Promise<any> {
        try {
            const res = await this.userEntityRepository.getUserDetail(email ? email : username, updateFilterQuery)
            return res
        } catch (err) {
            return err
        }
    }

    async getOtherUserDetail(username: string, userId: string) {
        try {
            const res = await this.userEntityRepository.getOtherUserDetail(username, userId)
            return res
        } catch (err) {
            return err
        }
    }

    async getUserPost(username: string) {
        try {
            const res = await this.userEntityRepository.getUserPost(username)
            return res
        } catch (err) {
            return err
        }
    }

    async getUserRecommendation(limit: number, userId: string) {
        try {
            const res = await this.userEntityRepository.getUserRecommendation(limit, userId)
            return res
        } catch (err) {
            return err
        }
    }
}
