export interface SignUp {
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
}

export interface ConfirmCode {
    readonly username: string;
    readonly code: string;
}

export interface Login {
    readonly username: string;
    readonly password: string;
}

export interface SendCode {
    readonly email: string;
}

export interface ResetPassword {
    readonly code: string;
    readonly newPassword: string;
    readonly username: string;
}

export interface Logout {
    // readonly accessToken: string;
}


