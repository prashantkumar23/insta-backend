import { Field, ObjectType } from '@nestjs/graphql';
import { ILoginResponse } from '../interfaces/login.response.dto';

@ObjectType()
class AuthenticationResult {
    @Field()
    AccessToken: string;
    @Field()
    IdToken: string;
}

@ObjectType()
class LoggedInUserResponse {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    pic: string;

    @Field()
    email: string;

    @Field()
    email_verfied: boolean;

    @Field()
    numberOfPosts: number;

    @Field()
    numberOffollowers: number;

    @Field()
    numberOffollowings: number;
}

@ObjectType()
export class LoginResponse implements ILoginResponse {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
