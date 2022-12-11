import { Field, ObjectType } from '@nestjs/graphql';
import { IConfirmCodeResponse } from '../interfaces/confirmCode.response';


@ObjectType()
export class ConfirmCodeResponse implements IConfirmCodeResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean
}
