import { registerAs } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { register } from "module";
//This file configures the JWT module with the secret key and expiration time.


// //function returns object containing configuration settings for jwt authentication
// export const jwtConfig = {
//     //.env loads enviromental variables
//     //is a JWT Secret key used to sign in and verify tokens
//     //This secret key ensures that only the server can generate valid JWTs.(If an attacker tries to create a fake token without the correct secret key, it will be rejected during verification.)
    
//     //will generate JWT_SECRET randomly and declare in .env file since these are credentials using command openssl rand -hex 32
//     secret: process.env.JWT_SECRET || 'default_secret_key', /*Retrieves the JWT secret key from environment variables (process.env.JWT_SECRET).
//     If no environment variable is set, it falls back to the default value 'default_secret_key'.*/
//     signOptions: {
//         //determines how long a a token remain valid
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     },
//   };
  
   //function returns object containing configuration settings for jwt authentication
  export default registerAs(
    'jwt',
    (): JwtModuleOptions => ({
      //.env loads enviromental variables
     //is a JWT Secret key used to sign in and verify tokens
     //This secret key ensures that only the server can generate valid JWTs.(If an attacker tries to create a fake token without the correct secret key, it will be rejected during verification.)
     //will generate JWT_SECRET randomly and declare in .env file since these are credentials using command openssl rand -hex 32
      secret: process.env.JWT_SECRET,
      signOptions: {
      //determines how long a a token remain valid
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
    }),
  );
  