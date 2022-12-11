import { Field, ObjectType } from '@nestjs/graphql';
import { IResetPasswordResponse } from '../interfaces/resetPassword.reponse';


@ObjectType()
export class ResetPasswordResponse implements IResetPasswordResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean
}
