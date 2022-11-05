import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
    Length,
} from 'class-validator';

import { SearchRequest } from "../../../../interface-adapters/interfaces/user";


@ObjectType()
@InputType()
export class Search implements SearchRequest {
    @Field()
    @Length(50)
    searchTerm: string;
}