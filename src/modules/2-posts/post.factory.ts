import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {ObjectId} from 'mongodb'

import { EntityFactory } from '../../infrastructure/database/entity.factory';
import { Post } from './Post';
import { PostEntityRepository } from './database/post.entity.repository';
import { CommentSchema } from '../3-comments/database/comment.schema';

@Injectable()
export class PostFactory implements EntityFactory<Post> {
    constructor(
        private readonly postEntityRepository: PostEntityRepository,
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

    async getSpecificPost(postId: string) {
        try {
            const res = await this.postEntityRepository.getSpecificPost(postId)
            return res
        } catch(err) {
            return err
        }
    }
}
