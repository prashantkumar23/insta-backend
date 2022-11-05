import { Prop, Schema, } from '@nestjs/mongoose';
import { ObjectId, } from 'mongodb';
import mongoose, {Schema as MongooseSchema} from 'mongoose';
import { IdentifiableEntitySchema } from '../../../infrastructure/database/identifiable-entity.schema';
import { UserSchema } from '../../1-user/database/user.schema';
import { PostSchema } from '../../2-posts/database/post.schema';

@Schema({ versionKey: false, collection: 'comments', timestamps: true })
export class CommentSchema extends IdentifiableEntitySchema {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: "PostSchema" })
    readonly postId: ObjectId; // ---> PostSchema

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: "UserSchema"})
    readonly whoCommented: ObjectId // -->  UserSchema

    @Prop({ type: String, required: true })
    readonly comment: string;

    @Prop({ type: Number, default: 0, min: 0 })
    readonly likes: number;

    @Prop({ type: Boolean, default: false })
    readonly wasLikeByMe: boolean;

}
