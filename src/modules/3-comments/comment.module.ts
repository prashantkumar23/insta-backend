import { forwardRef, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { PostModule } from "../2-posts/post.module";
import { CommentCommandHandlers } from "./commands";
import { CreateCommentGraphqlResolver } from "./commands/createComments/createcomment.graphql-resolver";
import { DeleteCommentGraphqlResolver } from "./commands/deleteComments/deletecomment.graphql-resolver";
import { CommentFactory } from "./comment.factory";
import { CommentDto } from "./database/comment.dto";
import { CommentEntityRepository } from "./database/comment.entity.repository";


import { CommentSchema } from "./database/comment.schema";
import { CommentSchemaFactory } from "./database/comment.schema.factory";
    
  
@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([
            {
                name: CommentSchema.name,
                schema: SchemaFactory.createForClass(CommentSchema),
            },
        ]),
        forwardRef(() => PostModule)
    ],
    providers: [
        CreateCommentGraphqlResolver,
        DeleteCommentGraphqlResolver,
        
        ...CommentCommandHandlers,
        
        CommentEntityRepository,
        CommentDto,
        CommentSchema,
        CommentSchemaFactory,
        CommentFactory,
    ],
})
export class CommentModule { }
