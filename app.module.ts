import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { DatabaseModule } from './src/infrastructure/database/database.module';
import { UserModule } from './src/modules/1-user/auth.module';
import { GraphQLWithUploadModule } from './graphql-upload.module';
import { CommentModule } from './src/modules/3-comments/comment.module';
import { PostModule } from './src/modules/2-posts/post.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    PostModule,
    CommentModule,
    DatabaseModule,
    GraphQLWithUploadModule.forRoot()
  ],
  controllers: [],
  providers: [],
  exports: []
})

export class AppModule { }
