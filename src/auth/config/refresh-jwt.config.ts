import { registerAs } from "@nestjs/config";
import { JwtModule, JwtModuleOptions ,JwtSignOptions } from "@nestjs/jwt";

//This file configures the refresh JWT module with the REFRESH_JWT_SECRET key and REFRESH_JWT_EXPIRE_IN.
  
   //function returns object containing configuration settings for refresh jwt authentication
  export default registerAs(
    'refresh-jwt', //changed the name of the space from jwt to refresh-jwt
    (): JwtSignOptions => ({
     //will generate JWT_SECRET randomly and declare in .env file since these are credentials using command openssl rand -hex 32 to generate new secret key of the refresh token 
      secret: process.env.REFRESH_JWT_SECRET,
      
      //determines how long a reresh token remain valid
      expiresIn: process.env.REFRESH_JWT_EXPIRE_IN,
      
    
    }),
  );
  