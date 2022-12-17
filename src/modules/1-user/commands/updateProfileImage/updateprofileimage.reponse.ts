import { Field, ObjectType } from '@nestjs/graphql';
import { IUpdateProfileImageResponse } from '../../interfaces/updateprofileimage.reponse';

@ObjectType()
export class UpdateProfileImageResponse implements IUpdateProfileImageResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean
}
