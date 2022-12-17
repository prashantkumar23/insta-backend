import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {ObjectId} from 'mongodb'

import { EntityFactory } from '../../infrastructure/database/entity.factory';
import { Post } from './Post';
import { PostEntityRepository } from './database/post.entity.repository';
import { CommentSchema } from '../3-comments/database/comment.schema';
import { UserEntityRepository } from '../1-user/database/user-entity.repository';

@Injectable()
export class PostFactory implements EntityFactory<Post> {
    constructor(
        private readonly postEntityRepository: PostEntityRepository,
        private readonly userEntityRepository: UserEntityRepository,
    ) { }

    async create(
        userId: string,
        caption: string,
        imageUrl: string | string[],
        s3bucketObjectIds: string[],
        postUrl: string,
        wasLikeByMe: boolean
    ): Promise<Post> {
        try {
            const post = new Post(
                new ObjectId().toHexString(),
                userId,
                imageUrl,
                caption,
                s3bucketObjectIds,
                postUrl,
                wasLikeByMe
            );
            await this.postEntityRepository.create(post);
            return post
        } catch(err) {
            return err
        }
        

    }

    async updateLikeCount(postId: string, userId: string): Promise<any> {
        try {
            const resp = await this.postEntityRepository.updateLikeCount(postId, userId)
            return resp
        } catch (err) {
            return err
        }

    }

    async updateUnlikeCount(postId: string, userId: string): Promise<any> {
        try {
            const resp = await this.postEntityRepository.updateUnikeCount(postId, userId)
            return resp
        } catch (err) {
            return err
        }

    }

    async deletePost(postId: string): Promise<any> {
        try {
            const resp = await this.postEntityRepository.findOneAndDeletePost(postId)
            return resp
        } catch (err) {
            return err
        }

    }

    async getFeedPost(userId: string, limit: number, skip: number): Promise<any> {
        try {
            const resp = await this.postEntityRepository.getFeedPost(userId, limit, skip);
            return resp
        } catch(err) {
            return err
        }
    }

    async updatePostAfterAddComment(postId: string, commentId: string) {
        try {
            const res = await this.postEntityRepository.updatePostAfterAddComment(postId, commentId)
            return res
        } catch(err) {
            return err
        }
    }

    async updatePostAfterDeleteComment(postId: string, commentId: string) {
        try {
            const res = await this.postEntityRepository.updatePostAfterDeleteComment(postId, commentId)
            return res
        } catch(err) {
            return err
        }
    }

    async getSpecificPost(postId: string, userId: string) {
        try {
            const res = await this.postEntityRepository.getSpecificPost(postId, userId)
            return res
        } catch(err) {
            return err
        }
    }

    async getUserPost(username: string, limit: number, skip: number) {
        try {
            const user = await this.userEntityRepository.findOne({username})
            const res = await this.postEntityRepository.getUserPost(user.getId(), limit, skip)
            return res
        } catch (err) {
            return err
        }
    }
}
