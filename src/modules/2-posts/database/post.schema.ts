import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, {Schema as MongooseSchema } from 'mongoose';
import { IdentifiableEntitySchema } from '../../../infrastructure/database/identifiable-entity.schema';
import { UserSchema } from '../../1-user/database/user.schema';
import { CommentSchema } from '../../3-comments/database/comment.schema';


@Schema({ versionKey: false, collection: 'posts', timestamps: true })
export class PostSchema extends IdentifiableEntitySchema {
  @Prop({type: MongooseSchema.Types.ObjectId, ref: "UserSchema" , required: true})
  readonly userId: UserSchema;

  @Prop({ type: String || [String], required: true })
  readonly imageUrl: string | string[];

  @Prop({ type: String, required: true, maxlength: 2200 })
  readonly caption: string;  

  @Prop({ type: Number, default: 0, min: 0, required: false })
  readonly likes: number;

  @Prop({ type: [{type: MongooseSchema.Types.ObjectId, ref: "UserSchema"}] , default: [], required: false })
  readonly likeIds: UserSchema[];

  @Prop({ type: Number, default: 0, min: 0, required: false })
  readonly comments: number;

  @Prop({ type: [{type: MongooseSchema.Types.ObjectId, ref: "CommentSchema" }], default: [], required: false })
  readonly commentIds: CommentSchema[];

  @Prop({ type: [String], default: [] })
  readonly s3bucketObjectIds: string[]

  @Prop({type: String, default: "", required: false})
  readonly postUrl: string;

  @Prop({type: Boolean, default: false, required: false})
  readonly wasLikeByMe: boolean;

}
