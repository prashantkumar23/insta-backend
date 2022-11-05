import { ResetPasswordRequest } from './resetPassword.request.dto'

export class ResetPasswordCommand {
    constructor(public readonly resetPasswordRequest: ResetPasswordRequest) { }
}