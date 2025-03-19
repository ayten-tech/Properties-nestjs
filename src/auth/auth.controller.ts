import { Controller, Post, Body, UnauthorizedException,Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Console } from 'node:console';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //auth controller handles request
    // in this example we won't use jwt authentication in authenticate service yet   
    @UseGuards(AuthGuard('local')) // This tells NestJS to use Passport Local Strategy
    @Post('login')
    async login(@Request() req) {
      console.log(" Inside AuthController login()");
      return req.user;  //  Passport sets req.user after validate() runs
    }

}