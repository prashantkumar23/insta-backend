import { ForgotPasswordRequest } from './forgotpassword.request.dto'

export class ForgotPasswordCommand {
    constructor(public readonly forgotPasswordRequest: ForgotPasswordRequest) { }
}