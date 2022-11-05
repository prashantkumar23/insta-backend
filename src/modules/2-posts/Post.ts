import { AggregateRoot } from '@nestjs/cqrs';


export class Post extends AggregateRoot {
    constructor(
        private readonly _id: string,
        private readonly userId: string,
        private readonly imageUrl: string | string[],
        private readonly caption: string,
        private readonly s3BucketObjectIds: string[],
        private readonly postUrl: string,
        private readonly wasLikeByMe: boolean

    ) {
        super();
    }

    getId(): string {
        return this._id;
    }

    getUserId(): string {
        return this.userId
    }

    getImageUrl(): string  | string[] {
        return this.imageUrl;
    }

    getCaption(): string {
        return this.caption
    }

    getS3BucketObjectIds(): string[] {
        return this.s3BucketObjectIds
    }

    getPostUrl(): string {
        return this.postUrl
    }

    getWasLikeByMe(): boolean {
        return this.wasLikeByMe
    }
}
