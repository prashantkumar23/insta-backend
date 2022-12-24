import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';


import { EntityFactory } from '../../infrastructure/database/entity.factory';
import { UserSchema } from '../1-user/database/user.schema';
import { Comment } from './Comment';
import { CommentEntityRepository } from './database/comment.entity.repository';

@Injectable()
export class CommentFactory implements EntityFactory<Comment> {
    constructor(
        private readonly commentEntityRepository: CommentEntityRepository,
    ) { }

    async create(
        postId: string,
        whoCommented: string,
        comment: string,
        wasLikeByMe: boolean
    ): Promise<Comment> {
        const commentDocument = new Comment(
            new ObjectId().toHexString(),
            new ObjectId(whoCommented),
            new ObjectId(postId),
            comment,
            wasLikeByMe
        );
        await this.commentEntityRepository.create(commentDocument);
        // user.apply(new UserCreatedEvent(user.getId()));
        return commentDocument;
    }

    async delete(commentId: string): Promise<any> {
        try {
            const resp = await this.commentEntityRepository.delete({ _id: new ObjectId(commentId) })
            return resp
        } catch (err) {
            return err
        }

    }
}
