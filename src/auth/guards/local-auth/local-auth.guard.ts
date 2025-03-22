import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

 //when you extend AuthGuard you override canactive method the parent is AuthGuard('local') that comes with nestjs package
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    /*canActivate method(intercept the request &
    performs pre-validation before executing local strategy )
    if canactive method returns false the request is blocked nest js doesn't proceed on to authentication
    if true it prooceeds to local authentication strategy*/
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { password } = request.body; //extracts the password from the request body
    console.log("inside the local custom guard")
    // If password is empty(the password field is not present in the request), throw an UnauthorizedException
    if (!password) {
        console.log("empty custom guard")
      throw new UnauthorizedException('Please enter password');
    }
    // if returns true (the password is present) procceeds with default local authentication
    return super.canActivate(context) as boolean; 
    //calls the super class which triggers the parent's class(AuthGuard)local method canActivate
    //which is responsible for calling local strategy class
    //in other words LocalStrategy is a separate class that gets called inside AuthGuard('local').
  }
}
