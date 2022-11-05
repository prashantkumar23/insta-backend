import { GetUserRecommendation } from './getusersrecommendation.request'

export class GetUserRecommendationQuery {
    constructor(public readonly getUserRecommendationRequest: GetUserRecommendation) { }
}
