import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class IAWSUserDetail {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

@ObjectType()
export class User {
  @Field(() => IAWSUserDetail || null, {nullable: true})
  userDetails: IAWSUserDetail | null;


  @Field()
  message: string; 

  constructor(username: string, name: string, email: string) {
    this.userDetails = {
      username,
      email,
      name
    }
    this.message = ""
  }
}