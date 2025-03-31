import { Inject,Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from './types/auth-jwtPayload'
import { error } from 'node:console';
import * as argon2 from 'argon2'; //for hashing the refresh token before storing it in the database

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
      //function dedicated to creating access & refresh tokens since we will modify login function
      async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId }; //creates jwt payload
        console.log('From generateTokens method in auth servide, payload is ',  payload)
        const [accessToken,refreshToken] = await Promise.all([this.jwtService.sign(payload),this.jwtService.sign(payload, this.refreshTokenConfig) ]); 
                                                //signs the jwt payload generating token  //signs jwt payload generating refresh token
        console.log("access token is ", accessToken)
        console.log("refresh token is ", refreshToken)
        
        
        return { id:userId,accessToken, refreshToken }; //returns both tokens                                    

      }
      async login(userId: number){ 
        const payload:AuthJwtPayload = { sub: userId} //creates jwt payload
        console.log('From login method in auth servide, payload is ',  payload)
        const {accessToken,refreshToken} = await this.generateTokens(userId); //calls the generateTokens method to create tokens
        // Hash the refresh token before saving it in the database
        const hashedRefreshToken = await argon2.hash(refreshToken);
        console.log("hashed refresh token is ", hashedRefreshToken);
        await this.userService.updateRefreshToken(userId, hashedRefreshToken); //calls the user service to update the refresh token in the database
        
        //now will return id, token and refresh token all together to the controller instead of the id and token alone
        return{id: userId, accessToken,refreshToken};
      }

      
      async refreshToken(userId: number) {
        const {accessToken,refreshToken} = await this.generateTokens(userId); //calls the generateTokens method to create tokens
        const hashedRefreshToken = await argon2.hash(refreshToken);
        console.log("inside refresh token method in auth service")
        console.log("userId returned is ", userId)
        await this.userService.updateRefreshToken(userId, hashedRefreshToken)
        return{id: userId,accessToken,refreshToken}; //returns id, access token and refresh token 
      }
      //checks whether hashed refresh token is null or not (logout) Then compares the refresh token from the request with the hashed refresh token in the database
      async validateRefreshToken(userId: number, refreshToken) {
        const user = await this.userService.findOne(userId);
        console.log("inside validateRefreshToken method in auth service")
        console.log("user is ", user)
        if (!user || !user.hashedRefreshToken) { //means if no user found in database or hash is null means user has signed out 
          throw new UnauthorizedException('Invalid refresh token'); // No user or refresh token found
        }
        //argon2.verify() works by hashing the raw token again using the same algorithm and parameters, then comparing the resulting hash with the stored hash in database
        const refreshTokenMatches = await argon2.verify(
          user.hashedRefreshToken,
          refreshToken,
        );
        console.log("refreshTokenMatches:",refreshTokenMatches)
        if(!refreshTokenMatches) { //if the refresh token doesn't match the hashed refresh token in the database
          throw new UnauthorizedException('Invalid refresh token'); // Invalid refresh token
        }
        

        console.log("after if-conditions in validateRefreshToken method")
         return { id: userId };
      }

      async signOut(userId: number){ //when user signs out assign hashrefresh token in db with null (invalidating refreshtoken)
        await this.userService.updateRefreshToken(userId, null);
      }
}