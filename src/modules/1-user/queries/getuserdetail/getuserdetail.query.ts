import {GetUserDetail} from './getuserdetail.request'

export class GetUserDetailQuery  {
    constructor(public readonly getUserDetailRequest: GetUserDetail) {}
}
