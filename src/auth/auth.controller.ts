// import { Controller, Post, Body, UnauthorizedException,Request } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//     constructor(private readonly authService: AuthService) {}

//     //auth controller handles request 
//     @Post('login')
//   async login(@Request() req) {
//     return this.authService.login(req.user.id);
//   }

// }