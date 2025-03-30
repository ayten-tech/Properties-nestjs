import { Controller, Post, Body, UnauthorizedException,Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Console } from 'node:console';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK) //returns response when successful to 200(ok) instead of 201
    //auth controller handles request
    // in this example we won't use jwt authentication in authenticate service yet   
    @UseGuards(LocalAuthGuard) // the custom gurad class we created
    @Post('login')
    async login(@Request() req) {
      console.log(" Inside AuthController login()");
      return this.authService.login(req.user.id);
      
    }
    //will create new api endpoint so when the access token expires it calls the api of the refresh token 
    //so for that we will have to create a strategy for the refresh token
    @UseGuards(RefreshAuthGuard) // the custom gurad class we created
    @Post('refresh')
    refreshToken(@Request() req){
      console.log("Inside AuthController refreshtoken");
      console.log("user id is(req.user.id)", req.user.id)
      console.log("user id(req.userId) is ",req.userId)
      return this.authService.refreshToken(req.user.id);
    }

}