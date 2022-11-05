import {FollowRequestDTO} from './follow.request.dto'

export class FollowCommand  {
    constructor(public readonly followRequest: FollowRequestDTO) {}
}