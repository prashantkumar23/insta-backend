import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

import { EntitySchemaFactory } from '../../../infrastructure/database/entity-schema.factory';
import { Post } from '../Post';
import { PostSchema } from './post.schema';

@Injectable()
export class PostSchemaFactory
  implements EntitySchemaFactory<PostSchema, Post> {
  create(post: Post): PostSchema {

    return {
      _id: new ObjectId(post.getId()),
      // @ts-ignore
      userId: new ObjectId(post.getUserId()),
      imageUrl: post.getImageUrl(),
      caption: post.getCaption(),
      s3bucketObjectIds: post.getS3BucketObjectIds(),
      postUrl: post.getPostUrl(),
      wasLikeByMe: post.getWasLikeByMe()
    };

  }

  createFromSchema(postSchema: PostSchema): Post {
    return new Post(
      postSchema._id.toHexString(),
      String(postSchema.userId),
      postSchema.imageUrl,
      postSchema.caption,
      postSchema.s3bucketObjectIds,
      postSchema.postUrl,
      postSchema.wasLikeByMe
    );
  }
}
