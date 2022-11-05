import {SignUpRequest} from './signup.request.dto'

export class SignUpCommand  {
    constructor(public readonly signUpRequest: SignUpRequest) {}
}