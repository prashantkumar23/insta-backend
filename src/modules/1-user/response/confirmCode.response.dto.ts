import { Field, ObjectType } from '@nestjs/graphql';
// import { IConfirmCodeResponse } from '../interfaces/confirmCode.response';


export interface IConfirmCodeResponse {
    message: string;
    isSuccess: boolean;
}

@ObjectType()
export class ConfirmCodeResponse implements IConfirmCodeResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean
}
