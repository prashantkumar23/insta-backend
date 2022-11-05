import { AggregateRoot } from "@nestjs/cqrs";
import { ObjectId } from "mongodb";
import { UserSchema } from "../1-user/database/user.schema";

export class Comment extends AggregateRoot {
    constructor(
        private readonly _id: string,
        private readonly whoCommented: ObjectId,
        private readonly postId: ObjectId,
        private readonly comment: string,
        private readonly wasLikeByMe: boolean 
    ){
        super()
    }

    getId(): string {
        return this._id
    }

    getWhoCommented(): ObjectId {
        return this.whoCommented
    }

    getPostId(): ObjectId {
        return this.postId
    }

    getComment(): string {
        return this.comment
    }

    getWasLikeByMe(): boolean {
        return this.wasLikeByMe
    }
}