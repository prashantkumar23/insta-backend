import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from '../../user.factory';
import { User } from '../../user.type';
import { UpdateProfileImageCommand } from "./updateprofileimage.post.command"

@CommandHandler(UpdateProfileImageCommand)
export class UpdateProfileImageHandler
    implements ICommandHandler<UpdateProfileImageCommand> {

        constructor(
        private readonly userFactory: UserFactory,
  
    ) { }

    async execute({ updateProfileImageRequest }: UpdateProfileImageCommand): Promise<any> {
        const { pic, userId } = updateProfileImageRequest;
        const user = await this.userFactory.updateProfileImage(userId, pic)
        return user
    }
}
