import { Inject,Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from './types/auth-jwtPayload'
import { error } from 'node:console';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        //adding jwt refresh coniguration
        private readonly jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,

      ) {}

      async validateUser(email: string, password: string): Promise<any>{{
        console.log("inside validateUser")
        //calls the method in userservice & awaits the databse response 
        const user = await this.userService.findByEmail(email);
        
        if (!user) { // if email not in database
          throw new UnauthorizedException('User not found');
        }
        // if (password === "") //local authentication handles it cannot be implemented here
        //   throw new UnauthorizedException('Please enter password');
        // if password is incorrect
        if (!(await bcrypt.compare(password, user.password))) {
          console.log("inside incorrect passs")
        throw new UnauthorizedException('Incorrect Password');
      }
      
        // if email & hash passwords match those found in data base return id
        if (user && (await bcrypt.compare(password, user.password))) {
         
          return { id: user.id };;
        }

      }
      }

      login(userId: number){ 
        const payload:AuthJwtPayload = { sub: userId} //creates jwt payload
        console.log('From login method in auth servide, payload is ',  payload)
        //jwtService.sign(payload) method uses the JWT configuration from jwt.config.ts to sign the token with secret key
        const token = this.jwtService.sign(payload)//signs the jwt payload generating token and returns it back to auth controller
        const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig); //signs jwt payload generating refresh token returning it back to the controller
        //now will return id, token and refresh token all together to the controller instead of the id and token alone
        return{id: userId, token,refreshtoken};
      }

      //validates the refresh token
      refreshToken(userId: number) {
        const payload : AuthJwtPayload = { sub: userId }; //creates jwt payload
        const token = this.jwtService.sign(payload)
        console.log("inside refresh token method in auth service")
        console.log("userId returned is ", userId)
        return{id: userId,token };
      }
      async validateRefreshToken(userId: number, refreshToken) {
        const user = await this.userService.findOne(userId);
        console.log("inside validateRefreshToken method in auth service")
        console.log("user is ", user)
         return { id: userId };
      }
}