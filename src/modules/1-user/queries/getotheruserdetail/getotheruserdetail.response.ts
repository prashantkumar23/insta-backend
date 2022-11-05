import { Field, ObjectType } from '@nestjs/graphql';
import { IGetOtherUserDetailResponseGraphQL } from '../../interfaces/getotheruserdetail.response';

@ObjectType()
export class GetOtherUserDetailResponse implements IGetOtherUserDetailResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;
}
