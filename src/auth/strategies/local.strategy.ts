import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({
          usernameField: 'email', //using email instead of username
        });
        console.log("inside constructor local")
      }
    

    //  validate(email: string, password: string){
    //     console.log("inside the local strategy")
    //     //calls validateUser method in authservice 
    //    //empty password should defined in custom guard first because it validates request before strategy execution
    //    /* because Passport automatically rejects empty passwords 
    //     before calling validate().*/
    //    //The error is thrown before your validateUser() function even runs.
        
        
    //  }


   validate(email: string, password: string) {
    console.log(' LocalStrategy validate() executing with email:', email);
    return this.authService.validateUser(email, password);
}


}
 
