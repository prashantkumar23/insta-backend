import {  forwardRef, Global, Injectable, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";


import { AuthService } from "./auth.service";
import { CongnitoAuthGuard } from "./auth.guard";
import { AuthCommandHandlers, UserCommandHandler } from "./commands";
import { ConfirmCodeGraphqlResolver } from "./commands/confirmcode/confirmcode.graphlq-resolver";
import { SendCodeGraphqlResolver } from "./commands/sendCode/sendCode.graphql-resolver";
import { LoginGraphqlResolver } from "./commands/login/login.graphlq-resolver";
import { ResetPasswordGraphqlResolver } from "./commands/resetPassword/resetPasswrod.graphql-resolver";
import { SignUpGraphqlResolver } from "./commands/signup/signup.graphql-resolver";
import { UserDtoRepository } from "./database/user-dto.repository";
import { UserEntityRepository } from "./database/user-entity.repository";
import { UserSchemaFactory } from "./database/user-schema.factory";
import { UserSchema } from "./database/user.schema";
import { UserEventHandlers } from "./events";
import { JwtStrategy } from "./jwt.strategy";
import { UserFactory } from "./user.factory";
import { FollowGraphqlResolver } from "./commands/follow/follow.graphql-resolver";
import { UnfollowGraphqlResolver } from "./commands/unfollow/unfollow.graphql-resolver";
import { UserQueryHandlers } from "./queries";
import { SearchGraphqlResolver } from "./queries/search/search.graphql-resolver";
import { LogoutGraphqlResolver } from "./commands/logout/logout.graphlq-resolver";
import { GetUserDetailGraphqlResolver } from "./queries/getuserdetail/getuserdetail.graphql-resolver";
import { GetUserPostGraphqlResolver } from "../2-posts/queries/getuserpost/getuserpost.graphql-resolver";
import { GetOtherUserDetailGraphqlResolver } from "./queries/getotheruserdetail/getotheruserdetail.graphql-resolver";
import { RemoveFromFollowingGraphqlResolver } from "./commands/removeFromFollowing/removefromfollowing.graphlq-resolver";
import { GetUserRecommendationGraphqlResolver } from "./queries/getusersrecommendation/getusersrecommendation.graphql-resolver";
import { CognitoConfiguration } from "./cognito.config";
import { PostModule } from "../2-posts/post.module";
import { UpdatePorfileImageGraphqlResolver } from "./commands/updateProfileImage/updateprofileimage.graphql-resolver";
import { S3ImageUpload } from "../../infrastructure/services/imageUpload/image.upload.service";
import { S3Configuration } from "../../infrastructure/services/imageUpload/s3.config";

@Global()
@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([
            {
                name: UserSchema.name,
                schema: SchemaFactory.createForClass(UserSchema),
            },
        ]),
        forwardRef(() => PostModule)
    ],
    providers: [
        S3Configuration,
        S3ImageUpload,
        
        JwtStrategy,
        CongnitoAuthGuard,
        CognitoConfiguration,
        ...AuthCommandHandlers,
        ...UserQueryHandlers,
        ...UserCommandHandler,
        ...UserEventHandlers,
        AuthService,

        SignUpGraphqlResolver,
        ConfirmCodeGraphqlResolver,
        LoginGraphqlResolver,
        LogoutGraphqlResolver,
        SendCodeGraphqlResolver,
        ResetPasswordGraphqlResolver,

        FollowGraphqlResolver,
        UnfollowGraphqlResolver,
        RemoveFromFollowingGraphqlResolver,

        SearchGraphqlResolver,
        GetUserDetailGraphqlResolver,
        GetUserPostGraphqlResolver,
        GetOtherUserDetailGraphqlResolver,
        GetUserRecommendationGraphqlResolver,
        UpdatePorfileImageGraphqlResolver,

        UserEntityRepository,
        UserDtoRepository,
        UserSchemaFactory,
        UserFactory,
    ],
    exports: [UserFactory, UserEntityRepository],
})
export class UserModule { }
