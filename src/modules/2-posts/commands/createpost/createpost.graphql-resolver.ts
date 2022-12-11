import { Args, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { CreatePostResponse } from './create.post.reponse'
import { CreatePostCommand } from './create.post.command'
import { IS3ImageUploadResponse, S3ImageUpload } from '../../../../infrastructure/services/imageUpload/image.upload.service'
import { CreatePostFromUserRequest } from './createpost.request.fromuser'
import { UseGuards } from '@nestjs/common'
import { CongnitoAuthGuard } from '../../../1-user/auth.guard'
import { CurrentUser } from '../../../1-user/currentuser.decorator'
import { User } from '../../../1-user/user.type'
import { ObjectId } from 'mongodb'
import { UserFactory } from '../../../1-user/user.factory'

@Resolver()
export class CreatePostGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly s3ImageUpload: S3ImageUpload,
        private readonly userFactory: UserFactory
    ) { }


    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => CreatePostResponse)
    async createPost(
        @Args('input') input: CreatePostFromUserRequest,
        @CurrentUser() user: User
    ): Promise<CreatePostResponse> {

        try {

            if (!user.userDetails) {
                return { message: "Unauthorized", isSuccess: false }
            }

            const imageResp: IS3ImageUploadResponse = await this.s3ImageUpload.doSingleImageUpload(input.file)

            const postData = {
                userId: input.userId,
                caption: input.caption,
                imageUrl: imageResp.Location,
                s3bucketObjectIds: [imageResp.Key],
                postUrl: "",
                wasLikeByMe: false,
            }
            console.log("Post Data nd Image Resp", postData, imageResp)
            const command = new CreatePostCommand(postData)

            const resp: any = await this.commandBus.execute(command)

            // console.log("resp", resp)

            await this.userFactory.updateNumberOfPostsAndIds(user.userDetails.username, resp._id)

            return { message: "Post Created Successfully", isSuccess: true }
        } catch (err) {
            console.log("PostCreated Failed", err)
            return { message: "PostCreated Failed", isSuccess: false }
        }
    }
}