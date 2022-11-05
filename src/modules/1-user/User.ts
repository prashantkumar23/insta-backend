import { AggregateRoot } from '@nestjs/cqrs';
import { PostSchema } from '../2-posts/database/post.schema';
import { UserSchema } from './database/user.schema';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly username: string,
    private readonly pic: string,
    private readonly email_verfied: boolean,
    private readonly numberOfPosts: number,
    private readonly numberOffollowings: number,
    private readonly numberOffollowers: number,
    private readonly followersList: UserSchema[] | [],
    private readonly followingList: UserSchema[] | [],
    private readonly followedByMe: boolean,
    private readonly postIds: PostSchema[] | []
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getUsername(): string {
    return this.username;
  }

  getPic(): string {
    return this.pic;
  }

  getEmail(): string {
    return this.email;
  }

  getEmailVerification() :boolean {
    return this.email_verfied
  }

  getNumberOfPosts(): number {
    return this.numberOfPosts
  }

  getNumberOfFollowers(): number {
    return this.numberOffollowers
  }

  getNumberOfFollowings(): number {
    return this.numberOffollowings
  }

  getFollowingList(): UserSchema[] | [] {
    return this.followingList
  }

  getFollowersList(): UserSchema[] | [] {
    return this.followersList
  }

  getFollowedByMe(): boolean {
    return this.followedByMe
  }

  getPostIds(): PostSchema[] | [] {
    return this.postIds
  }
 
//   updateAllergies(allergies: string): void {
//     // const allergiesLower = allergies.map(allergy =>
//     //   allergy.toLocaleLowerCase(),
//     // );
//     // if (allergiesLower.includes('chocolate')) {
//     //   throw new BadRequestException('Allergy may not be chocolate.');
//     // }
//     this.allergies = allergies;
//   }
}
