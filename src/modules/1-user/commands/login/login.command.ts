import { LoginRequest } from './login.request.dto'

export class LoginCommand {
    constructor(public readonly loginRequest: LoginRequest) { }
}