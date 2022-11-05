import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CognitoConfiguration {
    constructor(
        private _config: ConfigService
    ) { }
    private readonly AWS_COGNITO_API_VERSION: string = this._config.get("AWS_COGNITO_API_VERSION")
    private readonly AWS_COGNITO_REGION: string = this._config.get("AWS_COGNITO_REGION")
    private readonly AWS_COGNITO_ACCESS_KEY_ID: string = this._config.get("AWS_COGNITO_ACCESS_KEY_ID")
    private readonly AWS_COGNITO_SECRET_ACCESS_KEY: string = this._config.get("AWS_COGNITO_SECRET_ACCESS_KEY")
    private readonly AWS_COGNITO_CLIENT_ID: string = this._config.get("AWS_COGNITO_CLIENT_ID")
    private readonly AWS_COGNITO_USER_POOL_ID: string = this._config.get("AWS_COGNITO_USER_POOL_ID")
    private readonly AWS_COGNITO_AUTHORITY: string = `https://cognito-idp.${this.AWS_COGNITO_REGION}.amazonaws.com/${this.AWS_COGNITO_USER_POOL_ID}`


    getApiVersion(): string {
        return this.AWS_COGNITO_API_VERSION
    }


    getAccessKey(): string {
        return this.AWS_COGNITO_ACCESS_KEY_ID
    }

    getSecretAccessKey(): string {
        return this.AWS_COGNITO_SECRET_ACCESS_KEY
    }

    getRegion(): string {
        return this.AWS_COGNITO_REGION
    }

    getClientId(): string {
        return this.AWS_COGNITO_CLIENT_ID
    }

    getUserPoolId(): string {
        return this.AWS_COGNITO_USER_POOL_ID
    }

    getAuthority(): string {
        return this.AWS_COGNITO_AUTHORITY
    }
}
