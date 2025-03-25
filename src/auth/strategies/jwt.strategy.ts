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
      
      //we extract token from decoder in the login function in auth servide
      //the jwt strategy doesn't get executed unless declared gurads since guards activate strategy
      // this function returns the object which contains the id of the user 
      //the it will be appended to the request object under the name user 
      //in the Get("profile") in user controller
      validate(payload: AuthJwtPayload ) { 
        //After token verification, Passport automatically calls this function, providing the decoded payload. 
        //Then this method extracts and returns the userid as an object so that the controller attaches it to `req.user` and access endpoint
        // after attachement becomes req.user = { id: "18" }; in our case
        // Payload contains user data from the JWT token
        console.log('validate function (jwt strategy) id:',payload.sub)
        return { id: payload.sub}; //this object will be appended to the request object under the name user
      }
}