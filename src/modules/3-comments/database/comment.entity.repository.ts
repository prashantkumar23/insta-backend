import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from '../Comment';
import { CommentSchema } from './comment.schema';
import { CommentSchemaFactory } from './comment.schema.factory';
import { BaseEntityRepository } from '../../../infrastructure/database/base-entity.repository';

@Injectable()
export class CommentEntityRepository extends BaseEntityRepository<
  CommentSchema,
  Comment
> {
  constructor(
    @InjectModel(CommentSchema.name)
    commentModel: Model<CommentSchema>,
    commentSchemaFactory: CommentSchemaFactory,
  ) {
    super(commentModel, commentSchemaFactory);
  }
}
