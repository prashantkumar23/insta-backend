import { Field, ObjectType } from '@nestjs/graphql';
import { ISignUpResponse } from '../interfaces/signup.reponse';

@ObjectType()
class CodeDeliveryDetails {
    @Field()
    Destination: string;
    @Field()
    DeliveryMedium: string;
    @Field()
    AttributeName: string

}

@ObjectType()
export class SignUpResponse implements ISignUpResponse {
    @Field()
    readonly isSuccess: boolean;

    @Field()
    readonly message: string
}
