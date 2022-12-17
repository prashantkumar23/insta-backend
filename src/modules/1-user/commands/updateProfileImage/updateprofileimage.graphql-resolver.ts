import { Args, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'

import { UpdateProfileImageResponse } from './updateprofileimage.reponse'
import { UpdateProfileImageCommand } from './updateprofileimage.post.command'
import { IS3ImageUploadResponse, S3ImageUpload } from '../../../../infrastructure/services/imageUpload/image.upload.service'
import { UpdateProfileImageRequest } from './updateprofileimage.request.fromuser'
import { UseGuards } from '@nestjs/common'
import { CongnitoAuthGuard } from '../../auth.guard'
import { CurrentUser } from '../../currentuser.decorator'
import { User } from '../../user.type'

@Resolver()
export class UpdatePorfileImageGraphqlResolver {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly s3ImageUpload: S3ImageUpload,
    ) { }


    @UseGuards(CongnitoAuthGuard)
    @Mutation(() => UpdateProfileImageResponse)
    async updateProfileImage(
        @Args('input') input: UpdateProfileImageRequest,
        @CurrentUser() user: User
    ): Promise<UpdateProfileImageResponse> {

        try {

            if (!user.userDetails) {
                return { message: "Unauthorized", isSuccess: false }
            }

            const imageResp: IS3ImageUploadResponse = await this.s3ImageUpload.doSingleImageUpload(input.file)

            const urlArr = imageResp.Location.split("/");
            const pic = "https://d7cbio25mx5nv.cloudfront.net/" + urlArr[urlArr.length - 1];

            const userData = {
                pic,
                userId: input.userId
            }
            const command = new UpdateProfileImageCommand(userData)

            await this.commandBus.execute(command)

            return { message: "Updated your profile image successfully", isSuccess: true }
        } catch (err) {
            console.log("PostCreated Failed", err)
            return { message: "Updation of profile image is failed", isSuccess: false }
        }
    }
}