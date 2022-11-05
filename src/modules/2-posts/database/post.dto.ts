import { ObjectId} from 'mongodb';

export class PostDto {
  readonly _id: ObjectId;
  readonly name: string;
  readonly username: string;
  readonly username_pic: string;
  readonly imageUrl: string | string[];
  readonly caption: string;
  readonly likes: number;
  readonly commentCount: number;
  readonly commentIds: ObjectId[];
  readonly s3bucketObjectIds: string[]
}
