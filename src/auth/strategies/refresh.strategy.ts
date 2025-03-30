import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

//JWT Strategy does the follwing
//extracts the token from the header and verifies it , then attaches the user to the request
//JWT Secret signs and verifies tokens
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,'refresh-jwt',) { //Extends Passport's JWT strategy and names it "refresh-jwt".
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refrshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
        
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
            //then passport jwt uses secret(from jwt.config.ts) to verify token  
            secretOrKey: refrshJwtConfiguration.secret, //Uses the secret key from refresh-jwt.config.ts to verify the token.
            ignoreExpiration: false, // Ensures expired tokens are rejected.
            passReqToCallback: true, //Passes the request object (req) to the validate method.
        });
        //won't ge printed because: 
        // refresh JWT strategy is initialized only once: Since it is a strategy for authentication, NestJS (via @nestjs/passport) registers it at startup, but it does not reinitialize it on each authentication request.
        //REFRESHJwtStrategy constructor runs only once when you restart your server Restart your server (npm run start:dev).
        //But validate() method runs every time authentication occurs.
        console.log("inside constructor refresh jwt strategy")
      }
      
 
      //After token verification, Passport automatically calls this function if the refresh token extracted is valid and the token hasn't expired, providing the req object & decoded payload  
      validate(req: Request, payload: AuthJwtPayload) { 
        console.log('validate function ( refresh jwt strategy) id:',payload.sub)
        //Then req.get('authorization'): Retrieves the Authorization header that was passes as an object in passReqToCallback: true,
        //.replace('Bearer', '').trim(): Extracts the token by removing "Bearer
        const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
        //payload.sub: Extracts the user ID from the JWT payload (sub is usually the user ID).
        const userId = payload.sub;
        console.log("The following tests if refreshToken is undefined")
        console.log("validate refresh strategy refresh token after cleaning is", refreshToken)
        console.log("validate refresh strategy user id is", userId)
        //the returning object will be appended to the request object (Request.user) under the property name user (Request.user)
        return this.authService.validateRefreshToken(userId, refreshToken);
        
      }
}