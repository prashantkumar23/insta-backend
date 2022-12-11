import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Response, Request } from 'express';
import { graphqlUploadExpress } from 'graphql-upload'
import { join } from 'path';


/** Wraps the GraphQLModule with an up-to-date graphql-upload middleware. */
@Module({})
export class GraphQLWithUploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFiles: 1, maxFileSize: 10000000 }))
      .forRoutes('graphql');
  }

  static forRoot(): DynamicModule {
    return {
      module: GraphQLWithUploadModule,
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'src/infrastructure/schema.gql'),
          persistedQueries: false,
          context: ({ req, res }: { req: Request, res: Response }) => {
            // res.setHeader("Access-Control-Allow-Origins", process.env.NODE_ENV === "production" ? "https://insta-frontend-gules.vercel.app" : "*")
            return { req, res };
          },
          cors: {
            credentials: true,
            origin: true,
          },
        }),
      ],
    };
  }
}