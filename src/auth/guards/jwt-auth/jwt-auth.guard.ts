import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
//jwt strategy don't get triggered unless you define guards 
@Injectable()
//("jwt") is the strategy name, referring to the JWT authentication strategy.
//This means that this guard will use Passport's JWT strategy for authentication.
export class JwtAuthGuard extends AuthGuard("jwt") {

  //This method intended for debugging purposes
  canActivate(context: ExecutionContext) {
    console.log("JwtAuthGuard: Checking authentication..."); // Debug log

    const result = super.canActivate(context); // Call parent method
    console.log("JwtAuthGuard: Authentication result:", result);

    return result;
  }
}
