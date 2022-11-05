import {UnfollowRequestDTO} from './unfollow.request.dto'

export class UnfollowCommand  {
    constructor(public readonly unfollowRequest: UnfollowRequestDTO) {}
}