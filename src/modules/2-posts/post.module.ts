import { forwardRef, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";

import { PostEntityRepository } from "./database/post.entity.repository";
import { PostSchemaFactory } from "./database/post.schema.factory";
import { PostSchema } from "./database/post.schema";
import { PostFactory } from "./post.factory";
import { PostCommandHandlers } from "./commands";
import { CreatePostGraphqlResolver } from "./commands/createpost/createpost.graphql-resolver";
import { S3ImageUpload } from "../../infrastructure/services/imageUpload/image.upload.service";
import { S3Configuration } from "../../infrastructure/services/imageUpload/s3.config";
import { LikePostGraphqlResolver } from "./commands/likepost/likepost.graphql-resolver";
import { UnikePostGraphqlResolver } from './commands/unlikepost/unlikepost.graphql-resolver'
import { DeletePostGraphqlResolver } from "./commands/deletepost/deletepost.graphql-resolver";
import { GetFeedPostGraphqlResolver } from "./queries/getfeedpost/getfeedpost.graphql-resolver";
import { PostQueryHandlers } from "./queries";
import { GetSpecificPostGraphqlResolver } from "./queries/getspecificpost/getspecificpost.graphql-resolver";
import { UserModule } from "../1-user/auth.module";
  
@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([
            {
                name: PostSchema.name,
                schema: SchemaFactory.createForClass(PostSchema),
            },
        ]),
        forwardRef(() => UserModule)
    ],
    providers: [

        S3Configuration,
        S3ImageUpload,

        ...PostCommandHandlers,
        ...PostQueryHandlers,


        CreatePostGraphqlResolver,
        LikePostGraphqlResolver,
        UnikePostGraphqlResolver,
        DeletePostGraphqlResolver,
        GetFeedPostGraphqlResolver,
        GetSpecificPostGraphqlResolver,

        PostEntityRepository,
        PostSchemaFactory,
        PostSchema,
        PostFactory,

    ],
    exports: [PostFactory]
})
export class PostModule { }
