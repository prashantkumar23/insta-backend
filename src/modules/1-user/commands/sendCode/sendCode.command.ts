import { SendCodeRequest } from './sendCode.request.dto'

export class SendCodeCommand {
    constructor(public readonly sendCodeRequest: SendCodeRequest) { }
}