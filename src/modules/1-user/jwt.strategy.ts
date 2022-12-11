import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import jwksRsa, { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CognitoConfiguration } from './cognito.config';
import { User } from './user.type';

const cookieExtractor = function (req) {
  console.log("REq***********", req.cookie, req.cookies)
 
   // when request comes from ssr
  if(req.headers["accesstoken"] && req.headers["idtoken"]) {
    const tokens = {
      "accessToken": req.headers.accesstoken,
      "idToken": req.headers.idtoken
    }

    return tokens.idToken
  }

  // when request from other end points
  if (req.headers.cookie) {
    const tk = req.headers.cookie.split(" ");
    const tokens = {
      "accessToken": tk[0].split("=")[1],
      "idToken": tk[1].split("=")[1]
    }

    // console.log(req.headers.cookie, tokens)
    return tokens.idToken
  }
  return null
};

// ExtractJwt.fromAuthHeaderAsBearerToken()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _cognitoConfig: CognitoConfiguration) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: false,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${_cognitoConfig.getAuthority()}/.well-known/jwks.json`,
      }),
      jwtFromRequest: cookieExtractor,
      //audience: _cognitoConfig.clientId,
      issuer: _cognitoConfig.getAuthority(),
      algorithms: ['RS256'],
    });
  }
  async validate(payload: JwtPayload) {
    const user: User = new User(payload["cognito:username"], payload.name, payload.email);
    return user;
  }
}


