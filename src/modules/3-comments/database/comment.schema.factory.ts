import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntitySchemaFactory } from '../../../infrastructure/database/entity-schema.factory';
import { Comment } from '../Comment';
import { CommentSchema } from './comment.schema';


@Injectable()
export class CommentSchemaFactory
    implements EntitySchemaFactory<CommentSchema, Comment> {

            
    create(comment: Comment): CommentSchema {

        return {
            _id: new ObjectId(comment.getId()),
            whoCommented: new ObjectId(comment.getWhoCommented()),
            postId: new ObjectId(comment.getPostId()),
            comment: comment.getComment(),
            likes: 0,
            wasLikeByMe: comment.getWasLikeByMe(),
        };

    }

    createFromSchema(commentSchema: CommentSchema): Comment {
        return new Comment(
            commentSchema._id.toHexString(),
            commentSchema.whoCommented,
            commentSchema.postId,
            commentSchema.comment,
            commentSchema.wasLikeByMe
        );
    }
}
