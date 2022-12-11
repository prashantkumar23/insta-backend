import { Field, ObjectType } from '@nestjs/graphql';
import { ISendCodeResponse } from '../interfaces/sendCode.response';


@ObjectType()
export class SendCodeResponse implements ISendCodeResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean

    @Field()
    username: string | null;
}
