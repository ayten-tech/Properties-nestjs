import { Controller, Post, Body, UnauthorizedException,Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Console } from 'node:console';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
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
      return req.user;  //  Passport sets req.user after validate() runs
    }

}