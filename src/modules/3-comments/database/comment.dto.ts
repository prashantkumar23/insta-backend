import { ObjectId } from "mongodb";
import { UserSchema } from "../../1-user/database/user.schema";

export class CommentDto {
  readonly _id: string;
  readonly whoCommented: string;
  readonly postId: string;
  readonly comment: string;
  readonly wasLikeByMe: boolean;
}
