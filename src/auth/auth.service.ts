import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
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
        return this.jwtService.sign(payload)//signs the jwt payload generating token and returns it back to auth controller
      }

}