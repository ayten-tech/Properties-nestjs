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
      //The login endpoint generates the token after verifying the user's credentials and sends the token along with the user ID as the response.
      //extract the user from the request then pass its id to the login function  
      const token = this.authService.login(req.user.id) //calls login method to generate a token, req.user.id carries the id of the authenticated user after local strategy authentication is successful 
      console.log("defining token in controller")
      // return req.user;  //  Passport sets req.user after validate() runs
      return {id:req.user.id, token} //after creating token will send it back to the client along with the user id as an object
      
    }

}