import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { GraphQLUpload, Upload } from 'graphql-upload';

import { UpdateProfileImage } from "../../../../interface-adapters/interfaces/user";


@ObjectType()
@InputType()
export class UpdateProfileImageRequest implements UpdateProfileImage {
    @Field()
    readonly userId: string;

    @Field()
    readonly username: string;

    @Field(() => GraphQLUpload)
    readonly file: Upload;

}