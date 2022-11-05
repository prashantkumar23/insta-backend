import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AuthService } from "../../auth.service";
import { ISignUpResponse } from "../../interfaces/signup.reponse";
import { UserFactory } from "../../user.factory";
import { SignUpCommand } from "./signup.command";

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly auth: AuthService,
    private readonly eventPublisher: EventPublisher,
    private readonly userFactory: UserFactory
  ) {}

  async execute({ signUpRequest }: SignUpCommand): Promise<ISignUpResponse> {
    const user: ISignUpResponse = await this.auth.signUpUser(signUpRequest);

    if (user && user.UserSub) {
      const { username, name, email } = signUpRequest;
      const email_verfied = false;
      const numberOfPosts = 0;
      const numberOfFollowings = 0;
      const numberOfFollowers = 0;
      const followersList = [];
      const followingList = [];
      const followedByMe = false;
      const postIds = []
      const pic = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
      const createdUser = this.eventPublisher.mergeObjectContext(
        // careful parameters arrangement matters
        await this.userFactory.create(
          name,
          email,
          username,
          pic,
          email_verfied,
          numberOfPosts,
          numberOfFollowings,
          numberOfFollowers,
          followersList,
          followingList,
          followedByMe,
          postIds
        )
      );

      createdUser.commit();
    }

    // console.log("USer", user)
    return user;
  }
}
