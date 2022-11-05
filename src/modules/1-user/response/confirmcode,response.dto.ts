import { Field, ObjectType } from '@nestjs/graphql';
import { IConfirmCodeResponse } from '../interfaces/confirmcode.response';

@ObjectType()
export class ConfirmCodeResponse implements IConfirmCodeResponse {
    @Field()
    message: string;
}
