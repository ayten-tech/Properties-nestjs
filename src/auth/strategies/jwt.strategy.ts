import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth-jwtPayload'

//JWT Strategy does the follwing
//extracts the token from the header and verifies it , then attaches the user to the request
//JWT Secret signs and verifies tokens
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
        private authService: AuthService,
      ) {
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
            //then passport jwt uses secret(from jwt.config.ts) to verify token  
            secretOrKey: jwtConfiguration.secret,
            ignoreExpiration: false,
        });
        //won't ge printed because: 
        // JWT strategy is initialized only once: Since it is a strategy for authentication, NestJS (via @nestjs/passport) registers it at startup, but it does not reinitialize it on each authentication request.
        //JwtStrategy constructor runs only once when you restart your server Restart your server (npm run start:dev).
        //But validate() method runs every time authentication occurs.
        console.log("inside constructor jwt strategy")
      }
      
      validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
      }
}