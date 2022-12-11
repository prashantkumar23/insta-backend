import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CongnitoAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): any {
    if (!user) {
      return { userDetails: undefined, message: info }
    }


    return {
      userDetails: {
        username: user.userDetails.username,
        name: user.userDetails.name,
        email: user.userDetails.email
      }, message: info
    }
  }

  /* 
  
  [1] User {
[1]   user: false,
[1]   err: null,
[1]   status: TokenExpiredError: jwt expired
[1]       at C:\Projects\1-Insta Clone\main-backend\node_modules\jsonwebtoken\verify.js:152:21
[1]       at getSecret (C:\Projects\1-Insta Clone\main-backend\node_modules\jsonwebtoken\verify.js:90:14)
[1]       at Object.module.exports [as verify] (C:\Projects\1-Insta Clone\main-backend\node_modules\jsonwebtoken\verify.js:94:10)   
[1]       at Function.module.exports [as JwtVerifier] (C:\Projects\1-Insta Clone\main-backend\node_modules\passport-jwt\lib\verify_jwt.js:4:16)
[1]       at C:\Projects\1-Insta Clone\main-backend\node_modules\passport-jwt\lib\strategy.js:104:25
[1]       at C:\Projects\1-Insta Clone\main-backend\node_modules\jwks-rsa\src\integrations\passport.js:44:9
[1]       at processTicksAndRejections (node:internal/process/task_queues:96:5) {
[1]     expiredAt: 2022-10-22T18:11:38.000Z
[1]   }
[1] }
  */
}