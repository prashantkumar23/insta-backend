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

    constructor(Resp: ISignUpResponse) {
        this.UserConfirmed = Resp.UserConfirmed
        this.CodeDeliveryDetails = Resp.CodeDeliveryDetails
        this.UserSub = Resp.UserSub
    }

    @Field() 
    readonly UserConfirmed: boolean;

    @Field(() => CodeDeliveryDetails)
    readonly CodeDeliveryDetails: CodeDeliveryDetails

    @Field()
    readonly UserSub: string;
}
