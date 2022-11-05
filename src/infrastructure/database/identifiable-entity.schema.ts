import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema({timestamps: true})
export abstract class IdentifiableEntitySchema {
  @Prop({type: ObjectId})
  readonly _id?: ObjectId;
}
