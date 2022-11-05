import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';   

import { Post } from '../Post';
import { PostSchema } from './post.schema';
import { PostSchemaFactory } from './post.schema.factory';
import { BaseEntityRepository } from '../../../infrastructure/database/base-entity.repository';

@Injectable()
export class PostEntityRepository extends BaseEntityRepository<
  PostSchema,
  Post
> {
  constructor(
    @InjectModel(PostSchema.name)
    postModel: Model<PostSchema>,
    postSchemaFactory: PostSchemaFactory,
  ) {
    super(postModel, postSchemaFactory);
  }
}
