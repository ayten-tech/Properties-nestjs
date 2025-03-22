//this file defines the shape of JWT payload
export type AuthJwtPayload = {
    sub: number; //stores the user id commonly used for subject identification
    // email:string //Optional but helpful for quick identification.
  };