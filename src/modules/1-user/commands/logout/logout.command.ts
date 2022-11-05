import { LogoutRequest } from './logout.request.dto'

export class LogoutCommand {
    constructor(public readonly logoutRequest: LogoutRequest) { }
}