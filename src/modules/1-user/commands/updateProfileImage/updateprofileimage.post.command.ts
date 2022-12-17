import {UpdateProfileImageToMongoRequest} from './updateprofileimage.request.dto'

export class UpdateProfileImageCommand  {
    constructor(public readonly updateProfileImageRequest: UpdateProfileImageToMongoRequest) {}
}