import { Field, ObjectType } from '@nestjs/graphql';
import { ISearchResponseGraphQL } from '../interfaces/search.reponse';

@ObjectType()
export class SearchResponse implements ISearchResponseGraphQL {
    @Field()
    message: string;

    @Field()
    isSuccess: boolean;

    @Field()
    searchResult: string;
}
