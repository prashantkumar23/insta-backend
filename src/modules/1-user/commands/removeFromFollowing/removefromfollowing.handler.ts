import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import { UserFactory } from '../../user.factory';
import {  RemoveFromFollowingCommand } from "./removefromfollowing.command"

@CommandHandler(RemoveFromFollowingCommand)
export class RemoveFromFollowingHandler
    implements ICommandHandler<RemoveFromFollowingCommand> {
    constructor(
        private readonly userFactory: UserFactory
    ) { }

    async execute({ removeFromFollowingRequest }: RemoveFromFollowingCommand): Promise<any> {
        const {userId, whoToRemove} = removeFromFollowingRequest
        const resp = await this.userFactory.removeFromFollowing(userId, whoToRemove)
        return resp
    }
}
