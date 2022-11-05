import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { PostDto } from './post.dto';
import { PostSchema } from './post.schema';

@Injectable()
export class PostDtoRepository {
    constructor(
        @InjectModel(PostSchema.name)
        private readonly postModel: Model<PostSchema>,
    ) { }

    async findAll(): Promise<any> {
        const posts = await this.postModel.find({}, {}, { lean: true });
        return posts
    }

    async save(): Promise<any> {
        return ""
    }
}
