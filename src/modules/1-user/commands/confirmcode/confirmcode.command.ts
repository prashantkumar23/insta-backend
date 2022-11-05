import {ConfirmCodeRequest} from './confirmcode.request.dto'

export class ConfirmCodeCommand  {
    constructor(public readonly confirmCodeRequest: ConfirmCodeRequest) {}
}