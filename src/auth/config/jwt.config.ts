
//function returns object containing configuration settings for jwt authentication
export const jwtConfig = {
    //.env loads enviromental variables
    //is a JWT Secret key used to sign in and verify tokens
    secret: process.env.JWT_SECRET || 'default_secret_key',
    signOptions: {
        //determines how long a a token remain valid
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
  };
  