import { Injectable } from "@nestjs/common";
import AWS, { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk'
import { GlobalSignOutRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

import { CognitoConfiguration } from "./cognito.config";
import { ConfirmCodeRequest } from "./commands/confirmcode/confirmcode.request.dto";
import { ForgotPasswordRequest } from "./commands/forgotPassword/forgotpassword.request.dto";
import { LoginRequest } from "./commands/login/login.request.dto";
import { ResetPasswordRequest } from "./commands/resetPassword/resetPassword.request.dto";
import { SignUpRequest } from "./commands/signup/signup.request.dto";
import { IAWSLoginResponse } from "./interfaces/login.response.dto";
import { ISignUpResponse } from "./interfaces/signup.reponse";


// cognitoService.listUsers
// deleteUser
// resendConfirmationCode
// revoke token
// updateUserAttributes(params = {}, callback) ⇒ AWS.Request
// 

@Injectable()
export class AuthService {

    private cognitoIdentity;
    private context;

    constructor(private cognitoConfig: CognitoConfiguration) {
        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config)
    }

    private config: CognitoIdentityServiceProvider.ClientConfiguration = {
        apiVersion: this.cognitoConfig.getApiVersion(),
        region: this.cognitoConfig.getRegion(),
        accessKeyId: this.cognitoConfig.getAccessKey(),
        secretAccessKey: this.cognitoConfig.getSecretAccessKey(),
        correctClockSkew: true
    }

    private clientId = this.cognitoConfig.getClientId();



    public async signUpUser({ name, email, username, password }: SignUpRequest): Promise<ISignUpResponse> {

        let userAttr = [];
        userAttr.push({ Name: 'email', Value: email });
        userAttr.push({ Name: 'name', Value: name });

        const params = {
            ClientId: this.clientId, /* required */
            Password: password, /* required */
            Username: username, /* required */
            //   SecretHash: this.hashSecret(username),
            UserAttributes: userAttr,
        }

        try {
            const data: ISignUpResponse = await this.cognitoIdentity.signUp(params).promise()
            // console.log(" Data", data)
            return data
        } catch (error) {
            // console.log(error)
            return error
        }
    }

    public async login({ username, password }: LoginRequest): Promise<IAWSLoginResponse | AWSError> {
        console.log("CONFIG", this.config, this.clientId)

        let loginData: IAWSLoginResponse | AWSError
        try {
            const params = {
                AuthFlow: 'USER_PASSWORD_AUTH', /* required */
                ClientId: this.clientId, /* required */
                AuthParameters: {
                    'USERNAME': username,
                    'PASSWORD': password,
                },
            }

            loginData = await this.cognitoIdentity.initiateAuth(params).promise();
            return loginData;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async logout({ AccessToken }: GlobalSignOutRequest): Promise<CognitoIdentityServiceProvider.Types.GlobalSignOutResponse | AWSError> {
        let cognitoService = new AWS.CognitoIdentityServiceProvider(this.config) // needs to refactored
        console.log("Context Object", this.context)
        try {
            // cognitoService.revokeToken
            cognitoService.globalSignOut({ AccessToken }, (err: AWSError, data: CognitoIdentityServiceProvider.GlobalSignOutResponse) => {
                if (err) {
                    console.log("Logout err", err)
                    return err;
                }
                console.log("Logout resp from aws", data)
            })
        } catch (err) {
            console.log("Logout err", err)
            return err
        }
    }

    public async confirmSignup({ username, code }: ConfirmCodeRequest): Promise<CognitoIdentityServiceProvider.Types.ConfirmSignUpResponse | AWSError> {

        let cognitoService = new AWS.CognitoIdentityServiceProvider(this.config) // needs to refactored

        try {

            let data = await cognitoService.confirmSignUp({ Username: username, ConfirmationCode: code, ClientId: this.clientId }).promise()
            // console.log("Confirm Code Service", data)
            return data
        } catch (error) {
            // console.log("Confirm Code Service Error", error)
            return error
        }

    }


    public async forgotPassword({ username }: ForgotPasswordRequest): Promise<any> {
        const params = {
            ClientId: this.clientId, /* required */
            Username: username, /* required */
        }

        try {
            const data = await this.cognitoIdentity.forgotPassword(params).promise();
            console.log("forgotPassword Data", data);
            return data
        } catch (error) {
            console.log("forgotPassword Error", error);
            return error;
        }
    }

    public async resetPassword({ username, newPassword, code }: ResetPasswordRequest): Promise<any> {
        const params = {
            // ClientId: this._authConfig.getClientId(), /* required */
            ClientId: this.clientId,
            ConfirmationCode: code, /* required */
            Password: newPassword, /* required */
            Username: username, /* required */
        };

        try {
            const data = await this.cognitoIdentity.confirmForgotPassword(params).promise();
            console.log("Reset Password", data);
            return data;
        } catch (error) {
            console.log("Reset Password Error", error);
            return error;
        }
    }
}