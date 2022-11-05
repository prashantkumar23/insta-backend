export interface IAWSLoginResponse {
       ChallengeParameters: null,
       AuthenticationResult: {
        AccessToken: string;
        ExpiresIn: number;
        TokenType: string;
        RefreshToken: string;
        IdToken: string;
        NewDeviceMetadata: {
            DeviceKey: string;
            DeviceGroupKey: string;
        }
    }
}

export interface ILoginResponse {
    message: string;
    isSuccess: boolean;
}