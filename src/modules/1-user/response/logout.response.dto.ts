import { Field, ObjectType } from '@nestjs/graphql';
import { ILogoutResponseGraphQL } from '../interfaces/logout.response';

@ObjectType()
export class LogoutResponse implements ILogoutResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
