import { CodeDeliveryDetails } from "amazon-cognito-identity-js";

export interface ISignUpResponse {
    UserConfirmed: boolean;
    CodeDeliveryDetails: CodeDeliveryDetails
    UserSub: string;

}