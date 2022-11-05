import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, {Schema as MongooseSchema} from 'mongoose';
import {ObjectId} from 'mongodb'
import { IdentifiableEntitySchema } from '../../../infrastructure/database/identifiable-entity.schema';
import { PostSchema } from '../../2-posts/database/post.schema';


@Schema({ versionKey: false, collection: 'users',timestamps: true })
export class UserSchema extends IdentifiableEntitySchema {
  @Prop({ type: String })
  readonly name: string;

  @Prop({ type: String, unique: true })
  readonly email: string;

  @Prop({ type: String, unique: true })
  readonly username: string;

  @Prop({ type: String })
  readonly pic: string;

  @Prop({ type: Boolean })
  readonly email_verfied: boolean;

  @Prop({ type: Number, default: 0, min: 0 })
  numberOfPosts: number

  @Prop({ type: Number, default: 0, min: 0 })
  numberOffollowers: number

  @Prop({ type: Number, default: 0, min: 0 })
  numberOffollowings: number


  @Prop({ type: [{type: MongooseSchema.Types.ObjectId, ref: UserSchema.name, unique: true }], default: [], required: false, unique: true })
  followingList: UserSchema[] | []

  @Prop({ type: [{type: MongooseSchema.Types.ObjectId, ref: UserSchema.name, unique: true }], default: [], required: false, unique: true })
  followersList: UserSchema[] | []

  @Prop({type: Boolean, default: false, required: false})
  followedByMe: boolean

   @Prop({ type: [{type: MongooseSchema.Types.ObjectId, ref: PostSchema.name }], default: [], required: false })
  postIds: PostSchema[]
  
}
