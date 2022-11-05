import { RemoveFromFollowingRequestDto } from './removefromfollowing.request.dto'

export class RemoveFromFollowingCommand {
    constructor(public readonly removeFromFollowingRequest: RemoveFromFollowingRequestDto) { }
}